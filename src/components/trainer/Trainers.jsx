import { useQuery } from "react-query";
import Trainer from "./Trainer";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loading from "../shared/Loading";

const Trainers = () => {
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    console.log(location);
    const { data: { trainers } = [], isLoading } = useQuery({
        queryKey: "trainer",
        queryFn: async () => {
            const res = await axiosPublic.get("/trainers");
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading />;
    }

    return (
        <section className="container mx-auto px-6 py-32">
            <Helmet>
                <title>Modern Gym | Trainers</title>
            </Helmet>
            <h2 className="md:text-8xl text-6xl md:pb-16 pb-6">Our Trainers</h2>
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-10">
                {trainers.map((trainer, idx) => (
                    <span key={idx}>
                        {trainer.role === "trainer" && (
                            <Trainer trainer={trainer} id={idx}></Trainer>
                        )}
                    </span>
                ))}
            </div>
            <div className="mx-auto text-center mt-16">
                <Link
                    to={"/add-trainer"}
                    className="px-6 py-4 bg-gradient-to-r from-[#94f3b0]  to-[#7abf88] text-black rounded-full font-semibold cursor-pointer"
                >
                    Become a trainer
                </Link>
            </div>
        </section>
    );
};

export default Trainers;
