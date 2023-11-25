import { useQuery } from "react-query";
import Trainer from "./Trainer";
import { Link } from "react-router-dom";

const Trainers = () => {
    const { data: trainers = [], isLoading } = useQuery({
        queryKey: "trainer",
        queryFn: () =>
            fetch("trainer.json")
                .then((res) => res.json())
                .catch((err) => {
                    console.log(err);
                }),
    });
    if (isLoading) {
        return <p>Loading...</p>;
    }
    console.log(trainers);
    return (
        <section className="container mx-auto px-6 py-32">
            <h2 className="md:text-8xl text-6xl md:pb-16 pb-6">Our Trainers</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
                {trainers.map((trainer, idx) => (
                    <Trainer key={idx} trainer={trainer} id={idx}></Trainer>
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
