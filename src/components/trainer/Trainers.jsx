import { useQuery } from "react-query";
import Trainer from "./Trainer";

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
        </section>
    );
};

export default Trainers;
