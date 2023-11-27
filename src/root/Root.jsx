import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { Toaster } from "react-hot-toast";
const Root = () => {
    return (
        <div className="text-white">
            <Navbar />
            <Outlet />
            <Footer />
            <Toaster />
        </div>
    );
};

export default Root;
