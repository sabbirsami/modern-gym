import newsLetterImage from "../../assets/person/man0.png";

const Newsletter = () => {
    return (
        <section className="container mx-auto px-6 md:mt-32  pt-16 pb-10">
            <div className=" bg-gradient-to-r  from-[#0C1117] to-[#303644] rounded-2xl p-1">
                <div className="py-6 md:px-28 px-6 rounded-2xl grid lg:grid-cols-7 lg:gap-10 items-center justify-between bg-[#0C1117]">
                    <form className="lg:col-span-4">
                        <h2 className="md:text-5xl text-3xl pb-10">
                            Subscribe Our Newsletter
                        </h2>
                        {/* <label htmlFor="price" className=" mt-6 font-bold text-sm ">
                        Email
                    </label> */}
                        <div className="md:flex md:gap-6 gap-2">
                            <input
                                type="email"
                                className="py-4 px-3 w-full mb-6  mt-2 rounded-md"
                                placeholder="Enter your email here.."
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-[#94f3b0] to-[#7abf88] py-4 px-4 h-14 mt-2  rounded-md"
                            >
                                Subscribe
                            </button>
                        </div>
                    </form>
                    <div className="lg:col-span-3 ms-auto">
                        <img
                            src={newsLetterImage}
                            alt=""
                            className="w-80 pt-6 drop-shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
