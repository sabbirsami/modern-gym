import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import Loading from "../shared/Loading";
import { Helmet } from "react-helmet-async";

const ClassDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { data: classDetails = [], isLoading } = useQuery({
        queryKey: "classDetails",
        queryFn: async () => {
            const res = await axiosPublic.get(`/classes-details/${id}`);
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading />;
    }

    console.log(classDetails);
    const {
        name,
        short_description,
        benefits,
        duration,
        capacity,
        equipmentNeeded,
        targetAudience,
        prerequisites,
        intensityLevel,
        cost,
        trainerId,
    } = classDetails[0];
    return (
        <section className="container mx-auto px-6">
            <Helmet>
                <title>Modern Gym | Classes Details</title>
            </Helmet>
            <div className="py-16">
                <h2 className="text-7xl pb-10">{name} </h2>
                <p className="">{short_description}</p>
                <p className="pt-1">
                    <span className="text-white/80">Duration:</span> 0{duration}{" "}
                    hours
                </p>
                <p className="pt-1">
                    <span className="text-white/80">IntensityLevel:</span>{" "}
                    {intensityLevel}
                </p>

                <p className="pt-1">
                    <span className="text-white/80">
                        Available Time in Week:
                    </span>{" "}
                    {benefits.map((time, idx) => (
                        <p
                            key={idx}
                            className="py-1.5 px-2.5 me-1.5 mb-1.5 inline-block rounded-lg text-xs bg-[#94f3b0]/10 text-[#a3ffb5]"
                        >
                            {time}
                        </p>
                    ))}
                </p>
                <p className="pt-1">
                    <span className="text-white/80">Capacity:</span> {capacity}
                </p>
                <p className="pt-1">
                    <span className="text-white/80">Prerequisites:</span>{" "}
                    {prerequisites}
                </p>
                <p className="pt-1">
                    <span className="text-white/80">Target Audience:</span>{" "}
                    {targetAudience}
                </p>
                <p className="pt-1">
                    <span className="text-white/80">EquipmentNeeded:</span>{" "}
                    {equipmentNeeded.map((time, idx) => (
                        <p
                            key={idx}
                            className="py-1.5 px-2.5 me-1.5 mb-1.5 inline-block rounded-lg text-xs bg-[#94f3b0]/10 text-[#a3ffb5]"
                        >
                            {time}
                        </p>
                    ))}
                </p>
                <p className="pt-1">
                    <span className="text-white/80">Cost:</span> ${cost} per
                    class
                </p>
                <div className="mx-auto text-start mt-16">
                    <Link
                        state={{ clickedClass: id }}
                        to={`/trainer/${trainerId}`}
                        className="px-6 py-4 bg-gradient-to-r from-[#94f3b0]  to-[#7abf88] text-black rounded-full font-semibold cursor-pointer"
                    >
                        Join Now
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ClassDetails;
