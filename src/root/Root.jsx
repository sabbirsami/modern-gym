import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const Root = () => {
    return (
        <div className="text-white">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Root;
