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
            <h3 className="text-xl p-4  rounded-md bg-gradient-to-r to-[#505ca6] from-[#473f84] mt-3 mb-6">
                Manage Members
            </h3>

            <div className="grid grid-cols-5 gap-6 mt-6">
                {trainerBookingSlots.map((trainerBookingSlot, idx) => (
                    <Members key={idx} member={trainerBookingSlot}></Members>
                ))}
            </div>
        </section>
    );
};

export default ManageMembers;
