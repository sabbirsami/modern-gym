import { useQuery } from "react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../shared/Loading";

const ManageNewsletter = () => {
    const axiosPublic = useAxiosPublic();
    const {
        data: newsletters = [],
        isLoading,
        // refetch,
    } = useQuery({
        queryKey: "newsletters",
        queryFn: async () => {
            const res = await axiosPublic.get(`/newsletters`);
            console.log(res.data);
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading></Loading>;
    }
    console.log(newsletters);
    return (
        <section className="">
            <div className=" ">
                {newsletters.map((newsletter) => (
                    <div
                        key={newsletter._id}
                        className="grid grid-cols-3 mt-6 py-4 border px-6 rounded-md shadow-md"
                    >
                        <h4 className="lg:text-xl md:text-lg font-bold pe-2">
                            {newsletter.name}
                        </h4>
                        <div className="">
                            <p className="text-sm text-whiteSecondary pb-1">
                                Email:
                            </p>
                            <p className="text-xs font-bold">
                                {newsletter.email}
                            </p>
                        </div>
                        <div className="">
                            <div className="col-span-1 flex md:flex-col flex-row ">
                                <div className="ms-auto text-end">
                                    <button className="text-xs bg-gradient-to-r from-[#94f3b0] to-[#7abf88] text-black rounded-full px-3.5 py-1.5 font-semibold">
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ManageNewsletter;
