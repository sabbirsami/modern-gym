import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "react-query";
import Loading from "../../shared/Loading";
import { Elements } from "@stripe/react-stripe-js";
import TrainerCheckoutForm from "./TrainerCheckoutForm";
import { useParams } from "react-router-dom";

const TrainerPayment = () => {
    const { trainerId } = useParams();
    // const day = new Date().getDay();
    // const days = [
    //     "Sunday",
    //     "Monday",
    //     "Tuesday",
    //     "Wednesday",
    //     "Thursday",
    //     "Friday",
    //     "Saturday",
    // ];
    // const today = days[day];

    // payment stripe
    const stripePromise = loadStripe(
        "pk_test_51L2vNMJH0mXagrhOdzLEhBYwbNjUZQy6o9TQRQP00TOEqz5YJutO7I2OjEflJDptHPmz9U3iLzgX9sBRtIlYTIB900kUiVeM24"
    );
    const axiosPublic = useAxiosPublic();
    const { data: trainer = [], isLoading } = useQuery({
        queryKey: ["trainerDetails", trainerId],
        queryFn: async () => {
            const res = await axiosPublic.get(`/trainers/${trainerId}`);
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading />;
    }

    console.log(trainerId, trainer);
    const {
        _id,
        age,
        available_time_in_week,
        available_time_slot,
        email,
        experience,
        joiningDate,
        name,
        skills,
    } = trainer[0];
    const paymentInfo = { _id };

    return (
        <section className="">
            <Helmet>
                <title>Modern Gym | Trainer Payment</title>
            </Helmet>
            <h2 className="text-2xl font-semibold">Payment</h2>
            <div className="grid xl:grid-cols-2 lg:grid-cols-2  justify-center items-start gap-16 pb-16  pt-6">
                <div className="">
                    <div className=" mb-6">
                        <div className="border-2 p-10 rounded-xl mb-6">
                            <h2 className="text-7xl ">{name}</h2>
                            <div className="">
                                <span className="text-white/80">
                                    Joining Date:
                                </span>{" "}
                                {joiningDate}
                            </div>
                            <div className="pt-4">
                                <span className="text-white/80">
                                    Monthly fee:
                                </span>{" "}
                                $50
                            </div>
                        </div>

                        <div className="border-2 p-10 rounded-xl">
                            <p className="">
                                <span className="text-white/80">Email:</span>{" "}
                                {email}
                            </p>
                            <p className="">
                                <span className="text-white/80">Age:</span>{" "}
                                {age}
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
                                        <span
                                            key={idx}
                                            className="py-2 px-3 me-1.5 mb-1.5 block rounded-lg text-xs cursor-pointer bg-[#94f3b0]/10 text-[#a3ffb5]"
                                        >
                                            {time}
                                        </span>
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
                            <p className="">
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
                        </div>
                    </div>
                </div>
                <Elements stripe={stripePromise}>
                    <TrainerCheckoutForm paymentInfo={paymentInfo} />
                </Elements>
            </div>
        </section>
    );
};

export default TrainerPayment;
