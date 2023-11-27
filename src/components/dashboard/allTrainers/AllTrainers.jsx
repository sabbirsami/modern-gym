import { useQuery } from "react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../shared/Loading";
import { Link } from "react-router-dom";
import MonthCounter from "./MonthCounter";

const AllTrainers = () => {
    const axiosPublic = useAxiosPublic();
    const { data: trainers = [], isLoading } = useQuery({
        queryKey: "trainer",
        queryFn: async () => {
            const res = await axiosPublic.get("/trainers");
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading />;
    }
    console.log(trainers);
    // month count

    return (
        <div>
            {trainers.map((trainer) => (
                <div
                    key={trainer._id}
                    className="grid grid-cols-6 mt-6 py-4 border border-slate-600 px-6 rounded-md shadow-md"
                >
                    <div className="flex gap-6 items-center">
                        <img
                            className="w-16 h-16 rounded-3xl p-0.5 bg-slate-600 object-cover"
                            src={trainer.image}
                            alt=""
                        />
                    </div>

                    <div className="">
                        <div className="">
                            <p className="text-sm text-white/80 pb-1">Name:</p>
                            <p className="text-xl font-bold">{trainer.name}</p>
                        </div>
                        <div className="">
                            <p className="text-sm text-white/80 pb-1">Email:</p>
                            <p className="text-xs font-bold">{trainer.email}</p>
                        </div>
                    </div>

                    <div className="">
                        <div className="">
                            <p className="text-sm text-white/80 pb-1">
                                Experience:
                            </p>
                            <p className="text-xs font-bold">
                                {trainer.experience} years
                            </p>
                        </div>
                        <div className=" pt-2">
                            <p className="text-sm text-white/80 pb-1">Age:</p>
                            <p className="text-xs font-bold ">
                                {trainer.age} year
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <p className="text-sm text-white/80 pb-1">
                                Joining Date:
                            </p>
                            <p className="text-xs font-bold">
                                {trainer.joiningDate}
                            </p>
                        </div>
                        <div className=" pt-2">
                            <p className="text-sm text-white/80 pb-1">
                                Months since joining:
                            </p>
                            <p className="text-xs font-bold">
                                <MonthCounter
                                    joiningDate={trainer.joiningDate}
                                />{" "}
                                months
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <div className=" pt-2">
                            <p className="text-sm text-white/80 pb-1">
                                Payment Status:
                            </p>
                            <p className="text-xs font-bold text-[#94f3b0]">
                                {trainer.paymentStatus}
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <div className="col-span-1 flex md:flex-col flex-row ">
                            <div className="ms-auto text-end">
                                {trainer.paymentStatus === "pending" && (
                                    <Link
                                        to={`/dashboard/all-trainer/${trainer._id}/payment`}
                                        className="text-xs bg-gradient-to-r from-[#94f3b0] to-[#7abf88] text-black rounded-full px-3.5 py-1.5 font-semibold"
                                    >
                                        Pay
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllTrainers;
