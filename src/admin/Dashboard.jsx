import { NavLink, Outlet, useLocation } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoNewspaper } from "react-icons/io5";
import { FaPeopleCarry } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { RiPlayListAddLine } from "react-icons/ri";
import { useContext, useState } from "react";
// // import { AuthContext } from "../../auth/AuthProvider";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

const Dashboard = () => {
  const location = useLocation();
  const path = location.pathname;
  const [admin, setAdmin] = useState(false);
  const [trainer, setTrainer] = useState(false);
  const [member, setMember] = useState(false);
  //   const { user, loader } = useContext(AuthContext);
  //   const axiosSecure = useAxiosSecure();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDF1F5]">
      <div className="p-8 h-[100dvh] flex flex-col md:flex-row">
        <button
          className="md:hidden bg-clr-main text-white p-2 m-4 rounded-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close Menu" : "Open Menu"}
        </button>
        <div
          className={`fixed inset-y-0 left-0 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out w-64 md:w-80 bg-white rounded-xl p-10 z-50`}
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
                    <p className="text-[#F0729F]">Track Order</p>
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
                    <p className="text-[#F0729F]">Order Logs</p>
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
            {/* <div className="divider"></div>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/allClasses">Classes</NavLink>
            </li>
            <li>
              <NavLink to="/forum">Forum</NavLink>
            </li> */}
          </ul>
        </div>
        <div className="flex-1 p-6 lg:p-8 rounded-xl ml-8 bg-white">
          {path === "/dashboard" && (
            <div className="text-7xl font-bold h-[80vh] flex justify-center items-center text-[#F0729F]">
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
