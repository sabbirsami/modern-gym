import PropTypes from "prop-types";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import Loading from "../../shared/Loading";
import { BsCheckCircleFill } from "react-icons/bs";

const BookingPackage = ({ slot }) => {
    const { packageId } = slot;

    const axiosPublic = useAxiosPublic();

    const { data: packageDetails = [], isLoading } = useQuery({
        queryKey: ["packageDetails", packageId],
        queryFn: async () => {
            const res = await axiosPublic.get(`/gym-packages/${packageId}`);
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading />;
    }
    console.log(packageDetails);

    return (
        <div>
            <div className="p-10 rounded-lg bg-[#505ca6]/10">
                {packageDetails.map((packageItem, idx) => (
                    <div key={idx} className="">
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
            </div>
        </div>
    );
};

export default BookingPackage;

BookingPackage.propTypes = {
    slot: PropTypes.object,
};
