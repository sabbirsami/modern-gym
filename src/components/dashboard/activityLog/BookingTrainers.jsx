import PropTypes from "prop-types";
import { useQuery } from "react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../shared/Loading";

const BookingTrainers = ({ slot }) => {
    const { trainerEmail } = slot;

    const axiosPublic = useAxiosPublic();
    const { data: trainerData = [], isLoading: isTrainerLoading } = useQuery({
        queryKey: ["trainerData", trainerEmail],
        queryFn: async () => {
            const res = await axiosPublic.get(
                `/trainers/find-by-email/${trainerEmail}`
            );
            return res.data;
        },
    });
    if (isTrainerLoading) {
        return <Loading />;
    }
    return <div></div>;
};

export default BookingTrainers;

BookingTrainers.propTypes = {
    slot: PropTypes.object,
};
