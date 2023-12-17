import { useQuery } from "react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../shared/Loading";
import MonthCounter from "../allTrainers/MonthCounter";
import { GoEye } from "react-icons/go";
import { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const AllAppliances = () => {
    const [openModal, setOpenModal] = useState(false);

    const axiosPublic = useAxiosPublic();
    const {
        data: { trainers } = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: "trainer",
        queryFn: async () => {
            const res = await axiosPublic.get("/trainers");
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading />;
    }
    const serviceId = "service_iuwr1ri";
    const publicKey = "qdhDVcg6u8gZ0Y4y5";
    const templateId = "template_rgdvwbm";

    const handleAccept = (email, id) => {
        const templateParams = {
            to_email: email,
            subject: "Application Acceptation",
            message:
                "We glad to inform you that your application has been accepted.",
        };
        axiosPublic
            .put(`/trainers/application-accept/${id}`)
            .then((res) => {
                console.log(res.data);
                toast.success("Application accepted", {
                    duration: 2000,
                    className: "mt-32",
                });
                refetch();
                setOpenModal(false);
                emailjs
                    .send(serviceId, templateId, templateParams, publicKey)
                    .then((response) => {
                        console.log("Email sent successfully:", response);
                    })
                    .catch((error) => {
                        console.error("Error sending email:", error);
                    });
                console.log("object");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleReject = (email, id) => {
        const templateParams = {
            to_email: email,
            subject: "Application Rejection",
            message:
                "We regret to inform you that your application has been rejected.",
        };
        axiosPublic
            .delete(`/trainers/${id}`)
            .then((res) => {
                console.log(res.data);
                emailjs
                    .send(serviceId, templateId, templateParams, publicKey)
                    .then((response) => {
                        console.log("Email sent successfully:", response);
                        setOpenModal(false);
                        toast.success("Application Rejected", {
                            duration: 2000,
                            className: "mt-32",
                        });
                    })
                    .catch((error) => {
                        console.error("Error sending email:", error);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <h3 className="text-xl p-4  rounded-md bg-gradient-to-r to-[#505ca6] from-[#473f84] mt-3">
                All Appliances
            </h3>
            {trainers.map((trainer) => (
                <span key={trainer._id}>
                    {trainer.role === "user" && (
                        <div className="grid grid-cols-6 mt-6 py-4 border border-slate-600 px-6 rounded-md shadow-md">
                            {/* modal  */}
                            {openModal && (
                                <div className="absolute bg-black p-10 w-11/12  mx-auto rounded-xl">
                                    <div className="text-end">
                                        <button
                                            onClick={() => setOpenModal(false)}
                                            className="m-3 border p-3 "
                                        >
                                            <VscChromeClose />
                                        </button>
                                    </div>
                                    <div className="">
                                        <div className="col-span-2">
                                            <div className=" grid grid-cols-2 p-3  gap-3 md:mb-10 mb-20">
                                                <div className="">
                                                    <img
                                                        src={trainer.image}
                                                        alt=""
                                                        className="object-cover h-60 w-60 rounded-2xl"
                                                    />
                                                    <h2 className="text-3xl pb-6 pt-3">
                                                        {trainer.name}
                                                    </h2>
                                                    <p className="">
                                                        <span className="text-white/80">
                                                            Email:
                                                        </span>{" "}
                                                        {trainer.email}
                                                    </p>

                                                    <p className="">
                                                        <span className="text-white/80">
                                                            Skills:
                                                        </span>{" "}
                                                        {trainer.skills.map(
                                                            (time, idx) => (
                                                                <p
                                                                    key={idx}
                                                                    className="py-2 px-3 me-1.5 mb-1.5 block rounded-lg text-xs cursor-pointer bg-[#94f3b0]/10 text-[#a3ffb5]"
                                                                >
                                                                    {time} ,
                                                                </p>
                                                            )
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="">
                                                    <p className="">
                                                        <span className="text-white/80">
                                                            Age:
                                                        </span>{" "}
                                                        {trainer.age}
                                                    </p>
                                                    <p className="pt-2">
                                                        <span className="text-white/80">
                                                            Year of experience:
                                                        </span>{" "}
                                                        0{trainer.experience}
                                                    </p>
                                                    <div className="w-">
                                                        <p className="pt-6">
                                                            <p className="text-white/80 mb-2">
                                                                Pik up your time
                                                                slot:
                                                            </p>{" "}
                                                            {trainer.available_time_slot.map(
                                                                (time, idx) => (
                                                                    <span
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className="py-2 px-3 me-1.5 mb-1.5 block rounded-lg text-xs cursor-pointer bg-[#94f3b0]/10 text-[#a3ffb5]"
                                                                    >
                                                                        {time}
                                                                    </span>
                                                                )
                                                            )}
                                                        </p>
                                                    </div>

                                                    <p className="pt-3">
                                                        <span className="text-white/80">
                                                            Available Day in a
                                                            Week:
                                                        </span>{" "}
                                                        {trainer.available_time_in_week.map(
                                                            (time, idx) => (
                                                                <p
                                                                    key={idx}
                                                                    className="py-2 px-3 me-1.5 mb-1.5 block rounded-lg text-xs cursor-pointer bg-[#94f3b0]/10 text-[#a3ffb5]"
                                                                >
                                                                    {time} ,
                                                                </p>
                                                            )
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end space-x-3">
                                        <button
                                            className="h-10 px-4 rounded-full  bg-gradient-to-r from-[#94f3b0] to-[#7abf88] text-black disabled:opacity-40 font-semibold"
                                            onClick={() =>
                                                handleAccept(
                                                    trainer.email,
                                                    trainer._id
                                                )
                                            }
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="h-10 px-4 rounded-full  bg-gradient-to-r from-[#da8846] to-[#cd513e] text-black disabled:opacity-40 font-semibold"
                                            onClick={() =>
                                                handleReject(
                                                    trainer.email,
                                                    trainer._id
                                                )
                                            }
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className="flex gap-6 items-center">
                                <img
                                    className="w-16 h-16 rounded-3xl p-0.5 bg-slate-600 object-cover"
                                    src={trainer.image}
                                    alt=""
                                />
                            </div>

                            <div className="">
                                <div className="">
                                    <p className="text-sm text-white/80 pb-1">
                                        Name:
                                    </p>
                                    <p className="text-xl font-bold">
                                        {trainer.name}
                                    </p>
                                </div>
                                <div className="">
                                    <p className="text-sm text-white/80 pb-1">
                                        Email:
                                    </p>
                                    <p className="text-xs font-bold">
                                        {trainer.email}
                                    </p>
                                </div>
                            </div>

                            <div className="">
                                <div className="">
                                    <p className="text-sm text-white/80 pb-1">
                                        Experience:
                                    </p>
                                    <p className="text-xs font-bold">
                                        {trainer.experience} years
                                    </p>
                                </div>
                                <div className=" pt-2">
                                    <p className="text-sm text-white/80 pb-1">
                                        Age:
                                    </p>
                                    <p className="text-xs font-bold ">
                                        {trainer.age} year
                                    </p>
                                </div>
                            </div>
                            <div className="">
                                <div className="">
                                    <p className="text-sm text-white/80 pb-1">
                                        Joining Date:
                                    </p>
                                    <p className="text-xs font-bold">
                                        {trainer.joiningDate}
                                    </p>
                                </div>
                                <div className=" pt-2">
                                    <p className="text-sm text-white/80 pb-1">
                                        Months since joining:
                                    </p>
                                    <p className="text-xs font-bold">
                                        <MonthCounter
                                            joiningDate={trainer.joiningDate}
                                        />{" "}
                                        months
                                    </p>
                                </div>
                            </div>
                            <div className="">
                                <div className=" pt-2">
                                    <p className="text-sm text-white/80 pb-1">
                                        Application Status:
                                    </p>
                                    <p className="text-xs font-bold text-[#94f3b0]">
                                        {trainer.paymentStatus}
                                    </p>
                                </div>
                            </div>
                            <div className="">
                                <div className="col-span-1 flex md:flex-col flex-row ">
                                    <div className="ms-auto text-end">
                                        <button
                                            onClick={() => setOpenModal(true)}
                                            className="text-xs bg-gradient-to-r from-[#94f3b0] to-[#7abf88] text-black rounded-full px-3.5 py-1.5 font-semibold"
                                        >
                                            <GoEye />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </span>
            ))}
        </div>
    );
};
export default AllAppliances;
