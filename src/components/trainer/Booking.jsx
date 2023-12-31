import PropTypes from "prop-types";
import { BsCheckCircleFill } from "react-icons/bs";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../shared/Loading";

const Booking = ({ packageItem, trainerId, slotId }) => {
    const { user } = useAuth();
    const { name, cost, features, _id } = packageItem;
    const axiosPublic = useAxiosPublic();
    const [err, setErr] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const navigate = useNavigate();
    const { data: trainer = [], isLoading } = useQuery({
        queryKey: ["trainerDetails", trainerId],
        queryFn: async () => {
            const res = await axiosPublic.get(`/trainers/${trainerId}`);
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading />;
    }
    const trainerEmail = trainer[0]?.email;

    const handleJoin = () => {
        const userJoinedPackage = {
            userEmail: user.email,
            packageName: name,
            packageCost: cost,
            packageId: _id,
            trainerId,
            trainerEmail,
            slotId,
            features,
        };
        console.log(userJoinedPackage);
        console.log(userJoinedPackage);
        axiosPublic
            .post("/user-booking-packages", userJoinedPackage)
            .then((res) => {
                setButtonLoading(false);
                console.log(res.data);

                setErr("");
                navigate(`/trainer/${trainerId}/${slotId}/${_id}/payment`);
            })
            .catch((err) => {
                console.log(err);
                setErr(err.message);
            });
    };

    return (
        <div className="border p-10 rounded-xl">
            <h2 className="text-3xl font-semibold">{name}</h2>
            {/* error message */}
            <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                {err}
            </label>
            <p className="text-6xl font-semibold py-6">
                ${cost}{" "}
                <span className="text-base font-normal">/ par month</span>
            </p>
            <div className="">
                {features.map((feature, idx1) => (
                    <div key={idx1} className="">
                        <div className="grid grid-cols-12">
                            <div className="col-span-1">
                                <BsCheckCircleFill className="inline me-1 " />
                            </div>
                            <div className="col-span-11">
                                <p className="ps-6 pb-2">{feature}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={handleJoin}
                className="w-full py-4 font-semibold bg-gradient-to-r from-[#94f3b0] to-[#7abf88] text-black rounded-full mt-6"
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
                    <span>Join Now</span>
                )}
            </button>
        </div>
    );
};

export default Booking;

Booking.propTypes = {
    packageItem: PropTypes.object,
    trainerId: PropTypes.string,
    slotId: PropTypes.string,
};
