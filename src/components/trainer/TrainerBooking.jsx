import { useQuery } from "react-query";
import Loading from "../shared/Loading";
import { useParams } from "react-router-dom";
import shapeImage from "../../assets/icon/shape03.png";
import Booking from "./Booking";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../hooks/useAxiosPublic";

const TrainerBooking = () => {
    const { id, trainerId } = useParams();
    const axiosPublic = useAxiosPublic();
    const { data: gymPackages = [], isLoading } = useQuery({
        queryKey: "gymPackages",
        queryFn: async () => {
            const res = await axiosPublic.get(`/gym-packages`);
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading />;
    }

    console.log(id, gymPackages);
    return (
        <section className="relative">
            <Helmet>
                <title>Modern Gym | Booking</title>
            </Helmet>
            <img
                src={shapeImage}
                alt=""
                className="absolute bottom-0 -left-32 -z-20"
            />
            <div className="py-16 container mx-auto px-6">
                <h2 className="text-6xl text-center">Trainer Booking</h2>
                <div className="grid xl:grid-cols-3 lg:grid-cols-2  justify-center items-start gap-16 mx-24 py-16 ">
                    {gymPackages.map((packageItem) => (
                        <Booking
                            key={packageItem._id}
                            packageItem={packageItem}
                            trainerId={trainerId}
                            slotId={id}
                        ></Booking>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrainerBooking;
