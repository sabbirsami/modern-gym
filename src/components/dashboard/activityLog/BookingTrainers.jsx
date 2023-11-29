import PropTypes from "prop-types";
import { useQuery } from "react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../shared/Loading";

const BookingTrainers = ({ slot }) => {
    const { trainerEmail } = slot;

    const axiosPublic = useAxiosPublic();
    const { data: trainerData = [], isLoading: isTrainerLoading } = useQuery({
        queryKey: ["trainerData", trainerEmail],
        queryFn: async () => {
            const res = await axiosPublic.get(
                `/trainers/find-by-email/${trainerEmail}`
            );
            return res.data;
        },
    });
    if (isTrainerLoading) {
        return <Loading />;
    }
    console.log(trainerData);
    return (
        <div className="bg-[#505ca6]/10 rounded-2xl">
            {trainerData.map((trainer, idx) => (
                <div key={idx} className="">
                    <div className="col-span-2">
                        <div className=" grid grid-cols-2 p-3  gap-3 md:mb-10 mb-20">
                            <div className="">
                                <img
                                    src={trainer.image}
                                    alt=""
                                    className="object-cover h-60 w-60 rounded-2xl"
                                />
                                <h2 className="text-3xl pb-6 pt-3">
                                    {trainer.name}
                                </h2>
                                <p className="">
                                    <span className="text-white/80 text-sm ">
                                        Email:
                                    </span>{" "}
                                    <span className="text-xs">
                                        {trainer.email}
                                    </span>
                                </p>

                                <p className="mt-1">
                                    <span className="text-white/80 text-sm">
                                        Skills:
                                    </span>{" "}
                                    {trainer.skills.map((time, idx) => (
                                        <p
                                            key={idx}
                                            className="py-2 px-3 me-1.5 mb-1.5 block rounded-lg text-xs cursor-pointer bg-[#94f3b0]/10 text-[#a3ffb5]"
                                        >
                                            {time} ,
                                        </p>
                                    ))}
                                </p>
                            </div>
                            <div className="">
                                <p className="">
                                    <span className="text-white/80 text-sm">
                                        Age:
                                    </span>{" "}
                                    {trainer.age}
                                </p>
                                <p className="pt-2">
                                    <span className="text-white/80 text-sm">
                                        Year of experience:
                                    </span>{" "}
                                    0{trainer.experience}
                                </p>
                                <div className="w-">
                                    <p className="pt-6">
                                        <p className="text-white/80 text-sm mb-2">
                                            Available time slot:
                                        </p>{" "}
                                        {trainer.available_time_slot.map(
                                            (time, idx) => (
                                                <span
                                                    key={idx}
                                                    className="py-2 px-3 me-1.5 mb-1.5 block rounded-lg text-xs cursor-pointer bg-[#94f3b0]/10 text-[#a3ffb5]"
                                                >
                                                    {time}
                                                </span>
                                            )
                                        )}
                                    </p>
                                </div>

                                <p className="pt-3">
                                    <span className="text-white/80 text-sm">
                                        Available Day in a Week:
                                    </span>{" "}
                                    {trainer.available_time_in_week.map(
                                        (time, idx) => (
                                            <p
                                                key={idx}
                                                className="py-2 px-3 me-1.5 mb-1.5 block rounded-lg text-xs cursor-pointer bg-[#94f3b0]/10 text-[#a3ffb5]"
                                            >
                                                {time} ,
                                            </p>
                                        )
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookingTrainers;

BookingTrainers.propTypes = {
    slot: PropTypes.object,
};
