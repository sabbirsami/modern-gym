import { Helmet } from "react-helmet-async";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import signInImage from "../../assets/person/signIn.png";
import dumble from "../../assets/dumble2.png";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsArrowLeft } from "react-icons/bs";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SignIn = () => {
    const axiosPublic = useAxiosPublic();
    const { signInWithGoogle, setLoading, signInUser } = useAuth();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [googleButtonLoading, setGoogleButtonLoading] = useState(false);
    const [signInWithGoogleError, setSignInWithGoogleError] = useState("");

    const location = useLocation();
    console.log(location);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        setButtonLoading(true);
        signInUser(email, password)
            .then((result) => {
                console.log(result);
                setSignInWithGoogleError("");
                setLoading(false);
                setButtonLoading(false);
                navigate(
                    location.state?.comeFrom ? location.state?.comeFrom : "/"
                );
                toast.success(" Sign In successfully", {
                    duration: 2000,
                    className: "mt-32",
                });
            })
            .catch((err) => {
                setSignInWithGoogleError(
                    err.message?.split("(")[1]?.split("-").join(" ")
                );
                console.log(signInWithGoogleError);
                setButtonLoading(false);
                toast.error(" Sign In fail", {
                    duration: 2000,
                    className: "mt-32",
                });
            });
    };
    const handleSignInWithGoogle = () => {
        setLoading(true);
        setGoogleButtonLoading(true);
        signInWithGoogle()
            .then((result) => {
                console.log(result);
                const newUser = {
                    name: result?.user.displayName,
                    email: result?.user.email,
                    uid: result?.user.uid,
                    photoUrl: result?.user.photoURL,
                    role: "user",
                    trainerId: "",
                    country: "",
                    phoneNumber: "",
                    district: "",
                    age: 0,
                    gender: "",
                    weight: 0,
                    height: "",
                    DateOfBirth: "",
                };
                axiosPublic
                    .post("/users", newUser)
                    .then((res) => {
                        console.log(res.data);

                        setSignInWithGoogleError("");
                        setLoading(false);
                        setGoogleButtonLoading(false);
                        navigate(
                            location.state?.comeFrom
                                ? location.state?.comeFrom
                                : "/"
                        );
                        toast.success(" Sign In successfully", {
                            duration: 2000,
                            className: "mt-32",
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                setSignInWithGoogleError(
                    err.message?.split("(")[1]?.split("-").join(" ")
                );
                console.log(signInWithGoogleError);
                setGoogleButtonLoading(false);
                toast.error(" Sign In fail", {
                    duration: 2000,
                    className: "mt-32",
                });
            });
    };

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
                        <div className="">
                            <img
                                className="xl:w-72 lg:w-40 w-36 -rotate-45"
                                src={dumble}
                                alt=""
                            />
                        </div>
                        <div className="absolute left-0 bottom-0 -z-10">
                            <img
                                className="w-[34rem]"
                                src={signInImage}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className=" flex flex-row items-center justify-end">
                        <div className=" rounded-lg lg:px-16 md:px-8 lg:py-16 p-6  border shadow-md bg-[#0C1117]/90">
                            <h2 className="text-4xl  font-bold pb-8 pt-4">
                                Sign In
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <label
                                    htmlFor="email"
                                    className="block lg:w-96 md:w-72 w-full pb-2 font-semibold"
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
                                <label className="block w-full text-sm text-red-600">
                                    {signInWithGoogleError}
                                </label>
                                <label className="block md:w-64 w-full  text-sm text-red-600">
                                    {/* {alreadyUsedEmailMessage} */}
                                </label>

                                <button
                                    type="submit"
                                    className="w-full mt-8 py-3 hover:shadow-md  rounded-md bg-gradient-to-r overflow-x-hidden  from-[#94f3b0] to-[#7abf88] text-black font-semibold"
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
                                        <span>Sign In</span>
                                    )}
                                </button>
                            </form>
                            <div className="py-6 grid grid-cols-3 items-center ">
                                <div className="h-0.5 bg-white/70"></div>
                                <div className="">
                                    <p className="text-center">OR </p>
                                </div>
                                <div className="h-0.5 bg-white/70"></div>
                            </div>
                            <button
                                onClick={handleSignInWithGoogle}
                                type="submit"
                                className="w-full flex items-center justify-center gap-3 py-3 border border-primaryColor  rounded-md text-dark"
                            >
                                {googleButtonLoading ? (
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
                                    <span className="flex items-center justify-center gap-3">
                                        <FcGoogle className="text-2xl"></FcGoogle>
                                        <span>Sign in with Google</span>
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
                                        Register
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

export default SignIn;
