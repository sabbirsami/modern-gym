import { NavLink } from "react-router-dom";
import logo from "../../assets/logo2.png";
import { useState } from "react";
import { VscChromeClose, VscMenu } from "react-icons/vsc";
import useAuth from "../hooks/useAuth";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
    const { user, signOutUser } = useAuth();
    const handleSignOut = () => {
        signOutUser();
    };
    const navLinks = [
        <li key={1}>
            <NavLink className="px-2 py-2" to={"/"}>
                Home
            </NavLink>
        </li>,
        <li key={2}>
            <NavLink className="px-2 py-2" to={"/gallery"}>
                Gallery
            </NavLink>
        </li>,

        <li key={3}>
            <NavLink className="px-2 py-2" to={"/trainers"}>
                Trainer
            </NavLink>
        </li>,
        <li key={4}>
            <NavLink className="px-2 py-2" to={"/classes"}>
                Classes
            </NavLink>
        </li>,
        <li key={8}>
            <NavLink className="px-2 py-2" to={"/community"}>
                Community
            </NavLink>
        </li>,
        <li key={5}>
            <NavLink className="px-2 py-2" to={"/dashboard"}>
                Dashboard
            </NavLink>
        </li>,
        <li key={6}>
            {user ? (
                <span className="flex gap-2 items-center">
                    <NavLink
                        className="ps-4 pe-1 py-1 border rounded-full bg-gradient-to-r hover:from-[#94f3b0] hover:to-[#7abf88] hover:text-black"
                        to={"/"}
                    >
                        <div className="flex justify-between items-center gap-3">
                            <span>{user.displayName?.split(" ")[0]}</span>
                            <img
                                className="w-10 h-10 object-cover rounded-full"
                                src={user?.photoURL}
                                alt=""
                            />
                        </div>
                    </NavLink>
                    <button
                        onClick={handleSignOut}
                        className="px-3 py-3 rounded-full text-2xl bg-gradient-to-r from-[#94f3b0] to-[#7abf88] text-black"
                        to={"/sign-in"}
                    >
                        <IoIosLogOut />
                    </button>
                </span>
            ) : (
                <NavLink className="px-2 py-2" to={"/sign-in"}>
                    Sign In
                </NavLink>
            )}
        </li>,
    ];

    const [show, setShow] = useState(false);

    return (
        <header className="container mx-auto px-6 relative">
            <nav className="py-6 flex justify-between items-center font-primary ">
                <div className="">
                    <img src={logo} className="h-10" alt="" />
                </div>
                <ul className="lg:flex gap-4 items-center hidden">
                    {navLinks.map((nav, idx) => (
                        <span key={idx}>{nav}</span>
                    ))}
                </ul>
                <button
                    onClick={() => setShow(!show)}
                    className="lg:hidden py-2 px-3 rounded-md bg-[#cd513e] text-2xl"
                >
                    <VscMenu />
                </button>
                {show && (
                    <div className="absolute h-screen w-80 bg-[#353945] top-0 z-10 right-0">
                        <div className="p-6">
                            <div className="text-end">
                                <button
                                    onClick={() => setShow(!show)}
                                    className="lg:hidden py-2 px-3 rounded-md bg-[#cd513e] text-2xl"
                                >
                                    <VscChromeClose />
                                </button>
                            </div>
                            <ul className="flex flex-col  gap-4 items-start  pt-10">
                                {navLinks.map((nav, idx) => (
                                    <span key={idx}>{nav}</span>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
