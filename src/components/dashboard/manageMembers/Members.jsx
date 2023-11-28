import PropTypes from "prop-types";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import emailjs from "@emailjs/browser";
import MemberLoading from "./MemberLoading";
import { IoSend } from "react-icons/io5";
import { Modal } from "flowbite-react";

const Members = ({ member }) => {
    const [openModal, setOpenModal] = useState(false);
    const axiosPublic = useAxiosPublic();
    const { userEmail } = member;

    const messageRef = useRef(null);

    const { data: userData = [], isLoading: isUserLoading } = useQuery({
        queryKey: ["userData", userEmail],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/role/${userEmail}`);
            return res.data;
        },
    });
    if (isUserLoading) {
        return <MemberLoading />;
    }
    const serviceId = "service_iuwr1ri";
    const publicKey = "qdhDVcg6u8gZ0Y4y5";
    const templateId = "template_rgdvwbm";

    const handleSendMessage = (e) => {
        e.preventDefault();
        const message = messageRef.current.value;
        console.log(message);
        const templateParams = {
            to_email: userEmail,
            subject: "Modern Gym trainer Message",
            message: message,
        };
        emailjs
            .send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                console.log("Email sent successfully:", response);
                setOpenModal(false);
                toast.success("Message Sended", {
                    duration: 2000,
                    className: "mt-32",
                });
                setOpenModal(false);
            })
            .catch((error) => {
                console.error("Error sending email:", error);
            });
    };

    return (
        <div className="p-4 me-1.5 mb-1.5  rounded-lg text-xs cursor-pointer bg-[#94f3b0]/10 text-white">
            <div className="flex gap-3">
                <img
                    src={userData[0].photoUrl}
                    alt=""
                    className="w-16 h-16 rounded-3xl"
                />
                <div className="">
                    <h5 className="text-xl pb-1">{userData[0].name}</h5>
                    <p>Email: {userEmail}</p>
                </div>
            </div>

            <div className="space-x-2 text-end mt-2">
                <button
                    onClick={() => setOpenModal(true)}
                    className=" rounded-full px-2.5 bg-[#94f3b0] text-black text-xs font-semibold py-0.5 mt-3  "
                >
                    Send Message
                </button>
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Send Message</Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="space-y-4">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                To:{" "}
                                <span className="text-black">{userEmail}</span>
                            </p>
                            <textarea
                                name="message"
                                ref={messageRef}
                                className="w-full border-0 rounded-md bg-gray-400/10"
                                placeholder="Message..."
                                id=""
                                cols="30"
                                rows="8"
                            ></textarea>
                        </div>
                        <div className="text-end">
                            <button
                                className="px-4 py-3 bg-[#94f3b0] rounded-md mt-6"
                                type="submit"
                                onClick={handleSendMessage}
                            >
                                Send <IoSend className="inline ms-3" />
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Members;

Members.propTypes = {
    member: PropTypes.object,
};
