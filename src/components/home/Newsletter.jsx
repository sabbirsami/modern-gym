import { useForm } from "react-hook-form";
import newsLetterImage from "../../assets/person/man0.png";
import useAxiosPublic from "../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useState } from "react";

const Newsletter = () => {
    const [buttonLoading, setButtonLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const axiosPublic = useAxiosPublic();
    const onSubmit = (data) => {
        setButtonLoading(true);
        const firstName = data.firstName;
        const lastName = data.lastName;
        const name = firstName + " " + lastName;
        console.log(name);
        console.log(data);
        const newsletterSubscriber = { name, email: data.email };
        axiosPublic
            .post("/newsletters", newsletterSubscriber)
            .then((res) => {
                console.log(res.data);
                toast.success("Successfully subscribed", {
                    duration: 2000,
                    className: "mt-32",
                });
                setButtonLoading(false);
                reset();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <section className="container mx-auto px-6 md:mt-32  pt-16 pb-10">
            <div className=" bg-gradient-to-r  from-[#0C1117] to-[#303644] rounded-2xl p-1">
                <div className="py-10 md:px-28 px-6 rounded-2xl grid lg:grid-cols-7 lg:gap-10 items-center justify-between bg-[#0C1117]">
                    <form
                        className="lg:col-span-4 text-black"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h2 className="md:text-5xl text-3xl pb-6 text-white">
                            Subscribe Our Newsletter
                        </h2>
                        <div className=" flex lg:flex-col xl:flex-row flex-col justify-between gap-6">
                            <div className="grow">
                                <label
                                    htmlFor="firstName"
                                    className="block md:w-64 w-full pb-2 font-semibold text-white"
                                >
                                    First Name{" "}
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    {...register("firstName", {
                                        required: true,
                                    })}
                                    className=" rounded-md w-full py-3  px-2 bg-white"
                                    placeholder="Enter first name here.."
                                />
                                {/* error message */}
                                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1 ">
                                    {errors.firstName && (
                                        <span>First Name is required *</span>
                                    )}
                                </label>
                            </div>
                            <div className="">
                                <label
                                    htmlFor="lastName"
                                    className="block w-full pb-2 font-semibold text-white"
                                >
                                    Last Name{" "}
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("lastName", {
                                        required: true,
                                    })}
                                    name="lastName"
                                    className=" rounded-md w-full py-3 px-2 bg-white"
                                    placeholder="Enter last name here.."
                                />
                                {/* error message */}
                                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                    {errors.lastName && (
                                        <span>Last Name is required *</span>
                                    )}
                                </label>
                            </div>
                        </div>
                        <div className="md:flex md:gap-6 gap-2">
                            <div className="grow">
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    className="py-4 px-3 w-full mb-6  mt-2 rounded-md "
                                    placeholder="Enter your email here.."
                                />
                                {/* error message */}
                                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                    {errors.email && (
                                        <span>{errors.email?.message}</span>
                                    )}
                                    {errors.email?.type === "required" &&
                                        "Email is required *"}
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-[#94f3b0] to-[#7abf88] py-4 px-4 h-14 mt-2  rounded-md"
                            >
                                {buttonLoading ? (
                                    <div className="mx-6">
                                        <div role="status">
                                            <svg
                                                aria-hidden="true"
                                                className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                                    </div>
                                ) : (
                                    <span> Subscribe </span>
                                )}
                            </button>
                        </div>
                    </form>
                    <div className="lg:col-span-3 ms-auto">
                        <img
                            src={newsLetterImage}
                            alt=""
                            className="w-80 pt-6 drop-shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
