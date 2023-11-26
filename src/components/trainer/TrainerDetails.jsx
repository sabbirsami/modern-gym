import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import Loading from "../shared/Loading";
import { Helmet } from "react-helmet-async";

const TrainerDetails = () => {
    const { id } = useParams();
    const day = new Date().getDay();
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const today = days[day];
    const axiosPublic = useAxiosPublic();
    const { data: trainer = [], isLoading } = useQuery({
        queryKey: "trainerDetails",
        queryFn: async () => {
            const res = await axiosPublic.get(`/trainers/${id}`);
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading />;
    }

    console.log(id, trainer);
    const {
        _id,
        age,
        available_time_in_week,
        available_time_slot,
        email,
        experience,
        image,
        name,
        skills,
    } = trainer[0];
    return (
        <section className="container mx-auto px-6">
            <Helmet>
                <title>Modern Gym | Know More</title>
            </Helmet>
            <div className="py-16">
                <h2 className="text-4xl pb-10">About: </h2>

                <div className="grid grid-cols-6 gap-16 justify-between">
                    <div className="col-span-2">
                        <div className="bg-gradient-to-b  from-[#0C1117] to-[#303644] p-3  rounded-3xl md:mb-10 mb-20">
                            <img
                                src={image}
                                alt=""
                                className="object-cover h-full w-full rounded-2xl"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <h2 className="text-7xl pb-10">{name}</h2>
                        <p className="">
                            <span className="text-white/80">Email:</span>{" "}
                            {email}
                        </p>
                        <p className="">
                            <span className="text-white/80">Age:</span> {age}
                        </p>
                        <p className="">
                            <span className="text-white/80">
                                Year of experience:
                            </span>{" "}
                            0{experience}
                        </p>
                        <div className="w-">
                            <p className="pt-6">
                                <p className="text-white/80 mb-2">
                                    Pik up your time slot:
                                </p>{" "}
                                {available_time_slot.map((time, idx) => (
                                    <Link
                                        to={`/trainer/${_id}/${idx}`}
                                        key={idx}
                                        className="py-2 px-3 me-1.5 mb-1.5 block rounded-lg text-xs cursor-pointer bg-[#94f3b0]/10 text-[#a3ffb5]"
                                    >
                                        {time}
                                    </Link>
                                ))}
                            </p>
                        </div>

                        <p className="">
                            <span className="text-white/80">Skills:</span>{" "}
                            {skills.map((time, idx) => (
                                <p
                                    key={idx}
                                    className="py-1.5 px-2.5 me-1.5 mb-1.5 inline-block rounded-lg "
                                >
                                    {time} ,
                                </p>
                            ))}
                        </p>
                    </div>
                    <div className="col-span-2">
                        <h2 className="text-4xl text-white/70 pt-3">
                            Today: <span className="text-white">{today}</span>
                        </h2>
                        <p className="pt-3">
                            <span className="text-white/80">
                                Available Day in a Week:
                            </span>{" "}
                            {available_time_in_week.map((time, idx) => (
                                <p
                                    key={idx}
                                    className="py-1.5 px-1.5  inline-block rounded-lg mb-0"
                                >
                                    {time} ,
                                </p>
                            ))}
                        </p>
                        {!available_time_in_week.includes(today) && (
                            <p className="text-rose-500">
                                Sorry! {name} don&#39;t have any session today
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrainerDetails;
