import { useState } from "react";
import dumble from "../../assets/dumble.png";
import arrow from "../../assets/icon/arrow.png";

const Features = () => {
    const features = [
        {
            title: "Motivation and Accountability",
            des: "Whether you sign up for the gym to lose a little weight, gain muscle, or just move more, you’re looking for external motivation. It’s hard to stay motivated and hold yourself accountable. ",
        },
        {
            title: "Community and Socializing",
            des: "With social distancing and stay-at-home orders, many people are feeling more isolated and lonelier. Mental health is a huge topic right now and creating an environment that nurtures human connection ",
        },
        {
            title: "Digital Fitness Platform",
            des: "The COVID-19 crisis has accelerated digital fitness and the adoption of home fitness as an effective and convenient way to exercise. The fitness industry is hugely competitive. ",
        },

        {
            title: "Equipment and Space",
            des: "Your equipment, layout, and space design will play a big part in why members choose your specific gym. Creating an environment that motivates you to work out and providing the equipment to do so",
        },
        // {
        //     title: "Training Ability",
        //     des: "Human social connection is essential for health and happiness. Health clubs are an ideal place to satisfy both physical and social needs. Even though technology allows you to communicate with you",
        // },
        // {
        //     title: "Variety of Training",
        //     des: "In terms of fitness and training, everyone is unique. Some people need one on one personal training programs, while others just want to show up for a fitness class. Group training options may be ideal for some and not others.",
        // },
        {
            title: "High-Quality Equipment ",
            des: "All gym equipment should be clean, well-maintained, and in good working order. By creating a highly connected fitness experience and leveraging wearables and heart rate monitors you can simplify fitness.",
        },
        {
            title: "Stay Clean and Hygienic",
            des: "Cleanliness and hygiene have always been important factors when it comes to investing in a gym membership or visiting a fitness facility. But now, cleanliness is a major consumer priority. ",
        },
    ];
    const [seeMore, setSeeMore] = useState(160);
    return (
        <section className="container mx-auto px-6">
            <div className="pb-16 pt-10">
                <div className="md:text-7xl text-5xl flex justify-between">
                    <h2 className="">Features</h2>{" "}
                    <img
                        className=" md:w-20 md:h-auto h-10 -rotate-90"
                        src={arrow}
                        alt=""
                    />
                </div>
                <div className="py-10">
                    <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-6">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="p-10 bg-[#303644] rounded-md"
                            >
                                <div className="border-s-2 border-[#94f3b0]/80 border-dashed  ms-0.5  ps-6 h-full">
                                    <div className="md:h-16">
                                        <h4 className="text-3xl">
                                            {feature.title}
                                        </h4>
                                    </div>
                                    <div className="relative">
                                        <p className="pt-6 text-white/80 md:text-base text-sm">
                                            {feature.des.slice(0, seeMore)}{" "}
                                            {feature.des.length === seeMore ? (
                                                ""
                                            ) : (
                                                <span
                                                    onClick={() =>
                                                        setSeeMore(
                                                            feature.des.length
                                                        )
                                                    }
                                                    className="text-sm text-[#94f3b0]/80 cursor-pointer"
                                                >
                                                    see more..
                                                </span>
                                            )}
                                        </p>
                                        <img
                                            className="absolute top-0 -left-10 w-6 rotate-45 drop-shadow-2xl bg-gradient-to-r  from-[#94f3b0] to-[#7abf88] rounded-full p-0.5"
                                            src={dumble}
                                            alt=""
                                        />
                                        {/* <div className="w-4 h-4 bg-gradient-to-r  from-[#da8846] to-[#cd513e] rounded-full absolute top-0 -left-8"></div> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
