import plusIcon from "../../assets/icon/plus.png";
import heroImage from "../../assets/heroImage.png";
import shapeImage from "../../assets/icon/shape01.png";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
const Hero = () => {
    return (
        <section className="relative overflow-hidden">
            <img
                src={shapeImage}
                alt=""
                className="absolute bottom-0 -left-32 -z-10"
            />
            <div className="container mx-auto px-6">
                <div className="h-[88vh] flex items-center">
                    <div className="grid lg:grid-cols-2 justify-between items-center">
                        <div className="relative">
                            <div className="2xl:text-9xl xl:text-8xl md:text-7xl text-5xl">
                                <h2 className="flex gap-6">
                                    Muscles{" "}
                                    <img
                                        className="w-14 h-14"
                                        src={plusIcon}
                                        alt=""
                                    />
                                </h2>

                                <h2 className=""> and Mindset</h2>
                            </div>
                            <p className="py-6 md:w-5/6 text-white/80 md:text-base text-sm">
                                Unleash your best self at our modern gym. From
                                top-notch equipment to expert guidance,
                                we&#39;ve got your fitness journey covered. Join
                                us for a transformative experience and achieve
                                your wellness goals. Your path to a healthier
                                you starts here!
                            </p>
                            <div className="lg:mt-6 mb-4">
                                <Link
                                    to={"/classes"}
                                    className=" py-4 px-8 rounded-full bg-slate-700 "
                                >
                                    Show Classes{" "}
                                    <MdArrowForwardIos className="inline" />
                                </Link>
                            </div>
                        </div>
                        <div className="absolute -right-20 hidden lg:block">
                            <img
                                className="2xl:h-[36rem] xl:h-[30rem] lg:h-[24rem]"
                                src={heroImage}
                                alt=""
                            />
                        </div>
                        <div className="text-center ms-auto lg:hidden mt-6">
                            <img
                                className="2xl:h-[32rem] xl:h-[30rem] lg:h-[24rem] md:h-[18rem] h-[12rem]"
                                src={heroImage}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
