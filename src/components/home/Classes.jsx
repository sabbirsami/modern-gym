import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import Loading from "../shared/Loading";
import shape from "../../assets/icon/shape03.png";

const Classes = ({ recommended }) => {
    const axiosPublic = useAxiosPublic();
    const { data: { result } = [], isLoading } = useQuery({
        queryKey: "someClass",
        queryFn: async () => {
            const res = await axiosPublic.get("/classes-details");
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading />;
    }

    return (
        <section className=" overflow-hidden relative">
            <img className="absolute -right-36 -z-10" src={shape} alt="" />
            <div className="pt-10 pb-32 container mx-auto px-6">
                <h2 className="text-7xl pb-16">
                    {recommended ? "Recommended Class" : "Some Classes."}
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div className="grid gap-6">
                        {result?.slice(0, 3).map((classDetail, idx) => (
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
                        {result?.slice(3, 6).map((classDetail, idx) => (
                            <Link
                                to={`/classes-details/${classDetail._id}`}
                                key={idx}
                                className="h-full"
                            >
                                <div
                                    className="bg-[#303644]  h-full bg-gradient-to-r hover:from-[#94f3b0] hover:to-[#7abf88] hover:text-black p-10 rounded-lg
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
                        {result?.slice(6, 9).map((classDetail, idx) => (
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
                        {result?.slice(9, 12).map((classDetail, idx) => (
                            <Link
                                to={`/classes-details/${classDetail._id}`}
                                key={idx}
                            >
                                <div
                                    className="bg-[#303644]  h-full bg-gradient-to-r hover:from-[#94f3b0] hover:to-[#7abf88] hover:text-black p-10 rounded-lg
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
        </section>
    );
};

export default Classes;

Classes.propTypes = {
    recommended: PropTypes.object,
};
