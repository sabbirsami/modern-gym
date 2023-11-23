import partan from "../../assets/partan/partan.png";
import shape1 from "../../assets/icon/plus2.png";
import shape2 from "../../assets/icon/shape02.png";
import man from "../../assets/person/man4.png";
import logo from "../../assets/logo2.png";
const About = () => {
    return (
        <section className="overflow-x-clip">
            <div className="pb-16 pt-10">
                <div className="mx-auto text-center flex justify-center  md:pb-20 pb-10 ">
                    <img className="md:w-auto w-40" src={logo} alt="" />
                </div>
                <div className="flex justify-center xl:gap-16 lg:gap-6 md:gap-3 relative">
                    <div className="xl:py-10 lg:py-6 md:border-2 lg:px-32 md:px-20 rounded-[3rem] bg-[#303644] xl:-ms-10 lg:-ms-36 md:-ms-24 flex items-center justify-center ">
                        <div className="md:block hidden">
                            <img
                                className="w-[20rem] ms-auto "
                                src={shape1}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="py-10 border-2 lg:px-48 md:px-32 rounded-[3rem] bg-[#303644] ">
                        <img
                            className="w-[30rem] ms-auto "
                            src={shape2}
                            alt=""
                        />
                    </div>
                    <img
                        src={man}
                        className="absolute bottom-0  2xl:left-2/4 xl:right-4 lg:-right-[70px] md:-right-[14px] left-40 transform -translate-x-1/2  2xl:h-[40rem] xl:h-[30rem] lg:h-auto md:h-[18rem] w-auto"
                        alt=""
                    />
                    <div className="xl:py-10 md:py-6 w-[40rem] border-2 md:ps-6 rounded-[3rem] bg-[#303644] -me-10 md:block hidden">
                        <img
                            src={partan}
                            className="w-[40rem] h-full object-cover rounded-3xl ms-auto "
                            alt=""
                        />
                    </div>
                </div>
                <div className="py-10 px-6">
                    <div className="2xl:text-9xl xl:text-8xl md:text-7xl text-4xl text-center font-bold">
                        <h2 className="">About Modern Gym.</h2>
                    </div>
                    <p className="xl:w-7/12 lg:w-10/12 md:w-11/12 mx-auto md:text-base text-sm text-center pt-6">
                        Whether you&#39;re a seasoned athlete or just starting
                        your fitness journey, our dedicated team is committed to
                        helping you achieve your health and wellness goals.
                        Explore a diverse range of classes, personalized
                        training sessions, and modern facilities designed to
                        elevate your workout. Join our vibrant community,
                        embrace a healthier lifestyle, and unlock the best
                        version of yourself at our fitness sanctuary.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
