import { useForm } from "react-hook-form";
import newsLetterImage from "../../assets/person/man0.png";
import useAxiosPublic from "../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const Newsletter = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const axiosPublic = useAxiosPublic();
    const onSubmit = (data) => {
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
                        className="lg:col-span-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h2 className="md:text-5xl text-3xl pb-6">
                            Subscribe Our Newsletter
                        </h2>
                        <div className=" flex lg:flex-col xl:flex-row flex-col justify-between gap-6">
                            <div className="grow">
                                <label
                                    htmlFor="firstName"
                                    className="block md:w-64 w-full pb-2 font-semibold"
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
                                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                    {errors.firstName && (
                                        <span>First Name is required *</span>
                                    )}
                                </label>
                            </div>
                            <div className="">
                                <label
                                    htmlFor="lastName"
                                    className="block w-full pb-2 font-semibold"
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
                                Subscribe
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
