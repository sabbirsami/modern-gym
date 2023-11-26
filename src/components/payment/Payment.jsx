import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loading from "../shared/Loading";
import { BsCheckCircleFill } from "react-icons/bs";

const Payment = () => {
    const { packageId, trainerId, slotId } = useParams();
    const selectedSlot = parseFloat(slotId);
    console.log(packageId);
    const axiosPublic = useAxiosPublic();
    const { data: packageDetails = [], isLoading } = useQuery({
        queryKey: "packageDetails",
        queryFn: async () => {
            const res = await axiosPublic.get(`/gym-packages/${packageId}`);
            return res.data;
        },
    });
    const { data: trainer = [], isLoading: trainerLoading } = useQuery({
        queryKey: "trainerDetails",
        queryFn: async () => {
            const res = await axiosPublic.get(`/trainers/${trainerId}`);
            return res.data;
        },
    });

    if (isLoading || trainerLoading) {
        return <Loading />;
    }
    return (
        <section className="container mx-auto px-6 py-16">
            <h2 className="text-7xl font-semibold">Payment</h2>
            <div className="grid xl:grid-cols-2 lg:grid-cols-2  justify-center items-start gap-16 py-16 ">
                <div className="">
                    <h2 className="pb-6 text-2xl">Package you join:</h2>
                    {packageDetails.map((packageItem) => (
                        <div
                            key={packageItem._id}
                            className="border p-10 rounded-xl"
                        >
                            <h2 className="text-3xl font-semibold">
                                {packageItem.name}
                            </h2>

                            <p className="text-6xl font-semibold py-6">
                                ${packageItem.cost}{" "}
                                <span className="text-base font-normal">
                                    / par month
                                </span>
                            </p>
                            <div className="">
                                {packageItem.features.map((feature, idx) => (
                                    <div key={idx} className="">
                                        <div className="grid grid-cols-12">
                                            <div className="col-span-1">
                                                <BsCheckCircleFill className="inline me-1 " />
                                            </div>
                                            <div className="col-span-11">
                                                <p className="ps-6 pb-2">
                                                    {feature}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="mt-6">
                        <h2 className="pb-6 text-2xl">Your trainer:</h2>
                        {trainer.map((t) => (
                            <div key={t._id} className="border p-10 rounded-xl">
                                <h2 className="text-3xl font-semibold">
                                    {t.name}
                                </h2>

                                <h2 className="text-7xl pb-10">{t.name}</h2>
                                <p className="">
                                    <span className="text-white/80">
                                        Email:
                                    </span>{" "}
                                    {t.email}
                                </p>
                                <p className="">
                                    <span className="text-white/80">Age:</span>{" "}
                                    {t.age}
                                </p>
                                <p className="">
                                    <span className="text-white/80">
                                        Year of experience:
                                    </span>{" "}
                                    0{t.experience}
                                </p>
                                <p className="">
                                    <span className="text-white/80">
                                        Your selected time slot:
                                    </span>{" "}
                                    <span className="py-2 px-3 me-1.5 mb-1.5  rounded-lg text-xs bg-[#94f3b0]/10 text-[#a3ffb5]">
                                        {t.available_time_slot[selectedSlot]}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Payment;
