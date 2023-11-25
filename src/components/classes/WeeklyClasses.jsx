import { useQuery } from "react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loading from "../shared/Loading";

const WeeklyClasses = () => {
    const axiosPublic = useAxiosPublic();
    const { data: weeklyClasses = [], isLoading } = useQuery({
        queryKey: "weeklyClasses",
        queryFn: async () => {
            const res = await axiosPublic.get("/weekly-classes");
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading></Loading>;
    }
    console.log(weeklyClasses);

    return (
        <div>
            <h2 className="text-8xl pb-16">Weekly Schedule</h2>
            <div className="border-x border-t grid grid-cols-6">
                <div className="col-span-1 py-10 px-6">
                    <h5 className="">Day</h5>
                </div>
                <div className="col-span-5 border-s ">
                    <div className="grid grid-cols-5">
                        <h5 className="border-e py-10 px-6">6:00am - 8:00am</h5>
                        <h5 className="border-e py-10 px-6">8:00am - 9:00am</h5>
                        <h5 className="border-e py-10 px-6">7:00pm - 8:00pm</h5>
                        <h5 className="border-e py-10 px-6">8:00pm - 9:00pm</h5>
                        <h5 className=" py-10 px-6">9:00pm - 10:00pm</h5>
                    </div>
                </div>
            </div>
            <div className="border grid grid-cols-6">
                <div className="col-span-1">
                    {weeklyClasses.map((weeklyClass, idx) => (
                        <div
                            key={idx}
                            className=" xl:py-10 lg:py-[3.3rem] border-b px-6"
                        >
                            {weeklyClass.day}
                        </div>
                    ))}
                </div>
                <div className="col-span-5 border-s">
                    {weeklyClasses.map((weeklyClass, idx) => (
                        <div key={idx} className="">
                            <div className=" grid grid-cols-5">
                                {weeklyClass.classes.map((c, idx) => (
                                    <div
                                        className="py-4 px-6 border-s border-b"
                                        key={idx}
                                    >
                                        <p className="">{c.class}</p>
                                        {c.class === "-" ? (
                                            ""
                                        ) : (
                                            <div className="flex -space-x-4 rtl:space-x-reverse pt-2">
                                                <img
                                                    className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                                    src="https://i.ibb.co/JCC8Fvv/trainer05.jpg"
                                                    alt=""
                                                />
                                                <img
                                                    className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                                    src="https://i.ibb.co/bRbnb93/trainer4.png"
                                                    alt=""
                                                />
                                                <img
                                                    className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                                    src="https://i.ibb.co/Zxjt7SC/trainer02.png"
                                                    alt=""
                                                />
                                                <a
                                                    className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                                                    href="#"
                                                >
                                                    {c.totalJoinPeople - 1}+
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeeklyClasses;
