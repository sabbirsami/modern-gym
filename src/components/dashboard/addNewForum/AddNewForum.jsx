import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillImageFill } from "react-icons/bs";
import { HiOutlineArrowUpTray } from "react-icons/hi2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../auth/AuthProvider";
import { useQuery } from "react-query";
import Loading from "../../shared/Loading";
import toast from "react-hot-toast";

const AddNewForum = () => {
    const [uploadFile, setFile] = useState();
    const [requiredError, setRequiredError] = useState("");
    const [requiredTitle, setRequiredTitle] = useState("");
    const descriptionRef = useRef(null);
    const titleRef = useRef(null);
    const { user } = useContext(AuthContext);
    const userEmail = user.email;
    const axiosPublic = useAxiosPublic();

    const imageUploadKey = "0cf9b51119794046d065dbff898a7aae";
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
        if (!uploadedImage) {
            return setUploadedImageError("Image require");
        }
        const content = descriptionRef.current.value;
        if (!content) {
            return setRequiredError("content is require");
        }
        const title = titleRef.current.value;
        if (!title) {
            return setRequiredTitle("Title is require");
        }
        setRequiredError("");
        setRequiredTitle("");
        setButtonLoading(true);
        const image = uploadedImage;
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
                        title: title,
                        author: userInfo[0].name,
                        content: content,
                        authImage: userInfo[0].photoUrl,
                        authEmail: userInfo[0].email,
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
                            console.log(res.data);
                            toast.success("forum added successfully", {
                                duration: 2000,
                                className: "mt-32",
                            });
                            setButtonLoading(false);

                            setUploadedImageError("");
                            reset();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
                console.log(result);
            });
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
                                        ref={titleRef}
                                        type="text"
                                        placeholder="Put post title here... "
                                        className="w-full p-3 rounded-md bg-[#303644] border-0"
                                    />

                                    <span className="text-red-500">
                                        {requiredTitle}
                                    </span>
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
                                        ref={descriptionRef}
                                        name=""
                                        className="w-full p-3 rounded-md bg-[#303644] border-0"
                                        id=""
                                        cols="30"
                                        rows="10"
                                    ></textarea>

                                    <span className="text-red-500">
                                        {requiredError}
                                    </span>
                                </div>
                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-[#94f3b0] to-[#7abf88] text-black w-full rounded-md py-3"
                                    >
                                        {buttonLoading ? (
                                            <div role="status">
                                                <svg
                                                    aria-hidden="true"
                                                    className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-green-400"
                                                    viewBox="0 0 100 101"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                        fill="currentFill"
                                                    />
                                                </svg>
                                                <span className="sr-only">
                                                    Loading...
                                                </span>
                                            </div>
                                        ) : (
                                            <span> Add post</span>
                                        )}
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
