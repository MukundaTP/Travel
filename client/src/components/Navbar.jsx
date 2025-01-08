import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="p-2 flex items-center justify-between h-full w-full bg-white border-gray-100 sticky top-0 left-0 right-0 z-10 ">
      <h2 className="font-semibold text-gray-700 italic">TravelEase</h2>
      <div className="flex items-center justify-center gap-3 font-semibold">
        <NavLink className={"no-underline text-gray-700"} to={"/"}>
          Home
        </NavLink>
        <NavLink className={"no-underline text-gray-700"} to={"/about"}>
          About
        </NavLink>
        <NavLink className={"no-underline text-gray-700"} to={"/services"}>
          services
        </NavLink>
        <NavLink className={"no-underline text-gray-700"} to={"/contact"}>
          Contact
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
