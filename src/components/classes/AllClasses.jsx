import { useQuery } from "react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Loading from "../shared/Loading";
import { Link } from "react-router-dom";

const AllClasses = () => {
    const axiosPublic = useAxiosPublic();
    const { data: { result, totalNumberOfDocument } = [], isLoading } =
        useQuery({
            queryKey: "AllClasses",
            queryFn: async () => {
                const res = await axiosPublic.get("/classes-details");
                return res.data;
            },
        });
    if (isLoading) {
        return <Loading />;
    }

    const totalCardInRow = Math.ceil(totalNumberOfDocument / 4);
    const row1 = 0 + totalCardInRow;
    const row2 = row1 + row1;
    const row3 = row2 + row1;
    const row4 = row3 + row1;

    return (
        <div className="pt-16">
            <h2 className="text-8xl pb-16">All Classes.</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="grid gap-6">
                    {result.slice(0, row1).map((classDetail, idx) => (
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
                    {result.slice(row1, row2).map((classDetail, idx) => (
                        <Link
                            to={`/classes-details/${classDetail._id}`}
                            key={idx}
                            className="h-full"
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
                    {result.slice(row2, row3).map((classDetail, idx) => (
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
                    {result.slice(row3, row4).map((classDetail, idx) => (
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
            </div>
        </div>
    );
};

export default AllClasses;
