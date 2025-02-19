import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "admin") {
      navigate("/admin");
    } else if (role === "user") {
      navigate("/user");
    } else {
      navigate("/user");
    }
  }, [navigate]);

  return <div className="flex items-center justify-center h-screen">Loading ...</div>;
};

export default Navigation;
