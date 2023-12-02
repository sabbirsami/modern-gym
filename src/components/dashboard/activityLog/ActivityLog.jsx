import { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import Loading from "../../shared/Loading";
import BookingPackage from "./BookingPackage";
import BookingTrainers from "./BookingTrainers";

const ActivityLog = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const { data: userBookingSlots = [], isLoading } = useQuery({
        queryKey: ["userBookingSlots", user.email],
        queryFn: async () => {
            const res = await axiosPublic.get(
                `/user-booking-packages/userData/${user.email}`
            );
            return res.data;
        },
    });

    if (loading || isLoading) {
        return <Loading />;
    }

    console.log(userBookingSlots);
    return (
        <section className="">
            <h3 className="text-xl p-4  rounded-md bg-gradient-to-r to-[#505ca6] from-[#473f84] mt-3 mb-6">
                Activity Log
            </h3>

            <div className="">
                <h2 className="text-xl ">Your booking trainers</h2>
                <div className=" pt-6 grid grid-cols-3 gap-6">
                    {userBookingSlots.map((slot) => (
                        <BookingTrainers
                            key={slot._id}
                            slot={slot}
                            className=""
                        ></BookingTrainers>
                    ))}
                </div>
                <h3 className="text-xl p-4  rounded-md bg-gradient-to-r to-[#505ca6] from-[#473f84] mt-10 mb-6">
                    Your booking packages
                </h3>

                <div className=" pt-2 grid grid-cols-4 gap-6">
                    {userBookingSlots.map((slot) => (
                        <BookingPackage
                            key={slot._id}
                            slot={slot}
                            className=""
                        ></BookingPackage>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ActivityLog;
