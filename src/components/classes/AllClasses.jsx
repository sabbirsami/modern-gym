import { useQuery } from "react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loading from "../shared/Loading";
import { Link } from "react-router-dom";

const AllClasses = () => {
    const axiosPublic = useAxiosPublic();
    const { data: allClasses = [], isLoading } = useQuery({
        queryKey: "AllClasses",
        queryFn: async () => {
            const res = await axiosPublic.get("/classes-details");
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="pt-16">
            <h2 className="text-8xl pb-16">All Classes.</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="grid gap-6">
                    {allClasses.slice(0, 8).map((classDetail, idx) => (
                        <Link
                            to={`/classes-details/${classDetail._id}`}
                            key={idx}
                        >
                            <div
                                className="bg-[#303644] h-full bg-gradient-to-r hover:from-[#94f3b0] hover:to-[#7abf88] hover:text-black p-10 rounded-lg
                            "
                            >
                                <h2 className="text-4xl pb-3">
                                    {classDetail.name}
                                </h2>
                                <p className="text-">
                                    {classDetail.short_description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="grid gap-6">
                    {allClasses.slice(8, 16).map((classDetail, idx) => (
                        <Link
                            to={`/classes-details/${classDetail._id}`}
                            key={idx}
                            className="h-full"
                        >
                            <div
                                className="bg-[#303644] bg-gradient-to-r hover:from-[#94f3b0] hover:to-[#7abf88] hover:text-black p-10 rounded-lg
                            "
                            >
                                <h2 className="text-4xl pb-3">
                                    {classDetail.name}
                                </h2>
                                <p className="text-">
                                    {classDetail.short_description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="grid gap-6">
                    {allClasses.slice(16, 24).map((classDetail, idx) => (
                        <Link
                            to={`/classes-details/${classDetail._id}`}
                            className="h-full"
                            key={idx}
                        >
                            <div
                                className="bg-[#303644] h-full bg-gradient-to-r hover:from-[#94f3b0] hover:to-[#7abf88] hover:text-black p-10 rounded-lg
                            "
                            >
                                <h2 className="text-4xl pb-3">
                                    {classDetail.name}
                                </h2>
                                <p className="text-">
                                    {classDetail.short_description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="grid md:hidden xl:grid gap-6">
                    {allClasses.slice(24, 32).map((classDetail, idx) => (
                        <Link
                            to={`/classes-details/${classDetail._id}`}
                            key={idx}
                        >
                            <div
                                className="bg-[#303644] bg-gradient-to-r hover:from-[#94f3b0] hover:to-[#7abf88] hover:text-black p-10 rounded-lg
                            "
                            >
                                <h2 className="text-4xl pb-3">
                                    {classDetail.name}
                                </h2>
                                <p className="text-">
                                    {classDetail.short_description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllClasses;
