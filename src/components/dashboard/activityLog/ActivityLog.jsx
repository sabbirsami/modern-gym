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
            <h2 className="text-2xl">Activity Log</h2>
            <div className="">
                <h2 className="text-xl mt-16">Your booking trainers</h2>
                <div className=" pt-6 grid grid-cols-3 gap-6">
                    {userBookingSlots.map((slot) => (
                        <BookingTrainers
                            key={slot._id}
                            slot={slot}
                            className=""
                        ></BookingTrainers>
                    ))}
                </div>
                <h2 className="text-xl mt-6">Your booking packages</h2>
                <div className=" pt-6 grid grid-cols-4 gap-6">
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
