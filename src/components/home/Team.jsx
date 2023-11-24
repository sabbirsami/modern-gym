import { useQuery } from "react-query";

const Team = () => {
    const { data: trainers = [], isLoading } = useQuery({
        queryKey: "trainers",
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
        <section className="container mx-auto px-6 lg:mt-32 md:mt-24 mt-16 lg:mb-32 md:mb-24 mb-16 ">
            <div className="">
                <h2 className="2xl:text-8xl xl:text-8xl md:text-7xl text-4xl text-center font-bold mb-6">
                    All Time Best Trainer
                </h2>
                <p className="mb-16 xl:w-8/12 lg:w-10/12 md:w-11/12 mx-auto md:text-base text-sm text-center">
                    a dynamic and accomplished team of fitness professionals
                    dedicated to guiding individuals toward their health and
                    wellness goals. Comprising certified trainers with diverse
                    expertise, the team is committed to creating personalized
                    and effective workout regimens tailored to each client&#39;s
                    unique needs.
                </p>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 xl:gap-16 lg:gap-6 md:gap-6 justify-center items-center">
                    {trainers.slice(0, 3).map((trainer, idx) => (
                        <div key={idx} className="">
                            <div className="bg-gradient-to-b  from-[#0C1117] to-[#303644] p-3  h-[28rem] rounded-3xl md:mb-10 mb-20">
                                <img
                                    src={trainer.image}
                                    alt=""
                                    className="object-cover h-full w-full rounded-2xl"
                                />

                                <div className="flex justify-between items-center">
                                    <div className="flex">
                                        <h2 className="text-4xl pt-6">
                                            0{idx + 1}
                                        </h2>
                                        <div className="h-14 w-1 rotate-12 ms-4 mt-4 bg-white"></div>
                                    </div>
                                    <h2 className="xl:text-4xl lg:text-3xl text-xl pt-6 bg-gradient-to-r from-[#94f3b0]  to-[#7abf88] text-transparent bg-clip-text">
                                        {trainer.name}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
