import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineAddBusiness } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoNewspaper } from "react-icons/io5";
import { FaPeopleCarry, FaWarehouse } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify"; // For notifications (optional)
import "react-toastify/dist/ReactToastify.css"; // Import styles if using react-toastify
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [trainer, setTrainer] = useState(false);
  const [member, setMember] = useState(false);
  const { user, logOut, loader } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logOut(); // Assuming logOut is an async function from AuthContext
      toast.success("Logged out successfully!"); // Notify user
      navigate("/lunastore_admin"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out. Please try again."); // Error notification
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF1F5]">
      <Helmet>
        <title>LUNA | Dashboard</title>
      </Helmet>
      <div className="p-8 h-[100dvh] flex flex-col md:flex-row overflow-hidden">
        <button
          className="md:hidden text-black p-2 mb-4 rounded-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <RxCross2 /> : <RxHamburgerMenu />}
        </button>
        <div
          className={`fixed inset-y-0 left-0 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out w-64 md:w-80 bg-white rounded-xl p-10 z-50 overflow-y-auto`}
        >
          <ul className="text-xl space-y-6 font-medium text-white">
            <div className="flex gap-3 items-center text-[#F0729F]">
              <NavLink to="/dashboard">
                <h1 className="text-3xl font-bold text-[#F0729F]">
                  Luna Store
                </h1>
              </NavLink>
            </div>
            <>
              <li>
                <NavLink
                  to="/dashboard/adminHome"
                  className={({ isActive }) =>
                    isActive ? "text-[#F0729F] font-bold" : ""
                  }
                >
                  <div className="flex gap-3 items-center">
                    <MdAdminPanelSettings className="text-2xl text-[#F0729F]" />
                    <p className="text-[#F0729F]">Admin Home</p>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/trackOrders"
                  className={({ isActive }) =>
                    isActive ? "text-[#F0729F] font-bold" : ""
                  }
                >
                  <div className="flex gap-3 items-center">
                    <IoNewspaper className="text-2xl text-[#F0729F]" />
                    <p className="text-[#F0729F]">Pending Orders</p>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/orderLogs"
                  className={({ isActive }) =>
                    isActive ? "text-[#F0729F] font-bold" : ""
                  }
                >
                  <div className="flex gap-3 items-center">
                    <FaPeopleCarry className="text-2xl text-[#F0729F]" />
                    <p className="text-[#F0729F]">Order History</p>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/UploadProduct"
                  className={({ isActive }) =>
                    isActive ? "text-[#F0729F] font-bold" : ""
                  }
                >
                  <div className="flex gap-3 items-center">
                    <MdOutlineAddBusiness className="text-2xl text-[#F0729F]" />
                    <p className="text-[#F0729F]">Add Products</p>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/products"
                  className={({ isActive }) =>
                    isActive ? "text-[#F0729F] font-bold" : ""
                  }
                >
                  <div className="flex gap-3 items-center">
                    <FaWarehouse className="text-2xl text-[#F0729F]" />
                    <p className="text-[#F0729F]">Products</p>
                  </div>
                </NavLink>
              </li>
              <li className="pt-12">
                <NavLink to="/" className="text-[#F0729F] font-bold">
                  <div className="flex gap-3 items-center">
                    <FaHome className="text-2xl text-[#F0729F]" />
                    <p className="text-[#F0729F]">Go to Homepage</p>
                  </div>
                </NavLink>
              </li>
            </>
          </ul>
          <ul className="absolute bottom-0 left-0 right-0 p-6">
            <li
              className="text-[#F0729F] text-lg font-bold cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
        <div className="flex-1 p-6 lg:p-8 rounded-xl lg:ml-8 bg-white overflow-y-auto">
          {path === "/dashboard" && (
            <div className="text-3xl lg:text-7xl font-bold h-full text-center flex justify-center items-center text-[#F0729F]">
              <p>Welcome to Dashboard</p>
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
