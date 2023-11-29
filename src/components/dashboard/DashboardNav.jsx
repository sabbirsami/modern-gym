import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import useCheckRole from "../hooks/useCheckRole";
import Loading from "../shared/Loading";

const DashboardNav = () => {
    const { signOutUser } = useContext(AuthContext);
    const { role, isUserLoading } = useCheckRole();
    if (isUserLoading) {
        return <Loading />;
    }
    console.log(role);
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
                    {role === "admin" && (
                        <li className="">
                            <li className="w-full mb-4">
                                <NavLink
                                    to={"/dashboard/manage-newsletter"}
                                    className="w-full block rounded-sm ps-5 "
                                >
                                    All subscribers
                                </NavLink>
                            </li>
                            <li className="w-full mb-4">
                                <NavLink
                                    to={"/dashboard/all-trainer"}
                                    className="w-full   block rounded-sm ps-5 "
                                >
                                    All Trainer
                                </NavLink>
                            </li>
                            <li className="w-full mb-4">
                                <NavLink
                                    to={"/dashboard/all-appliances"}
                                    className="w-full   block rounded-sm ps-5 "
                                >
                                    All Appliances
                                </NavLink>
                            </li>
                            <li className="w-full mb-4">
                                <NavLink
                                    to={"/dashboard/balance"}
                                    className="w-full   block rounded-sm ps-5 "
                                >
                                    Balance
                                </NavLink>
                            </li>
                        </li>
                    )}
                    {role === "trainer" && (
                        <li className="">
                            <li className="w-full mb-4">
                                <NavLink
                                    to={"/dashboard/manage-slot"}
                                    className="w-full   block rounded-sm ps-5 "
                                >
                                    Manage Slot
                                </NavLink>
                            </li>
                            <li className="w-full mb-4">
                                <NavLink
                                    to={"/dashboard/manage-members"}
                                    className="w-full   block rounded-sm ps-5 "
                                >
                                    Manage Members
                                </NavLink>
                            </li>
                            <li className="w-full ">
                                <NavLink
                                    to={"/dashboard/add-class"}
                                    className="w-full   block rounded-sm ps-5 "
                                >
                                    Add New Class
                                </NavLink>
                            </li>
                        </li>
                    )}
                    {role === "admin" ||
                        (role === "trainer" && (
                            <div className="">
                                <li className="w-full mb-4">
                                    <NavLink
                                        to={"/dashboard/add-new-forum"}
                                        className="w-full   block rounded-sm ps-5 "
                                    >
                                        Add New Forum
                                    </NavLink>
                                </li>
                            </div>
                        ))}

                    {role === "user" && (
                        <div className="">
                            <li className="w-full mb-4">
                                <NavLink
                                    to={"/dashboard/activity-log"}
                                    className="w-full   block rounded-sm ps-5 "
                                >
                                    Activity Log
                                </NavLink>
                            </li>

                            <li className="w-full mb-4">
                                <NavLink
                                    to={"/dashboard/profile-setting"}
                                    className="w-full   block rounded-sm ps-5 "
                                >
                                    Profile Setting
                                </NavLink>
                            </li>
                            <li className="w-full mb-4">
                                <NavLink
                                    to={"/dashboard/recommended-classes"}
                                    className="w-full   block rounded-sm ps-5 "
                                >
                                    Recommended Classes
                                </NavLink>
                            </li>
                        </div>
                    )}
                </ul>
            </nav>
            <p className=" rounded-sm ps-10  py-1 font-bold mt-20 ms-1">
                <button onClick={handleSignOut}>Sign Out</button>
            </p>
        </div>
    );
};

export default DashboardNav;
