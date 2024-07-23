import React, { useState, useEffect } from "react";
import axios from "axios";
import authbg from "./authbg.png";
import { Link } from "react-router-dom";
import logo from "./logo.jpg"; // adjust the path as necessary
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../utils/domain";
const LoginForm = ({ onLogin, onSwitchToRegister }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const seid = localStorage.getItem("seid")
      const exam_id = localStorage.getItem("exam_id")
      navigate(`/screening?id=${exam_id}&seid=${seid}`);
    }
  });

  const images = [
    "https://mcfcamp.in/wp-content/uploads/2023/11/35_wm-1.jpg",
    "https://mcfcamp.in/wp-content/uploads/2023/11/DSC_6581.jpg",
    "https://mcfcamp.in/wp-content/uploads/2023/11/IMG_2164.jpg",
    "https://mcfcamp.in/wp-content/uploads/2023/11/IMG_2164.jpg",
    "https://mcfcamp.in/wp-content/uploads/2023/11/IMG_2164.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [currentImageIndex]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic form validation
    setLoading(true);
    try {
      axios
        .post(`https://${baseurl}/loginAdmin`, formData)
        .then((response) => {
          console.log("Successful login:", response);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("admin_name", response.data.admin_name);
          localStorage.setItem("maintainFlag", "off");

          // Redirect to /dash or perform any other actions
          const seid = localStorage.getItem("seid")
          const exam_id = localStorage.getItem("exam_id")
          navigate(`/screening?id=${exam_id}&seid=${seid}`);
        })

        .catch((error) => {
          setLoading(false);
          toast.error("Invalid Credentials", {
            style: { background: "red", color: "#fff" },
          });
          formData.username = "";
          formData.password = "";
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        // backgroundSize: "cover",
        // backgroundPosition: "left",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "70%" }}>
        <img
          src={images[currentImageIndex]}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="Slideshow"
        />
      </div>
      <div
        style={{
          width: "10px",
          height: "100%",
          borderLeft: "2px solid gray",
          marginRight: "3rem",
          borderRadius: "10px",
        }}
      />
      <div style={{ width: "30%", marginRight: "3rem" }}>
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Welcome To MCF Camp
            </h1>
            <h1 className="mt-6 text-center text-xl font-bold text-gray-500">
              We Aim At Creating Responsible And Self-Driven Cadet
            </h1>
            <br />
            <br />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  ${
                  loading
                    ? "bg-indigo-300 cursor-not-allowed hover:bg-indigo-300"
                    : ""
                } bg-indigo-600 hover:bg-indigo-700 focus:outline-none `}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
  const images = [
    "https://mcfcamp.in/wp-content/uploads/2023/11/35_wm-1.jpg",
    "https://mcfcamp.in/wp-content/uploads/2023/11/DSC_6581.jpg",
    "https://mcfcamp.in/wp-content/uploads/2023/11/IMG_2164.jpg",
    "https://mcfcamp.in/wp-content/uploads/2023/11/IMG_2164.jpg",
    "https://mcfcamp.in/wp-content/uploads/2023/11/IMG_2164.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [currentImageIndex]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic form validation
    axios
      .post(`https://${baseurl}/addAdmin`, formData)
      .then((response) => {
        console.log("successful registration:", response);
        localStorage.setItem(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0YmJiMWQ5YTE2MGYxNTBkYjNiMWMxIiwidXNlck5hbWUiOiJBbGkiLCJ1aWQiOiI4MzYwMjYxMzU4MyJ9LCJpYXQiOjE2OTk0NjE5MTd9.yHsKqTOyVv-aElFARozNEURJhjwFKjc4yBvNTj0qyc0"
        );
        // Redirect to /dash or perform any other actions
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("registration failed:", error);
        // Handle login error, update state, or display an error message to the user
      });
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        // backgroundSize: "cover",
        // backgroundPosition: "left",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "70%" }}>
        {/* This is the 80% width div. You can put other content here. */}
        <img
          src={images[currentImageIndex]}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="Slideshow"
        />
      </div>
      <div
        style={{
          width: "10px",
          height: "100%",
          borderLeft: "2px solid gray",
          marginRight: "3rem",
          borderRadius: "10px",
        }}
      />
      <div style={{ width: "30%", marginRight: "3rem" }}>
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create a new account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
            <div className="text-center">
              <p className="mt-2 text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Log in here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const AuthPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const seid = localStorage.getItem("seid")
      const exam_id = localStorage.getItem("exam_id")
      navigate(`/screening?id=${exam_id}&seid=${seid}`);
    }
  });
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(
        `https://${baseurl}/loginAdmin`,
        formData
      );
      console.log("Login successful:", response.data);
      window.location.href = "/dash";
      // Handle successful login, e.g., redirect to another page
    } catch (error) {
      console.error("Login failed:", error.response.data);
      // Handle login error, update state, or display an error message to the user
    }
  };

  const handleRegister = (formData) => {
    // Handle registration logic (you can send data to the server or perform any other actions)
    console.log("Registration submitted:", formData);
  };

  const switchForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <div>
      {isLogin ? (
        <LoginForm onLogin={handleLogin} onSwitchToRegister={switchForm} />
      ) : (
        <RegisterForm
          onRegister={handleRegister}
          onSwitchToLogin={switchForm}
        />
      )}
    </div>
  );
};

export default AuthPage;
