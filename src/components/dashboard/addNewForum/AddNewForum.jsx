import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillImageFill } from "react-icons/bs";
import { HiOutlineArrowUpTray } from "react-icons/hi2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "../../auth/AuthProvider";
import { useQuery } from "react-query";
import Loading from "../../shared/Loading";

const AddNewForum = () => {
    const [uploadFile, setFile] = useState();
    const { user } = useContext(AuthContext);
    const userEmail = user.email;
    const axiosPublic = useAxiosPublic();

    const imageUploadKey = "bbb19450ec34611b6204ad31a2909518";
    const [uploadedImageError, setUploadedImageError] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState();

    const today = new Date();
    const dd = today.getDay();
    const mm = today.getMonth();
    const yyyy = today.getFullYear();

    const postDate = `${mm}-${dd}-${yyyy}`;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { data: userInfo = [], isLoading } = useQuery({
        queryKey: ["userDetails", userEmail],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/role/${userEmail}`);
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading />;
    }
    console.log(userInfo);

    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
        setUploadedImage(e.target.files[0]);
    }
    const onSubmit = (data) => {
        console.log(data);
        if (!uploadedImage) {
            setUploadedImageError("Image require");
        } else {
            const image = uploadedImage;
            console.log(uploadedImage);
            const formData = new FormData();
            formData.append("image", image);
            const url = `https://api.imgbb.com/1/upload??expiration=6000&key=${imageUploadKey}`;
            fetch(url, {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.success) {
                        const newPost = {
                            postImage: result.data.url,
                            title: data.name,
                            author: userInfo[0].name,
                            content: data.experience,
                            authImage: userInfo[0].photoUrl,
                            timestamp: postDate,
                            views: 0,
                            role: userInfo[0].role,
                            likeCount: 0,
                            postTag: data.postTag,
                            commentsCount: 0,
                        };
                        console.log(newPost);

                        axiosPublic
                            .post("/posts", newPost)
                            .then((res) => {
                                setButtonLoading(false);
                                console.log(res.data);
                                Swal.fire({
                                    title: "Add successfully",

                                    icon: "success",
                                });

                                reset();
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                    console.log(result);
                });
        }
    };
    return (
        <section className="">
            <h2 className="text-2xl">Add New Forum</h2>
            <div className="p-6">
                <div className="border rounded-lg p-6">
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-4">
                            <div className="col-span-1 pe-10">
                                <div className="bg-[#0C1117]/50 p-2 h-80 w-full rounded-lg items-center  border border-dashed">
                                    {uploadFile ? (
                                        <img
                                            className="object-cover border-0  rounded-lg w-full h-full mx-auto my-auto mb-0"
                                            src={uploadFile}
                                            alt=""
                                        />
                                    ) : (
                                        <div className="h-full flex justify-center items-center border-0">
                                            <BsFillImageFill className="text-6xl" />
                                        </div>
                                    )}
                                </div>
                                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                    {uploadedImageError}
                                </label>
                                <div className="mt-4">
                                    <label
                                        htmlFor="files"
                                        className="block cursor-pointer bg-[#303644] border-0 w-full rounded-lg py-3 text-center font-semibold"
                                    >
                                        Upload Photo{" "}
                                        <HiOutlineArrowUpTray className="inline text-lg ms-2 font-semibold" />
                                    </label>
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={handleChange}
                                        id="files"
                                        className="bg-[#0C1117]/50 hidden w-full rounded-lg py-3 text-center font-semibold"
                                    />
                                </div>
                            </div>
                            <div className="col-span-3 ">
                                <div className="">
                                    <label htmlFor="title">
                                        Title{" "}
                                        <span className="text-red-500">*</span>{" "}
                                    </label>
                                    <input
                                        {...register("title", {
                                            required: true,
                                        })}
                                        type="text"
                                        placeholder="Put post title here... "
                                        className="w-full p-3 rounded-md bg-[#303644] border-0"
                                    />
                                    {errors.title && (
                                        <span className="text-red-500">
                                            Title is required
                                        </span>
                                    )}
                                </div>

                                <div className="pt-6">
                                    <label htmlFor="postTag">
                                        Post Tag{" "}
                                        <span className="text-red-500">*</span>{" "}
                                    </label>
                                    <input
                                        {...register("postTag", {
                                            required: true,
                                        })}
                                        type="text"
                                        placeholder="Put post title here... "
                                        className="w-full p-3 rounded-md bg-[#303644] border-0"
                                    />
                                    {errors.postTag && (
                                        <span className="text-red-500">
                                            Post tag is required
                                        </span>
                                    )}
                                </div>
                                <div className="pt-6">
                                    <label htmlFor="content">
                                        Content{" "}
                                        <span className="text-red-500">*</span>{" "}
                                    </label>
                                    <textarea
                                        {...register("content", {
                                            required: true,
                                        })}
                                        name=""
                                        className="w-full p-3 rounded-md bg-[#303644] border-0"
                                        id=""
                                        cols="30"
                                        rows="10"
                                    ></textarea>
                                    {errors.content && (
                                        <span className="text-red-500">
                                            Content is required
                                        </span>
                                    )}
                                </div>
                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-[#94f3b0] to-[#7abf88] text-black w-full rounded-md py-3"
                                    >
                                        Add post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddNewForum;
