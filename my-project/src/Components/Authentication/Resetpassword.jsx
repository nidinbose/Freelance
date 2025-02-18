import React, { useState } from "react";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/login");

    try {
      const res = await axios.post("http://localhost:3003/api/reset", { otp, newPassword });
      if(res.data.success)
        return navigate('/login')
      if (res.data.success) {
        toast.success(res.data.msg || "Password reset successful!", { autoClose: 3000 });
        navigate("/login"); 
      } else {
        toast.error(res.data.msg || "Password reset failed.");
      }
    } catch (error) {
       console.error("Reset Password Error:", error);
      toast.error(error.response?.data?.msg || "An error occurred");
    }
  };

  

  return (
    <div className="flex justify-center items-center p-4 min-h-screen bg-[url('https://www.aud.edu/media/1412/shutterstock_493536808_visiting-students_traveltips.jpg')] bg-cover">
      
      <div className="bg-white/40 p-8  w-full max-w-md">
      <img src="https://benefitzintl.com/wp-content/uploads/2024/01/benifitslogo.png" alt=""  className="bg-cover p-6"/>
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-cyan-600 text-white font-semibold rounded-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reset Password
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ResetPassword;
