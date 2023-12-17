import Marquee from "react-fast-marquee";

const HighlightMarquee = () => {
    return (
        <Marquee
            speed={150}
            className="uppercase bg-gradient-to-r  from-[#94f3b0] to-[#7abf88] py-6  font-semibold bg-clip-text text-[#94f3b0] overflow-hidden text-9xl"
        >
            <div className="flex gap-10">
                <h4 className="">Transform</h4>
                <h4 className="">Your</h4>
                <h4 className="">body</h4>
                <h4 className="">Transform</h4>
                <h4 className="">your</h4>
                <h4 className="">Life.</h4>
                <h4 className="">Transform</h4>
                <h4 className="">Your</h4>
                <h4 className="">body</h4>
                <h4 className="">Transform</h4>
                <h4 className="">your</h4>
                <h4 className="">Life.</h4>
            </div>
        </Marquee>
    );
};

export default HighlightMarquee;
