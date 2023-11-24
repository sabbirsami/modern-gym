import { Link } from "react-router-dom";
import errorImage from "../../assets/errorImage.png";
import { IoReturnDownBackSharp } from "react-icons/io5";

const ErrorPage = () => {
    return (
        <section className="h-screen flex justify-center items-center text-white mx-auto text-center">
            <div className="">
                <p className="text-center text-2xl mb-16">Page not found</p>
                <img src={errorImage} alt="" />
                <Link className="rounded-full px-6 py-4 bg-orange-600" to={"/"}>
                    <IoReturnDownBackSharp className="inline text-3xl" /> Go
                    back
                </Link>
            </div>
        </section>
    );
};

export default ErrorPage;
