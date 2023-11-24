import { Helmet } from "react-helmet-async";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import registerImage from "../../assets/person/register.png";
import dumble from "../../assets/dumble2.png";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { BsArrowLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [googleButtonLoading, setGoogleButtonLoading] = useState(false);
    const [registerWithGoogleError, setRegisterWithGoogleError] = useState("");

    // const handleSubmit = () => {};
    return (
        <div className="auth-section ">
            <Helmet>
                <title>Modern Gym | Sign In</title>
            </Helmet>
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 justify-end grid-cols-1 gap-14">
                    <div className="py-20 flex flex-col justify-between items-end md:h-screen text-center">
                        <div className="">
                            <h2 className="text-6xl pb-8">
                                Hey there! <br /> Welcome back.
                            </h2>
                            <Link
                                className="bg-white text-black px-4 rounded-full hover:text-primaryColor py-2"
                                to={"/"}
                            >
                                {" "}
                                <BsArrowLeft className="inline mb-0.5 " /> Back
                                to Home
                            </Link>
                        </div>

                        <div className="absolute left-0 bottom-0 -z-10">
                            <img
                                className="w-[34rem]"
                                src={registerImage}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className=" flex flex-row items-center justify-end ">
                        <div className=" rounded-lg lg:px-16 md:px-8 lg:py-16 p-6  border shadow-md bg-[#0C1117]">
                            <h2 className="text-4xl  font-bold pb-8 pt-4">
                                Register
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className=" flex lg:flex-col xl:flex-row flex-col justify-between gap-6">
                                    <div className="grow">
                                        <label
                                            htmlFor="firstName"
                                            className="block md:w-64 w-full pb-2 font-semibold"
                                        >
                                            First Name{" "}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            {...register("firstName", {
                                                required: true,
                                            })}
                                            className=" rounded-md w-full py-3  px-2 bg-[#303644]"
                                            placeholder="Enter email here.."
                                        />
                                        {/* error message */}
                                        <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                            {errors.firstName && (
                                                <span>
                                                    First Name is required *
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                    <div className="">
                                        <label
                                            htmlFor="lastName"
                                            className="block w-full pb-2 font-semibold"
                                        >
                                            Last Name{" "}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            {...register("lastName", {
                                                required: true,
                                            })}
                                            className=" rounded-md w-full py-3 px-2 bg-[#303644]"
                                            placeholder="Enter email here.."
                                        />
                                        {/* error message */}
                                        <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                            {errors.lastName && (
                                                <span>
                                                    Last Name is required *
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                </div>
                                <label
                                    htmlFor="email"
                                    className="block lg:w-96 md:w-72 w-full pb-2 font-semibold mt-6"
                                >
                                    Your Email{" "}
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className=" rounded-md w-full py-3 px-4 bg-[#303644]"
                                    placeholder="Enter email here.."
                                />
                                <label
                                    htmlFor="email"
                                    className="block lg:w-96 md:w-72 w-full pb-2 font-semibold mt-6"
                                >
                                    Photo URL{" "}
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    required
                                    className=" rounded-md w-full py-3 px-4 bg-[#303644]"
                                    placeholder="Enter photo url.."
                                />
                                <label
                                    htmlFor="password"
                                    className="block w-full pb-2  pt-8 font-semibold"
                                >
                                    Password{" "}
                                    <span className="text-red-600">*</span>
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="r rounded-md w-full py-3  px-4 bg-[#303644]"
                                    placeholder="Enter password here.."
                                />
                                <label className="block w-full text-sm text-errorColor">
                                    {registerWithGoogleError}
                                </label>
                                <label className="block md:w-64 w-full  text-sm text-red-600">
                                    {/* {alreadyUsedEmailMessage} */}
                                </label>

                                <button
                                    type="submit"
                                    className="w-full mt-8 py-3 hover:shadow-md  rounded-md bg-gradient-to-r overflow-x-hidden  from-[#94f3b0] to-[#7abf88] text-black font-semibold"
                                >
                                    {buttonLoading ? (
                                        <span className="loading loading-spinner text-black"></span>
                                    ) : (
                                        <span>Register</span>
                                    )}
                                </button>
                            </form>
                            <div className="py-6 grid grid-cols-3 items-center ">
                                <div className="h-0.5 bg-[#303644]"></div>
                                <div className="">
                                    <p className="text-center">OR </p>
                                </div>
                                <div className="h-0.5 bg-[#303644]"></div>
                            </div>
                            <button
                                // onClick={handleRegisterWithGoogle}
                                type="submit"
                                className="w-full flex items-center justify-center gap-3 py-3 border border-primaryColor  rounded-md text-dark"
                            >
                                {googleButtonLoading ? (
                                    <span className="loading loading-spinner text-success"></span>
                                ) : (
                                    <span className="flex items-center justify-center gap-3">
                                        <FcGoogle className="text-2xl"></FcGoogle>
                                        <span>Register with Google</span>
                                    </span>
                                )}
                            </button>
                            <div className="">
                                <p className=" pt-6">
                                    Don&#39;t have any account?{" "}
                                    <Link
                                        className="underline text-[#94f3b0] ps-2"
                                        to={"/register"}
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
