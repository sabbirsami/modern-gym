import PropTypes from "prop-types";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import Loading from "../../shared/Loading";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import SlotLoading from "./SlotLoading";

const BookedSlot = ({ trainerBookingSlot }) => {
    const axiosPublic = useAxiosPublic();
    const { userEmail } = trainerBookingSlot;
    const [accept, setAccept] = useState(false);

    const { data: userData = [], isLoading: isUserLoading } = useQuery({
        queryKey: ["userData", userEmail],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/role/${userEmail}`);
            return res.data;
        },
    });
    if (isUserLoading) {
        return <SlotLoading />;
    }
    const serviceId = "service_iuwr1ri";
    const publicKey = "qdhDVcg6u8gZ0Y4y5";
    const templateId = "template_rgdvwbm";

    const handleAcceptButton = () => {
        setAccept(true);
    };
    const handleRejectButton = () => {
        const templateParams = {
            to_email: userEmail,
            subject: "Class booking rejected",
            message:
                "We regret to inform you that your class booking has been rejected.",
        };
        emailjs
            .send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                setAccept(true);
                console.log("Email sent successfully:", response);
                toast.success("Rejected mail send", {
                    duration: 2000,
                    className: "mt-32",
                });
            })
            .catch((error) => {
                console.error("Error sending email:", error);
            });
    };
    console.log(userData);
    return (
        <div className="p-4 me-1.5 mb-1.5  rounded-lg text-xs cursor-pointer bg-[#94f3b0]/10 text-white">
            <h5 className="text-xl pb-1">{userData[0].name}</h5>
            <p>Email: {trainerBookingSlot?.userEmail}</p>
            {!accept && (
                <div className="space-x-2 text-end">
                    <button
                        onClick={handleAcceptButton}
                        className=" rounded-full px-1.5 bg-[#94f3b0] text-black mt-3"
                    >
                        accept
                    </button>
                    <button
                        onClick={handleRejectButton}
                        className=" rounded-full px-1.5 bg-[#cd513e] text-white mt-3"
                    >
                        reject
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookedSlot;

BookedSlot.propTypes = {
    trainerBookingSlot: PropTypes.object,
};
