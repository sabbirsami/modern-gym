import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

const DashboardNav = () => {
    const { signOutUser } = useContext(AuthContext);
    const handleSignOut = () => {
        signOutUser();
    };
    return (
        <div className="h-full bg-[#303644] w-64 dashboard-menu">
            <nav className="p-6 ">
                <ul className="space-y-5">
                    <li className="w-full ">
                        <NavLink
                            to={"/dashboard"}
                            className="w-full rounded-sm  block ps-5"
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="w-full ">
                        <NavLink
                            to={"/dashboard/manage-newsletter"}
                            className="w-full block rounded-sm ps-5 "
                        >
                            Manage Newsletter
                        </NavLink>
                    </li>
                    <li className="w-full ">
                        <NavLink
                            to={"/dashboard/all-trainer"}
                            className="w-full   block rounded-sm ps-5 "
                        >
                            All Trainer
                        </NavLink>
                    </li>
                    <li className="w-full ">
                        <NavLink
                            to={"/dashboard/manage-users"}
                            className="w-full  block rounded-sm ps-5 "
                        >
                            Manage Users
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <p className=" rounded-sm ps-10  py-1 font-bold ">
                <button onClick={handleSignOut}>Sign Out</button>
            </p>
        </div>
    );
};

export default DashboardNav;
