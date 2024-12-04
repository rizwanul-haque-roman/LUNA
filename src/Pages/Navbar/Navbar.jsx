import { Link, NavLink } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { PiHandbagSimpleThin } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [cartLen, setCartLen] = useState(0);

  // Update cart length from localStorage
  const updateCartLen = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartLen(cart.length);
  };

  // Initial load and listen for changes
  useEffect(() => {
    // Set initial cart length
    updateCartLen();

    // Listen for storage changes (when the cart is updated elsewhere)
    const handleStorageChange = () => {
      updateCartLen();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const links = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? "" : "")}>
          NEW & NOW
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? "" : "")}>
          MAKEUP
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? "" : "")}>
          SKINCARE
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? "" : "")}>
          CLEARANCE
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? "" : "")}>
          HAIR
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="shadow-lg">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="text-xl">
            <img className="w-[150px]" src="/logo_transparent.png" alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 justify-center items-center gap-8 text-[14px] font-medium">
            {links}
            <label className="input input-bordered rounded-full flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex justify-center items-center gap-8">
            <CiHeart size={30} />
            <Link to={"/cart"}>
              <p className="flex gap-22">
                <PiHandbagSimpleThin size={30} />
                {/* {JSON.parse(localStorage.getItem("cartlen"))} */}
                {cartLen}
              </p>
            </Link>
            <CiUser size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
