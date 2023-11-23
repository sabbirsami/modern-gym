import { NavLink } from "react-router-dom";
import logo from "../../assets/logo2.png";
import { useState } from "react";
import { VscChromeClose, VscMenu } from "react-icons/vsc";

const Navbar = () => {
    const navLinks = [
        <li key={1}>
            <NavLink className="px-2 py-2" to={"/"}>
                Home
            </NavLink>
        </li>,
        <li key={2}>
            <NavLink className="px-2 py-2" to={"/"}>
                Gallery
            </NavLink>
        </li>,
        <li key={3}>
            <NavLink className="px-2 py-2" to={"/"}>
                Trainer
            </NavLink>
        </li>,
        <li key={4}>
            <NavLink className="px-2 py-2" to={"/"}>
                Classes
            </NavLink>
        </li>,
        <li key={5}>
            <NavLink className="px-2 py-2" to={"/"}>
                Dashboard
            </NavLink>
        </li>,
        <li key={6}>
            <NavLink className="px-2 py-2" to={"/"}>
                Register
            </NavLink>
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
