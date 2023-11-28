import { useQuery } from "react-query";
import Loading from "../../shared/Loading";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Members from "./Members";

const ManageMembers = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const { data: trainerBookingSlots = [], isLoading } = useQuery({
        queryKey: ["trainerBookingSlots", user.email],
        queryFn: async () => {
            const res = await axiosPublic.get(
                `/user-booking-packages/${user.email}`
            );
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading />;
    }
    return (
        <section className="">
            <h2 className="text-2xl">Manage Members</h2>
            <div className="grid grid-cols-5 gap-6 mt-6">
                {trainerBookingSlots.map((trainerBookingSlot, idx) => (
                    <Members key={idx} member={trainerBookingSlot}></Members>
                ))}
            </div>
        </section>
    );
};

export default ManageMembers;
