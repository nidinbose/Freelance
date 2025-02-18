import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  let toastId = null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/newpass");

    try {
      toastId = toast.info("Sending OTP...", { 
        autoClose: false, 
        closeOnClick: false, 
        draggable: false, 
        progress: undefined
      });

      const res = await axios.post("http://localhost:3003/api/forgot", { email });

      if (res.data.success) {
        toast.update(toastId, {
          render: "OTP sent successfully!",
          type: "success",
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
          progress: undefined
        });
      } else {
        toast.update(toastId, {
          render: res.data.msg || "Something went wrong.",
          type: "error",
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
          progress: undefined
        });
      }
    } catch (error) {
      console.error("Error details:", error);
      toast.update(toastId, {
        render: error.response?.data?.msg || "An error occurred",
        type: "error",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('https://www.aud.edu/media/1412/shutterstock_493536808_visiting-students_traveltips.jpg')] bg-cover p-2">
           <div className="bg-white/40 p-8  w-full max-w-md">
           <img src="https://benefitzintl.com/wp-content/uploads/2024/01/benifitslogo.png" alt=""  className="bg-cover p-6"/>
        <h2 className="text-2xl text-center text-gray-700 mb-6 font-bold">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          {/* <p className="mb-5 font-semibold text-gray-700">Enter your email</p> */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-black"
            >
              Send OTP
            </button>
          </div>
        </form>
        <ToastContainer /> 
      </div>
    </div>
  );
};

export default ForgotPassword;
