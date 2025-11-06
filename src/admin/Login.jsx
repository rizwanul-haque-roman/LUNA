import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { AuthContext } from "../Context/AuthProvider";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [viewPass, setVewPass] = useState(true);
  const { loginUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const pass = form.pass.value;

    loginUser(email, pass)
      .then((res) => {
        if (res.user) {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        let errorMessage = "Login Failed. Please check your credentials.";

        if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email format.";
        } else if (error.code === "auth/user-not-found") {
          errorMessage = "No account found with this email.";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Incorrect password. Please try again.";
        }

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: errorMessage,
          confirmButtonColor: "#E19D7A",
        });
      });
  };

  return (
    <div className="w-11/12 bg-[url('/loginPage.jpg')] lg:w-full mx-auto h-[80dvh] bg-cover bg-center bg-no-repeat flex items-center">
      <Helmet>
        <title>LUNA | Admin Login</title>
      </Helmet>
      <div className="w-auto mx-auto">
        <form
          onSubmit={handleSubmit}
          className="h-[65vh] w-11/12 mx-auto md:w-[70vw] lg:w-[25vw] flex flex-col justify-center gap-4 p-6 border border-[#13131321] shadow-2xl bg-[#13131321] backdrop-blur-sm rounded-xl"
        >
          <h1 className="font-bold text-white text-5xl text-center">
            Welcome Admin!
          </h1>
          <h3 className="font-semibold text-white text-2xl text-center mb-8">
            Please enter credentials to login
          </h3>
          <label className="input flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              className="w-full"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </label>
          <label className="input flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="w-full"
                type={viewPass ? "password" : "text"}
                name="pass"
                placeholder="password"
                required
              />
            </div>
            <a onClick={() => setVewPass(!viewPass)}>
              {viewPass ? <FaRegEye /> : <FaRegEyeSlash />}
            </a>
          </label>
          <a href="#" className="text-white font-medium hover:underline">
            Forgot Password?
          </a>
          <button className="btn bg-[#DF8380] hover:bg-[#E19D7A] border-0 text-2xl text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
