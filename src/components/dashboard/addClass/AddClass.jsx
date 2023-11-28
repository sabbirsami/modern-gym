import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AddClass = () => {
    const [requiredError, setRequiredError] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const descriptionRef = useRef();
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        const short_description = descriptionRef.current.value;
        if (!short_description) {
            return setRequiredError("Required *");
        }
        setButtonLoading(true);
        const benefits = [
            "Improved functional strength",
            "Enhanced endurance",
            "Increased flexibility",
        ];
        const equipmentNeeded = [
            "Comfortable workout clothes",
            "Cross-training shoes",
        ];
        setRequiredError("");
        const classData = {
            name: data.name,
            benefits,
            equipmentNeeded,
            duration: data.duration,
            intensityLevel: data.intensityLevel,
            capacity: data.capacity,
            targetAudience: "All fitness levels",
            short_description,
            cost: data.cost,
            prerequisites: data.prerequisites,
        };
        axiosPublic
            .post("classes-details", classData)
            .then((res) => {
                console.log(res.data);
                setButtonLoading(false);
                reset();
            })
            .catch((err) => {
                console.log(err);
                setButtonLoading(false);
            });
    };
    return (
        <section className="mt-3">
            <h2 className="text-2xl">Add New Class</h2>
            <div className="p-12 rounded-xl mt-6 shadow-md shadow-[#94f3b0]/20">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid ">
                        <div className=" flex gap-6">
                            <div className=" grow ">
                                <label className="mt-3" htmlFor="name">
                                    Name <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    className="w-full rounded-md border-0 bg-[#303644] py-3 mt-2"
                                    placeholder="Class name"
                                />
                                {/* error message */}
                                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                    {errors.name && (
                                        <span>Name is required *</span>
                                    )}
                                </label>
                            </div>
                            <div className="">
                                <label className="mt-3" htmlFor="duration">
                                    Duration{" "}
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    {...register("duration", {
                                        required: true,
                                    })}
                                    className="w-full rounded-md border-0 bg-[#303644] py-3 mt-2"
                                    placeholder="Duration"
                                />
                                {/* error message */}
                                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                    {errors.duration && (
                                        <span>duration is required *</span>
                                    )}
                                </label>
                            </div>
                        </div>
                        <div className="mt-3 flex gap-6">
                            <div className="mt-3">
                                <label className="mt-3" htmlFor="name">
                                    Capacity{" "}
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    {...register("capacity", {
                                        required: true,
                                    })}
                                    className="w-full rounded-md border-0 bg-[#303644] py-3 mt-2"
                                    placeholder="Capacity"
                                />
                                {/* error message */}
                                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                    {errors.capacity && (
                                        <span>capacity is required *</span>
                                    )}
                                </label>
                            </div>
                            <div className="mt-3 grow">
                                <label
                                    className="mt-3"
                                    htmlFor="intensityLevel"
                                >
                                    Intensity Level{" "}
                                    <span className="text-red-600">*</span>
                                </label>

                                <select
                                    className="w-full rounded-md border-0 bg-[#303644] py-3 mt-2"
                                    {...register("intensityLevel", {
                                        required: true,
                                    })}
                                    name="intensityLevel"
                                    id="intensityLevel"
                                >
                                    <option value="Intermediate">
                                        Intermediate
                                    </option>
                                    <option value="Advanced ">Advanced</option>
                                    <option value="basic ">Basic</option>
                                </select>
                                {/* error message */}
                                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                    {errors.intensityLevel && (
                                        <span>
                                            intensity level is required *
                                        </span>
                                    )}
                                </label>
                            </div>
                        </div>
                        <div className="mt-3 flex gap-6">
                            <div className="mt-3 grow">
                                <label className="mt-3" htmlFor="prerequisites">
                                    Prerequisites{" "}
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("prerequisites", {
                                        required: true,
                                    })}
                                    className="w-full rounded-md border-0 bg-[#303644] py-3 mt-2"
                                    placeholder="prerequisites"
                                />
                                {/* error message */}
                                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                    {errors.prerequisites && (
                                        <span>prerequisites is required *</span>
                                    )}
                                </label>
                            </div>
                            <div className="mt-3">
                                <label className="mt-3" htmlFor="cost">
                                    Cost <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    {...register("cost", { required: true })}
                                    className="w-full rounded-md border-0 bg-[#303644] py-3 mt-2"
                                    placeholder="cost"
                                />
                                {/* error message */}
                                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                    {errors.cost && (
                                        <span>cost is required *</span>
                                    )}
                                </label>
                            </div>
                        </div>
                        <div className="mt-3">
                            <label className="mt-3" htmlFor="short_description">
                                Short Description{" "}
                                <span className="text-red-600">*</span>
                            </label>
                            <textarea
                                ref={descriptionRef}
                                name=""
                                className="w-full rounded-md border-0 bg-[#303644] py-3 mt-2"
                                placeholder="short description"
                                id=""
                                cols="30"
                                rows="10"
                            ></textarea>
                            {/* error message */}
                            <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                <span>{requiredError}</span>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-[#94f3b0] to-[#7abf88] text-black w-full rounded-md py-3 mt-3"
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
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                <span>Add Class</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddClass;
