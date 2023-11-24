import Marquee from "react-fast-marquee";

const HighlightMarquee = () => {
    return (
        <Marquee className="uppercase bg-gradient-to-r  from-[#94f3b0] to-[#7abf88] py-6 text-black font-semibold overflow-hidden">
            <div className="flex gap-40">
                <h4 className="">Transform</h4>
                <h4 className="">Your</h4>
                <h4 className="">body</h4>
                <h4 className="">Transform</h4>
                <h4 className="">your</h4>
                <h4 className="">Life</h4>
                <h4 className="">Transform</h4>
                <h4 className="">Your</h4>
                <h4 className="">body</h4>
                <h4 className="">Transform</h4>
                <h4 className="">your</h4>
                <h4 className="">Life</h4>
            </div>
        </Marquee>
    );
};

export default HighlightMarquee;
