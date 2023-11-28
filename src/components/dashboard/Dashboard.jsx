import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardNav from "./DashboardNav";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
    return (
        <div className="text-white overflow-y-hidden">
            <DashboardHeader />
            <div className="h-[92vh] flex ">
                <div className="w-64 ">
                    <DashboardNav />
                </div>

                <div className="px-6 py-3 relative grow overflow-y-scroll">
                    <Outlet />
                    <div className="absolute r top-0 left-0 bg-secondaryColor">
                        <div className="rounded-b-full rounded-r-full "></div>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Dashboard;
