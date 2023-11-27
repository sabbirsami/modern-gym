import { useQuery } from "react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../shared/Loading";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";

const ManageSlot = () => {
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
    console.log(trainerBookingSlots);
    return <div></div>;
};

export default ManageSlot;
