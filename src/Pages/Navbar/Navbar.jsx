import { Link, NavLink } from "react-router-dom";
import { PiHandbagSimpleThin } from "react-icons/pi";
import { useEffect, useState } from "react";
import { event } from "../../gtagEvent";

const Navbar = () => {
  const [cartLen, setCartLen] = useState(0);
  const [dropdown, setDropdown] = useState(false);
  const [navdropdown, setNavDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };
  const handleNavDopdown = () => {
    setNavDropdown(!navdropdown);
  };

  const updateCartLen = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartLen(cart.length);
  };

  // Initial load and listen for changes
  useEffect(() => {
    updateCartLen();

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
        <NavLink
          onClick={() => event("click")}
          to="/"
          className={({ isActive }) => (isActive ? "underline font-bold" : "")}
        >
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => event("click")}
          to="/makeup"
          className={({ isActive }) => (isActive ? "underline font-bold" : "")}
        >
          MAKEUP
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => event("click")}
          to="/skincare"
          className={({ isActive }) => (isActive ? "underline font-bold" : "")}
        >
          SKINCARE
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => event("click")}
          to="/dresses"
          className={({ isActive }) => (isActive ? "underline font-bold" : "")}
        >
          DRESSES
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => event("click")}
          to="/hijab&abaya"
          className={({ isActive }) => (isActive ? "underline font-bold" : "")}
        >
          HIJAB & ABAYA
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="w-11/12 max-w-screen-xl mb-6 mx-auto">
      <div className="navbar">
        <div className="navbar-start">
          <div onClick={handleNavDopdown} className="dropdown z-10">
            <div
              onClick={handleDropdown}
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
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
            {navdropdown && (
              <ul
                tabIndex={0}
                className="menu menu-sm border border-[#fcbad0] dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            )}
          </div>
          <a className="text-xl" href="/" onClick={() => event("click")}>
            <img className="w-[80px]" src="/logo_transparent.png" alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 justify-center items-center gap-4 text-[14px] font-medium">
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
          <label className="input input-sm mr-[12px] w-2/3 input-bordered rounded-full flex items-center gap-2 lg:hidden">
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
          <div className="flex justify-center items-center gap-8">
            <Link to={"/cart"} onClick={() => event("click")}>
              <p className="flex gap-22">
                <PiHandbagSimpleThin size={30} />
                {/* {JSON.parse(localStorage.getItem("cartlen"))} */}
                {cartLen}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
