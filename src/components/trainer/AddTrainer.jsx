import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineArrowUpTray } from "react-icons/hi2";
import Select from "react-select";
import { BsFillImageFill } from "react-icons/bs";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const AddTrainer = () => {
    const [err, setErr] = useState("");
    const { user } = useAuth();
    // get today date
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    const joiningDate = `${mm}-${dd}-${yyyy}`;
    console.log(joiningDate);
    const imageUploadKey = "bbb19450ec34611b6204ad31a2909518";
    const [uploadFile, setFile] = useState();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState();

    //selected skill
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const selectedSkillValues = selectedSkill?.map((item) => item.value);
    const selectedTimeValues = selectedTime?.map((item) => item.value);
    const selectedDayValues = selectedDay?.map((item) => item.value);
    console.log(selectedDayValues, selectedSkillValues, selectedTimeValues);

    // error handling
    const [uploadedImageError, setUploadedImageError] = useState("");
    const [selectedSkillError, setSelectedSkillError] = useState("");
    const [selectedTimeError, setSelectedTimeError] = useState("");
    const [selectedDayError, setSelectedDayError] = useState("");

    console.log(selectedSkill);
    const axiosPublic = useAxiosPublic();

    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
        setUploadedImage(e.target.files[0]);
    }
    const skillOptions = [
        {
            value: "Personalized Training Programs",
            label: "Personalized Training Programs",
        },
        {
            value: "Strength and Conditioning",
            label: "Strength and Conditioning",
        },
        { value: "Nutritional Guidance", label: "Nutritional Guidance" },
        { value: "Functional Training", label: "Functional Training" },
        { value: "HIIT", label: "HIIT" },
        { value: "Motivational Coaching", label: "Motivational Coaching" },
        {
            value: "Group Fitness Instruction",
            label: "Group Fitness Instruction",
        },
    ];
    const available_time_slotOptions = [
        { value: "8am - 9am", label: "8am - 9am" },
        { value: "6pm - 7pm", label: "6pm - 7pm" },
        { value: "7pm - 8pm", label: "7pm - 8pm" },
        { value: "8pm - 9pm", label: "8pm - 9pm" },
        { value: "9pm - 10pm", label: "9pm - 10pm" },
    ];
    const available_time_in_weekOptions = [
        { value: "Sunday", label: "Sunday" },
        { value: "Monday", label: "Monday" },
        { value: "Tuesday", label: "Tuesday" },
        { value: "Wednesday", label: "Wednesday" },
        { value: "Thursday", label: "Thursday" },
        { value: "Friday", label: "Friday" },
        { value: "Saturday", label: "Saturday" },
    ];

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: "100%",
            backgroundColor: state.isSelected ? "#0C1117" : "#1E242E", // Change these colors as needed

            padding: "6px",
        }),
    };
    const handleSkillChange = (selectedOption) => {
        setSelectedSkill(selectedOption);
    };
    const handleDayChange = (selectedOption) => {
        setSelectedDay(selectedOption);
    };
    const handleTimeChange = (selectedOption) => {
        setSelectedTime(selectedOption);
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        setButtonLoading(true);
        if (!uploadedImage) {
            setUploadedImageError("Image require");
        } else {
            setUploadedImageError("");
            if (selectedSkill.length !== 0) {
                setSelectedSkillError("");
                if (selectedDay.length !== 0) {
                    setSelectedDayError("");
                    if (selectedTime.length !== 0) {
                        setSelectedTimeError("");

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
                                    const newTrainerData = {
                                        image: result.data.url,
                                        name: data.name,
                                        age: data.age,
                                        experience: data.experience,
                                        email: data.email,
                                        available_time_in_week:
                                            selectedDayValues,
                                        available_time_slot: selectedTimeValues,
                                        skills: selectedSkillValues,
                                        joiningDate: joiningDate,
                                        available_time_in_day: "Flexible",
                                    };
                                    console.log(newTrainerData);
                                    axiosPublic
                                        .post("/trainers", newTrainerData)
                                        .then((res) => {
                                            setButtonLoading(false);
                                            console.log(res.data);
                                            Swal.fire({
                                                title: "Add successfully",
                                                text: "Your file has been deleted.",
                                                icon: "success",
                                            });
                                            setErr("");
                                            reset();
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            setErr(err.message);
                                        });
                                }
                                console.log(result);
                            });
                    } else {
                        setSelectedTimeError("Time is require");
                    }
                } else {
                    setSelectedDayError("Day is require");
                }
            } else {
                setSelectedSkillError("Skill is require");
            }
        }
    };
    return (
        <section className="container mx-auto px-6 py-16">
            <Helmet>
                <title>Modern Gym | Be a Trainer</title>
            </Helmet>
            <h2 className="text-4xl ">Be a Trainer</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-[#303644] p-20 rounded-xl mt-6"
            >
                <div className="grid grid-cols-5">
                    <div className=" col-span-2 me-36">
                        <div className="bg-[#0C1117]/50 p-2 rounded-lg items-center h-96 w-96 border border-dash">
                            {uploadFile ? (
                                <img
                                    className="object-cover border-0  rounded-lg w-full h-full mx-auto my-auto mb-0"
                                    src={uploadFile}
                                    alt=""
                                />
                            ) : (
                                <div className="h-full flex justify-center items-center">
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
                                className="block cursor-pointer bg-[#0C1117]/50 w-full rounded-lg py-3 text-center font-semibold"
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
                        <div className="grow">
                            <label
                                htmlFor="Experience"
                                className="block w-full pb-2 font-semibold mt-2"
                            >
                                Year of Experience{" "}
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="number"
                                name="name"
                                {...register("experience", {
                                    required: true,
                                })}
                                className=" rounded-md w-full py-3 px-2 bg-[#0C1117]/50"
                                placeholder="Enter your Year of Experience here.."
                            />
                            {/* error message */}
                            <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                {errors.experience && (
                                    <span>Experience is required *</span>
                                )}
                            </label>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="flex justify-between items-center gap-6">
                            <div className="grow">
                                <label
                                    htmlFor="lastName"
                                    className="block w-full pb-2 font-semibold"
                                >
                                    Full Name{" "}
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    {...register("name", {
                                        required: true,
                                    })}
                                    className=" rounded-md w-full py-3 px-2 bg-[#0C1117]/50"
                                    placeholder="Enter last name here.."
                                />
                                {/* error message */}
                                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                    {errors.name && (
                                        <span>Name is required *</span>
                                    )}
                                </label>
                            </div>
                            <div className="">
                                <label
                                    htmlFor="lastName"
                                    className="block w-full pb-2 font-semibold"
                                >
                                    Age <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="age"
                                    {...register("age", {
                                        required: true,
                                    })}
                                    className=" rounded-md w-full py-3 px-2 bg-[#0C1117]/50"
                                    placeholder="Enter last name here.."
                                />
                                {/* error message */}
                                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                    {errors.age && (
                                        <span>Name is required *</span>
                                    )}
                                </label>
                            </div>
                        </div>
                        <label
                            htmlFor="email"
                            className="block lg:w-96 md:w-72 w-full pb-2 font-semibold mt-7"
                        >
                            Your Email <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            readOnly
                            defaultValue={user?.email}
                            {...register("email", { required: true })}
                            className=" rounded-md w-full py-3 px-4 bg-[#0C1117]/50"
                            placeholder="Enter email here.."
                        />
                        {/* error message */}
                        <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                            {errors.email && (
                                <span>{errors.email?.message}</span>
                            )}
                            {errors.email?.type === "required" &&
                                "Email is required *"}
                        </label>
                        <label
                            htmlFor="email"
                            className="block lg:w-96 md:w-72 w-full pb-2 font-semibold mt-7"
                        >
                            Skills <span className="text-red-600">*</span>
                        </label>
                        <Select
                            id="skills"
                            name="skills"
                            className="bg-[#0C1117]/50 text-black"
                            options={skillOptions}
                            onChange={handleSkillChange}
                            isMulti
                            styles={customStyles}
                            placeholder="Select skills..."
                        />
                        <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                            {selectedSkillError}
                        </label>
                        <label
                            htmlFor="email"
                            className="block lg:w-96 md:w-72 w-full pb-2 font-semibold mt-7"
                        >
                            Available Time in a week
                            <span className="text-red-600">*</span>
                        </label>
                        <Select
                            id="day"
                            name="day"
                            className="bg-[#0C1117]/50 text-black"
                            options={available_time_in_weekOptions}
                            onChange={handleDayChange}
                            isMulti
                            styles={customStyles}
                            placeholder="Select Time..."
                        />
                        {/* error message */}
                        <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                            {selectedDayError}
                        </label>
                        <label
                            htmlFor="email"
                            className="block lg:w-96 md:w-72 w-full pb-2 font-semibold mt-7"
                        >
                            Available time in a day
                            <span className="text-red-600">*</span>
                        </label>
                        <Select
                            id="time"
                            name="time"
                            className="bg-[#0C1117]/50 text-black"
                            options={available_time_slotOptions}
                            onChange={handleTimeChange}
                            isMulti
                            styles={customStyles}
                            placeholder="Select day..."
                        />
                        {/* error message */}
                        <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                            {selectedTimeError}
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-8 py-3 hover:shadow-md  rounded-md bg-gradient-to-r overflow-x-hidden  from-[#94f3b0] to-[#7abf88] text-black font-semibold"
                >
                    {buttonLoading ? (
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                        <span>Be a trainer</span>
                    )}
                </button>
                {/* error message */}
                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                    {err}
                </label>
            </form>
        </section>
    );
};

export default AddTrainer;
