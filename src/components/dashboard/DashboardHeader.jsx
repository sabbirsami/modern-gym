import logo from "../../assets/logo2.png";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
const DashboardHeader = () => {
    const { user } = useContext(AuthContext);
    console.log(user);

    return (
        <div className=" bg-[#303644]">
            <div className="flex justify-between items-center py-3  px-6">
                {/* logo */}
                <div className="">
                    <Link to={"/"}>
                        <img className="w-48" src={logo} alt="" />
                    </Link>
                </div>
                {/* menu section */}
                <nav className="">
                    <ul className="flex">
                        <li>
                            {user ? (
                                <NavLink
                                    className="px-4 py-2 border rounded-full bg-gradient-to-r hover:from-[#94f3b0] hover:to-[#7abf88] hover:text-black"
                                    to={"/"}
                                >
                                    {user.displayName?.split(" ")[0]}
                                </NavLink>
                            ) : (
                                <NavLink className={"p-4"} to={"/sign-in"}>
                                    Sign In
                                </NavLink>
                            )}
                        </li>
                        ,
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default DashboardHeader;
