import { useQuery } from "react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../shared/Loading";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import BookedSlot from "./BookedSlot";

const ManageSlot = () => {
    const axiosPublic = useAxiosPublic();
    const { user, loading } = useContext(AuthContext);

    const { data: trainerBookingSlots = [], isLoading } = useQuery({
        queryKey: ["trainerBookingSlots", user.email],
        queryFn: async () => {
            const res = await axiosPublic.get(
                `/user-booking-packages/${user.email}`
            );
            return res.data;
        },
    });

    const { data: trainerData = [], isLoading: isTrainerLoading } = useQuery({
        queryKey: ["trainerData", user.email],
        queryFn: async () => {
            const res = await axiosPublic.get(
                `/trainers/find-by-email/${user.email}`
            );
            return res.data;
        },
    });

    if (loading || isLoading || isTrainerLoading) {
        return <Loading />;
    }
    console.log(trainerBookingSlots);
    const { available_time_slot } = trainerData[0];
    // console.log(userData);
    return (
        <section>
            <h3 className="text-xl p-4  rounded-md bg-gradient-to-r to-[#505ca6] from-[#473f84] mt-3 mb-6">
                Booked Slot
            </h3>

            <div className="grid grid-cols-5  gap-2">
                {available_time_slot?.map((time, idx) => (
                    <p
                        key={idx}
                        className="py-2 px-4 me-1.5 mb-1.5 block rounded-lg text-xs cursor-pointer bg-[#94f3b0]/10 text-[#a3ffb5]"
                    >
                        {time}
                    </p>
                ))}
            </div>
            <div className="grid grid-cols-5 pt-6 gap-2">
                <div className="">
                    {trainerBookingSlots?.map((trainerBookingSlot, idx) => (
                        <span key={idx}>
                            {trainerBookingSlot?.slotId == "0" ? (
                                <BookedSlot
                                    trainerBookingSlot={trainerBookingSlot}
                                ></BookedSlot>
                            ) : (
                                ""
                            )}
                        </span>
                    ))}
                </div>
                <div className="">
                    {trainerBookingSlots?.map((trainerBookingSlot, idx) => (
                        <span key={idx}>
                            {trainerBookingSlot?.slotId == "1" ? (
                                <BookedSlot
                                    trainerBookingSlot={trainerBookingSlot}
                                ></BookedSlot>
                            ) : (
                                ""
                            )}
                        </span>
                    ))}
                </div>
                <div className="">
                    {trainerBookingSlots?.map((trainerBookingSlot, idx) => (
                        <span key={idx}>
                            {trainerBookingSlot.slotId == "2" ? (
                                <BookedSlot
                                    trainerBookingSlot={trainerBookingSlot}
                                ></BookedSlot>
                            ) : (
                                ""
                            )}
                        </span>
                    ))}
                </div>
                <div className="">
                    {trainerBookingSlots?.map((trainerBookingSlot, idx) => (
                        <span key={idx}>
                            {trainerBookingSlot.slotId == "3" ? (
                                <BookedSlot
                                    trainerBookingSlot={trainerBookingSlot}
                                ></BookedSlot>
                            ) : (
                                ""
                            )}
                        </span>
                    ))}
                </div>
                <div className="">
                    {trainerBookingSlots?.map((trainerBookingSlot, idx) => (
                        <span key={idx}>
                            {trainerBookingSlot.slotId == "4" ? (
                                <BookedSlot
                                    trainerBookingSlot={trainerBookingSlot}
                                ></BookedSlot>
                            ) : (
                                ""
                            )}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ManageSlot;
