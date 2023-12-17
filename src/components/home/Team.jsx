import { useQuery } from "react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { GoLinkExternal } from "react-icons/go";
import { Link } from "react-router-dom";

const Team = () => {
    const axiosPublic = useAxiosPublic();
    const { data: { trainers } = [], isLoading } = useQuery({
        queryKey: "trainers",
        queryFn: async () => {
            const res = await axiosPublic.get("trainers");
            return res.data;
        },
    });
    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <section className="container mx-auto px-6 lg:mt-32 md:mt-24 mt-16 lg:mb-32 md:mb-24 mb-16 ">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                    <div className=" bg-[#303644]  rounded-3xl p-10">
                        <h2 className="text-6xl mb-4">All Time Best Trainer</h2>
                        <p className="  md:text-base text-sm ">
                            a dynamic and accomplished team of fitness
                            professionals dedicated to guiding individuals
                            toward their health and wellness goals.
                        </p>
                    </div>
                    <div className=" bg-[#303644]  rounded-3xl px-10 py-8">
                        <h2 className="text-xl mb-1">{trainers[0].name}</h2>
                        <div className="pt-">
                            <span className="pe-2">Available time: </span>
                            {trainers[0].available_time_slot.map(
                                (time, idx) => (
                                    <p
                                        key={idx}
                                        className="py-1.5 px-2.5 me-1.5 mb-1.5 inline-block rounded-lg text-xs bg-[#94f3b0]/10 text-[#a3ffb5]"
                                    >
                                        {time}
                                    </p>
                                )
                            )}
                        </div>
                    </div>
                    <div className="">
                        <div className=" relative">
                            <img
                                className="h-[32rem] w-full object-cover rounded-3xl"
                                src={trainers[0].image}
                                alt=""
                            />
                            <div className=" absolute block bottom-0 left-0 w-full">
                                <div className="backdrop-blur-md bg-black/30 rounded-2xl m-2 p-6 flex justify-between items-center ">
                                    <p className="">
                                        <span className="text-/80">Email:</span>{" "}
                                        {trainers[0].email}
                                    </p>
                                    <Link to={`/trainer/${trainers[0]._id}`}>
                                        <GoLinkExternal />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="">
                        <div className=" relative">
                            <img
                                className="h-[32rem] w-full object-cover rounded-3xl"
                                src={trainers[1].image}
                                alt=""
                            />
                            <div className=" absolute block bottom-0 left-0 w-full">
                                <div className="backdrop-blur-md bg-black/30 rounded-2xl m-2 p-6 flex justify-between items-center ">
                                    <p className="">
                                        <span className="text-/80">Email:</span>{" "}
                                        {trainers[1].email}
                                    </p>
                                    <Link to={`/trainer/${trainers[1]._id}`}>
                                        <GoLinkExternal />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" bg-[#303644]  rounded-3xl px-10 py-8 ">
                        <p className="">
                            <span className="text-white/80">Age:</span>{" "}
                            {trainers[1].age}
                        </p>
                        <p className="">
                            <span className="text-white/80">
                                Year of experience:
                            </span>{" "}
                            0{trainers[1].experience}
                        </p>
                        <div className="pb-11">
                            <p className="pt-3">
                                Comprising certified trainers with diverse
                                expertise, the team is committed to creating
                                personalized a dynamic and accomplished team of
                                fitness professionals dedicated to guiding
                                individuals toward their health and wellness
                                goals.
                            </p>
                        </div>
                    </div>
                    <div className=" bg-[#303644]  rounded-3xl px-10 py-8">
                        <h2 className="text-xl mb-1">{trainers[1].name}</h2>
                        <div className="pt-">
                            <span className="pe-2">Available time: </span>
                            {trainers[1].available_time_slot.map(
                                (time, idx) => (
                                    <p
                                        key={idx}
                                        className="py-1.5 px-2.5 me-1.5 mb-1.5 inline-block rounded-lg text-xs bg-[#94f3b0]/10 text-[#a3ffb5]"
                                    >
                                        {time}
                                    </p>
                                )
                            )}
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className=" bg-[#303644]  rounded-3xl px-10 py-8">
                        <h2 className="text-xl mb-1">{trainers[2].name}</h2>
                        <div className="pt-">
                            <span className="pe-2">Available time: </span>
                            {trainers[2].available_time_slot.map(
                                (time, idx) => (
                                    <p
                                        key={idx}
                                        className="py-1.5 px-2.5 me-1.5 mb-1.5 inline-block rounded-lg text-xs bg-[#94f3b0]/10 text-[#a3ffb5]"
                                    >
                                        {time}
                                    </p>
                                )
                            )}
                        </div>
                    </div>
                    <div className="">
                        <div className=" relative">
                            <img
                                className="h-[32rem] w-full object-cover rounded-3xl"
                                src={trainers[2].image}
                                alt=""
                            />
                            <div className=" absolute block bottom-0 left-0 w-full">
                                <div className="backdrop-blur-md bg-black/30 rounded-2xl m-2 p-6 flex justify-between items-center ">
                                    <p className="">
                                        <span className="text-/80">Email:</span>{" "}
                                        {trainers[2].email}
                                    </p>
                                    <Link to={`/trainer/${trainers[2]._id}`}>
                                        <GoLinkExternal />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" bg-[#303644]  rounded-3xl px-10 py-8 ">
                        <p className="">
                            <span className="text-white/80">Age:</span>{" "}
                            {trainers[2].age}
                        </p>
                        <p className="">
                            <span className="text-white/80">
                                Year of experience:
                            </span>{" "}
                            0{trainers[2].experience}
                        </p>
                        <div className="pb-11">
                            <p className="pt-3">
                                Comprising certified trainers with diverse
                                expertise, the team is committed to creating
                                personalized a dynamic and accomplished team of
                                fitness professionals dedicated to guiding
                                individuals toward their health and wellness
                                goals.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;
