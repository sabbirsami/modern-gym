import logo from "../../assets/logo.png";
import noPain from "../../assets/footer.jpg";
import copyrightImg from "../../assets/copyright.png";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="border-t-2 mt-10 overflow-hidden relative">
            <img
                src={copyrightImg}
                className="w-60 absolute rotate-12 -me-20 -bottom-16 right-0 opacity-60 -z-10 "
                alt=""
            />
            <div className="container mx-auto md:pt-16 md:px-6 px-2 mt-10">
                <div className=" mx-auto flex flex-col gap-3 items-center justify-center pb-6">
                    <img className="w-16" src={logo} alt="" />
                    <h5 className="md:text-6xl text-4xl font-bold">
                        Modern Gym.
                    </h5>
                </div>
                <div className="grid md:grid-cols-3 grid-cols-1 md:justify-between justify-center md:items-start items-center md:text-left text-start space-y-8">
                    <div className="mt-6 mb-0">
                        <p className="text-xl">
                            Copyright © 2023 - All right reserved
                        </p>
                        <h4 className="pb-6 pt-6">Contact</h4>
                        <p className="text-base font-semibold text-[#a4a4a4] ">
                            Phone Number:
                            <span className="text-white"> +8801970706676</span>
                        </p>
                        <p className="text-base font-semibold text-[#a4a4a4]  ">
                            <span className="">Email: </span>
                            <span className="text-white">
                                smd71430@gmail.com
                            </span>{" "}
                        </p>
                        <p className="text-base font-semibold text-[#a4a4a4]  ">
                            <span className="">Location: </span>
                            <span className="text-white">
                                Dhaka, Bangladesh
                            </span>{" "}
                        </p>
                    </div>

                    <div className=" md:order-2 order-3">
                        <div className="flex gap-3 items-center justify-center text-center">
                            <div className="">
                                <div className=" mx-auto flex flex-col items-center justify-center">
                                    <img className="w-40" src={noPain} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:order-3 order-2">
                        <div className="flex items-center md:justify-end justify-start gap-3">
                            <a
                                rel="noreferrer"
                                target="_blank"
                                href={"https://github.com/sabbirsami"}
                                className="rounded-0 border border-[#4a4a4a] hover:border-primaryColor hover:bg-primaryColor hover:text-white  text-lg border-1 p-3  flex justify-center items-center"
                            >
                                <FaGithub className="inline text-2xl font-semibold m-0.5" />
                            </a>
                            <a
                                rel="noreferrer"
                                target="_blank"
                                href={
                                    "https://www.linkedin.com/in/sabbir-mohammad-sami/"
                                }
                                className="rounded-0 border border-[#4a4a4a]  hover:bg-primaryColor hover:border-primaryColor hover:text-white  text-lg border-1 p-3  flex justify-center items-start"
                            >
                                <FaLinkedinIn className="inline text-2xl font-semibold" />{" "}
                                <span className="ms-2 font-semibold mb-0">
                                    Linkedin
                                </span>
                            </a>
                        </div>
                        <div className="ms-auto pt-3">
                            <a
                                rel="noreferrer"
                                target="_blank"
                                href={"https://sabbir-mohammad-sami.web.app/"}
                                className="rounded-0 border border-dashed border-[#4a4a4a]  hover:bg-primaryColor hover:border-primaryColor hover:text-white  text-lg border-1 p-3  flex justify-center items-start"
                            >
                                <span className="ms-.5 pe-1 font-semibold mb-0">
                                    Developer portfolio
                                </span>
                                {/* <BsBoxArrowUpRight className="inline text-2xl font-semibold hover:block" />{" "} */}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
