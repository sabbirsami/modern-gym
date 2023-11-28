import { useContext, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../auth/AuthProvider";
import { useQuery } from "react-query";
import { FaEdit } from "react-icons/fa";
import { TbEditOff } from "react-icons/tb";
import { HiOutlineArrowUpTray } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import auth from "../../../../firebase.config";
import { updateProfile } from "firebase/auth";
import UserProfileLoading from "./UserProfileLoading";

const UserProfileSetting = () => {
    const axiosPublic = useAxiosPublic();
    const [uploadFile, setFile] = useState();
    const [uploadedImage, setUploadedImage] = useState();
    const [edit, setEdit] = useState(false);
    const { user } = useContext(AuthContext);
    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm();
    const imageUploadKey = "84c96ea9e112e5e5187de0b6d10887a3";

    const { data: userData = [], isLoading: isUserLoading } = useQuery({
        queryKey: ["userData", user.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/role/${user.email}`);
            return res.data;
        },
    });
    if (isUserLoading) {
        return <UserProfileLoading />;
    }

    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
        setUploadedImage(e.target.files[0]);
    }
    console.log(userData);
    const onSubmit = (data) => {
        const uid = userData[0].uid;
        const role = userData[0].role;

        const image = uploadedImage;
        if (uploadedImage) {
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
                        updateProfile(auth.currentUser, {
                            displayName: data.name,
                            photoURL: result.data.url,
                        });
                        const updatedUserData = {
                            photoUrl: result.data.url,
                            name: data.name,
                            email: data.email,

                            uid: uid,
                            role: role,
                            country: data.country,
                            district: data.district,
                            phoneNumber: data.phoneNumber,
                            age: data.age,
                            gender: data.gender,
                            weight: data.weight,
                            height: data.height,
                            DateOfBirth: data.DateOfBirth,
                        };
                        toast.success("Profile Updated", {
                            duration: 2000,
                            className: "mt-32",
                        });
                        axiosPublic
                            .put(
                                `/users/update-profile/${userData[0]._id}`,
                                updatedUserData
                            )
                            .then((res) => {
                                console.log(res.data);
                                setEdit(false);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                });
        } else {
            const photoUrl = userData[0].photoUrl;
            updateProfile(auth.currentUser, {
                displayName: data.name,
            });
            const updatedUserData = {
                name: data.name,
                email: data.email,
                photoUrl: photoUrl,
                uid: uid,
                role: role,
                country: data.country,
                district: data.district,
                phoneNumber: data.phoneNumber,
                age: data.age,
                gender: data.gender ? data.gender : userData[0].gender,
                weight: data.weight,
                height: data.height,
                DateOfBirth: data.DateOfBirth
                    ? data.DateOfBirth
                    : userData[0].DateOfBirth,
            };
            toast.success("Profile Updated", {
                duration: 2000,
                className: "mt-32",
            });
            axiosPublic
                .put(
                    `/users/update-profile/${userData[0]._id}`,
                    updatedUserData
                )
                .then((res) => {
                    console.log(res.data);
                    setEdit(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    return (
        <section className="">
            <div className="p-16">
                <div>
                    {edit ? (
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="grid grid-cols-7    "
                        >
                            <div className=" col-span-2">
                                <div className="col-span-1 pe-10">
                                    <div className="bg-[#0C1117]/50 p-2 w-96 h-96 rounded-lg items-center  border border-dashed">
                                        {uploadFile ? (
                                            <img
                                                className="object-cover border-0  rounded-lg w-full h-full mx-auto my-auto mb-0"
                                                src={uploadFile}
                                                alt=""
                                            />
                                        ) : (
                                            <img
                                                className="object-cover border-0  rounded-lg w-full h-full mx-auto my-auto mb-0"
                                                src={user.photoURL}
                                                alt=""
                                            />
                                        )}
                                    </div>

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
                            </div>

                            <div className="col-span-3">
                                <div className="">
                                    <h2 className="text-xm text-white/70">
                                        Name:{" "}
                                    </h2>
                                    <input
                                        type="text"
                                        {...register("name", {
                                            required: true,
                                        })}
                                        className="bg-[#303644] w-full rounded-md border-0"
                                        placeholder="District"
                                        defaultValue={
                                            userData[0].name
                                                ? userData[0].name
                                                : ""
                                        }
                                    />
                                    {errors.name && (
                                        <span className="text-red-600">
                                            Name is required
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 justify-between gap-6">
                                    <div className="">
                                        <div className="">
                                            <h2 className="text-xm pt-6 text-white/70">
                                                Email:{" "}
                                            </h2>
                                            <input
                                                {...register("email")}
                                                type="text"
                                                className="bg-[#303644] text-white/70 w-full rounded-md border-0"
                                                readOnly
                                                defaultValue={user?.email}
                                            />
                                        </div>
                                        <div className="">
                                            <h2 className="text-xm pt-6 text-white/70">
                                                District:{" "}
                                            </h2>
                                            <input
                                                type="text"
                                                {...register("district")}
                                                className="bg-[#303644] w-full rounded-md border-0"
                                                placeholder="District"
                                                defaultValue={
                                                    userData[0].district
                                                        ? userData[0].district
                                                        : ""
                                                }
                                            />
                                        </div>
                                        <div className="">
                                            <h2 className="text-xm pt-6 text-white/70">
                                                Country:{" "}
                                            </h2>
                                            <input
                                                {...register("country")}
                                                type="text"
                                                className="bg-[#303644] w-full rounded-md border-0"
                                                placeholder="country"
                                                defaultValue={
                                                    userData[0].country
                                                        ? userData[0].country
                                                        : ""
                                                }
                                            />
                                        </div>
                                        <div className="">
                                            <h2 className="text-xm pt-6 text-white/70">
                                                Phone Number:{" "}
                                            </h2>
                                            <input
                                                {...register("phoneNumber")}
                                                type="text"
                                                className="bg-[#303644] w-full rounded-md border-0"
                                                placeholder="Phone Number"
                                                defaultValue={
                                                    userData[0].phoneNumber
                                                        ? userData[0]
                                                              .phoneNumber
                                                        : ""
                                                }
                                            />
                                        </div>
                                        <div className="">
                                            <h2 className="text-xm pt-6 text-white/70">
                                                Date of Birth:{" "}
                                            </h2>
                                            <input
                                                type="date"
                                                {...register("DateOfBirth")}
                                                className="bg-[#303644] w-full rounded-md border-0"
                                                placeholder="Date of Birth"
                                                defaultValue={
                                                    userData[0].DateOfBirth
                                                        ? userData[0]
                                                              .DateOfBirth
                                                        : ""
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="">
                                            <h2 className="text-xm pt-6 text-white/70">
                                                Gender:{" "}
                                            </h2>

                                            <select
                                                name="gender"
                                                {...register("gender")}
                                                id="gender"
                                                className="bg-[#303644] w-full rounded-md border-0"
                                                defaultValue={
                                                    userData[0].gender
                                                        ? userData[0].gender
                                                        : ""
                                                }
                                            >
                                                <option value="male">
                                                    male
                                                </option>
                                                <option value="female">
                                                    female
                                                </option>
                                            </select>
                                        </div>
                                        <div className="">
                                            <h2 className="text-xm pt-6 text-white/70">
                                                Age:{" "}
                                            </h2>
                                            <input
                                                type="number"
                                                {...register("age")}
                                                className="bg-[#303644] w-full rounded-md border-0"
                                                placeholder="Age"
                                                defaultValue={
                                                    userData[0].age
                                                        ? userData[0].age
                                                        : ""
                                                }
                                            />
                                        </div>
                                        <div className="">
                                            <h2 className="text-xm pt-6 text-white/70">
                                                Height:{" "}
                                            </h2>
                                            <input
                                                type="text"
                                                {...register("height")}
                                                className="bg-[#303644] w-full rounded-md border-0"
                                                placeholder="height"
                                                defaultValue={
                                                    userData[0].height
                                                        ? userData[0].height
                                                        : ""
                                                }
                                            />
                                        </div>
                                        <div className="">
                                            <h2 className="text-xm pt-6 text-white/70">
                                                Weight:{" "}
                                            </h2>
                                            <input
                                                type="number"
                                                {...register("weight")}
                                                className="bg-[#303644] w-full rounded-md border-0"
                                                placeholder="weight"
                                                defaultValue={
                                                    userData[0].weight
                                                        ? userData[0].weight
                                                        : ""
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="py-4 bg-gradient-to-r from-[#94f3b0] to-[#7abf88] text-black w-full mt-16 rounded-md row-span-10"
                                >
                                    Update Profile
                                </button>
                            </div>
                            <div className="col-span-2 text-end ">
                                {edit ? (
                                    <button
                                        onClick={() => setEdit(false)}
                                        className="border-0 px-3 py-2 rounded-sm bg-orange-600/10 text-orange-500"
                                    >
                                        Close{" "}
                                        <TbEditOff className="inline text-xl mb-1 ms-2" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setEdit(true)}
                                        className="border-0 px-3 py-2 rounded-xl bg-orange-600"
                                    >
                                        Edit{" "}
                                        <FaEdit className="inline text-xl mb-1" />
                                    </button>
                                )}
                            </div>
                        </form>
                    ) : (
                        <div className="grid grid-cols-7    ">
                            <div className=" col-span-2">
                                <div className="bg-[#0C1117]/50 p-2 w-96 h-96 rounded-lg items-center  border border-dashed">
                                    {user ? (
                                        <img
                                            className="object-cover border-0  rounded-lg w-96 h-96 mx-auto my-auto mb-0"
                                            src={user.photoURL}
                                            alt=""
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <div className="col-span-3">
                                <h2 className="text-6xl">
                                    {user?.displayName}
                                </h2>
                                <div className="grid grid-cols-2 gap-6 justify-between">
                                    <div className="">
                                        <div className="">
                                            <h2 className="text-xm pt-6 text-white/70">
                                                Email:{" "}
                                            </h2>
                                            <p className="">
                                                <span className="text-white">
                                                    {user?.email}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="">
                                            <h2 className="text-xm pt-3 text-white/70">
                                                District:{" "}
                                            </h2>
                                            <p className="">
                                                {userData[0].district ? (
                                                    <span className="text-white">
                                                        {userData[0].district}
                                                    </span>
                                                ) : (
                                                    "-"
                                                )}
                                            </p>
                                        </div>
                                        <div className="">
                                            <h2 className="text-xm pt-3 text-white/70">
                                                Country:{" "}
                                            </h2>
                                            <p className="">
                                                {userData[0].country ? (
                                                    <span className="text-white">
                                                        {userData[0].country}
                                                    </span>
                                                ) : (
                                                    "-"
                                                )}
                                            </p>
                                        </div>
                                        <div className="">
                                            <h2 className="text-xm pt-3 text-white/70">
                                                Phone Number:{" "}
                                            </h2>
                                            <p className="">
                                                {userData[0].phoneNumber ? (
                                                    <span className="text-white">
                                                        {
                                                            userData[0]
                                                                .phoneNumber
                                                        }
                                                    </span>
                                                ) : (
                                                    "-"
                                                )}
                                            </p>
                                        </div>
                                        <div className="">
                                            <h2 className="text-xm pt-1 text-white/70">
                                                Date of Birth:{" "}
                                            </h2>
                                            <p className="">
                                                {userData[0].DateOfBirth ? (
                                                    <span className="text-white">
                                                        {
                                                            userData[0]
                                                                .DateOfBirth
                                                        }
                                                    </span>
                                                ) : (
                                                    "-"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-5">
                                        <div className="">
                                            <h2 className="text-xm pt-1 text-white/70">
                                                Gender:{" "}
                                            </h2>
                                            <p className="text-xm">
                                                {" "}
                                                {userData[0].gender ? (
                                                    <span className="text-white">
                                                        {userData[0].gender}
                                                    </span>
                                                ) : (
                                                    "-"
                                                )}
                                            </p>
                                        </div>
                                        <div className="">
                                            <h2 className="text-xm pt-3 text-white/70">
                                                Age:{" "}
                                            </h2>
                                            <p className="">
                                                {userData[0].age ? (
                                                    <span className="text-white">
                                                        {userData[0].age} years
                                                    </span>
                                                ) : (
                                                    "-"
                                                )}
                                            </p>
                                        </div>
                                        <div className="">
                                            <h2 className="text-xm pt-3 text-white/70">
                                                Height:{" "}
                                            </h2>
                                            <p className="">
                                                {userData[0].height ? (
                                                    <span className="text-white">
                                                        {userData[0].height}
                                                    </span>
                                                ) : (
                                                    "-"
                                                )}
                                            </p>
                                        </div>
                                        <div className="">
                                            <h2 className="text-xm pt-3 text-white/70">
                                                Weight:{" "}
                                            </h2>
                                            <p className="">
                                                {userData[0].weight ? (
                                                    <span className="text-white">
                                                        {userData[0].weight}
                                                    </span>
                                                ) : (
                                                    "-"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 text-end ">
                                {edit ? (
                                    <button
                                        onClick={() => setEdit(false)}
                                        className="border-0 px-3 py-2 rounded-sm bg-orange-600"
                                    >
                                        Close{" "}
                                        <TbEditOff className="inline text-xl mb-1 ms-2" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setEdit(true)}
                                        className="border-0 px-3 py-2 rounded-sm bg-[#94f3b0]/10 text-[#94f3b0]"
                                    >
                                        Edit{" "}
                                        <FaEdit className="inline text-xl mb-1 ms-2" />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default UserProfileSetting;
