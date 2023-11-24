import { useQuery } from "react-query";

const AllClasses = () => {
    const { data: allClasses = [], isLoading } = useQuery({
        queryKey: "AllClasses",
        queryFn: () =>
            fetch("classDetails.json")
                .then((res) => res.json())
                .catch((err) => {
                    console.log(err);
                }),
    });
    if (isLoading) {
        return <p>Loading...</p>;
    }
    console.log(allClasses);
    return (
        <div className="pt-16">
            <h2 className="text-8xl pb-16">All Classes.</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="grid gap-6">
                    {allClasses.slice(0, 8).map((classDetail, idx) => (
                        <div
                            key={idx}
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
                    ))}
                </div>
                <div className="grid gap-6">
                    {allClasses.slice(8, 16).map((classDetail, idx) => (
                        <div
                            key={idx}
                            className="bg-[#303644] bg-gradient-to-r hover:from-[#94f3b0] hover:to-[#7abf88] hover:text-black p-10 rounded-lg"
                        >
                            <h2 className="text-4xl pb-3">
                                {classDetail.name}
                            </h2>
                            <p className="text-">
                                {classDetail.short_description}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="grid gap-6">
                    {allClasses.slice(16, 24).map((classDetail, idx) => (
                        <div
                            key={idx}
                            className="bg-[#303644] bg-gradient-to-r hover:from-[#94f3b0] hover:to-[#7abf88] hover:text-black p-10 rounded-lg"
                        >
                            <h2 className="text-4xl pb-3">
                                {classDetail.name}
                            </h2>
                            <p className="text-">
                                {classDetail.short_description}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="grid md:hidden xl:grid gap-6">
                    {allClasses.slice(24, 32).map((classDetail, idx) => (
                        <div
                            key={idx}
                            className="bg-[#303644] bg-gradient-to-r hover:from-[#94f3b0] hover:to-[#7abf88] hover:text-black p-10 rounded-lg"
                        >
                            <h2 className="text-4xl pb-3">
                                {classDetail.name}
                            </h2>
                            <p className="text-">
                                {classDetail.short_description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllClasses;
