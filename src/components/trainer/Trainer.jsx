import PropTypes from "prop-types";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsBoxArrowUpRight } from "react-icons/bs";

const Trainer = ({ trainer }) => {
    return (
        <div className="pb-6 relative">
            <div className="bg-gradient-to-b  from-[#0C1117] to-[#303644] p-3  rounded-3xl ">
                <img
                    src={trainer.image}
                    alt=""
                    className="object-cover h-full w-full rounded-2xl"
                />
            </div>
            <div className="flex gap-2 justify-center items-center py-1 px-1.5 rounded-full absolute right-10 top-10 bg-[#0C1117] ">
                <FaFacebook className="text-[27px]" />
                <AiFillTwitterCircle className="text-3xl" />
            </div>
            <div className="flex justify-between items-center ">
                <h2 className="xl:text-4xl lg:text-3xl text-xl pt-6 bg-gradient-to-r from-[#94f3b0]  to-[#7abf88] text-transparent bg-clip-text">
                    {trainer.name}
                </h2>
            </div>
            <div className="flex md:flex-row flex-col justify-between items-center">
                <p className="">Years of Experience: 0{trainer.experience}</p>
                <Link className="" to={`/trainer/${trainer}`}>
                    <span className="underline "> Show details </span>
                    <BsBoxArrowUpRight className="inline mb-1 ms-2" />
                </Link>
            </div>
            <div className="pt-6">
                <span className="pe-2">Available time: </span>
                {trainer.available_time_slot.map((time, idx) => (
                    <p
                        key={idx}
                        className="py-1.5 px-2.5 me-1.5 mb-1.5 inline-block rounded-lg text-xs bg-[#94f3b0]/10 text-[#a3ffb5]"
                    >
                        {time}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Trainer;

Trainer.propTypes = {
    trainer: PropTypes.object,
};
