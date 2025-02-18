import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { HiMenu, HiX } from "react-icons/hi";
import { BsPersonCircle } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { FaHome, FaUserPlus, FaCogs } from 'react-icons/fa';

const users = [
  {
    email: "john.doe@example.com",
    name: "John Doe",
    invitationCode: "INV123456",
    userCode: "USR001",
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith",
    invitationCode: "INV234567",
    userCode: "USR002",
  },
  {
    email: "alice.jones@example.com",
    name: "Alice Jones",
    invitationCode: "INV345678",
    userCode: "USR003",
  },
  {
    email: "bob.miller@example.com",
    name: "Bob Miller",
    invitationCode: "INV456789",
    userCode: "USR004",
  },
  {
    email: "charlie.brown@example.com",
    name: "Charlie Brown",
    invitationCode: "INV567890",
    userCode: "USR005",
  },
  {
    email: "emily.davis@example.com",
    name: "Emily Davis",
    invitationCode: "INV678901",
    userCode: "USR006",
  },
  {
    email: "michael.johnson@example.com",
    name: "Michael Johnson",
    invitationCode: "INV789012",
    userCode: "USR007",
  },
  {
    email: "susan.wilson@example.com",
    name: "Susan Wilson",
    invitationCode: "INV890123",
    userCode: "USR008",
  },
  {
    email: "david.white@example.com",
    name: "David White",
    invitationCode: "INV901234",
    userCode: "USR009",
  },
  {
    email: "lucy.green@example.com",
    name: "Lucy Green",
    invitationCode: "INV012345",
    userCode: "USR010",
  },
];

const Profile = () => {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token) {
          setError("No token found, please log in.");
          setLoading(false);
          navigate('/login');
          return;
        }

        const res = await axios.get("http://localhost:3003/api/home", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          setUser(res.data);
          const subRes = await axios.get(`http://localhost:3003/api/getsub/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setSubscription(subRes.data || null);
        } else {
          setError("Failed to fetch user details.");
        }
      } catch (error) {
        setError(error.response?.data?.msg || "Error fetching data.");
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  if (loading) return <p className="text-center text-gray-500">Loading user details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return user ? (
    <div className="flex  bg-gray-100 w-full z-30">
      <button 
        className="fixed top-4 left-4 text-gray-700 lg:hidden z-50" 
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <HiX size={28} /> : <HiMenu size={28} />}
      </button>
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg p-6 flex flex-col transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BsPersonCircle className="text-4xl text-gray-700" />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-600 focus:outline-none"
          >
            <HiX className="text-2xl" />
          </button>
        </div>

        <p className="text-gray-500 mt-2">{user.email}</p>

        <nav className="mt-6 space-y-4">
          <Link
            to={`/`}
            className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md"
          >
            <FaHome className="text-lg mr-3" />
            <span>Home</span>
          </Link>

          <Link
            to={`/user`}
            className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md"
          >
            <FaHome className="text-lg mr-3" />
            <span>Dashboard</span>
          </Link>

          <Link
            to={`/referrals`}
            className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md"
          >
            <FaUserPlus className="text-lg mr-3" />
            <span>Referrals</span>
          </Link>
          <Link
            to={`/subscription`}
            className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md"
          >
            <FaUserPlus className="text-lg mr-3" />
            <span>My Subscription</span>
          </Link>

          <Link
            to={`/settings`}
            className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md"
          >
            <FaCogs className="text-lg mr-3" />
            <span>Settings</span>
          </Link>

          <button
            onClick={handleLogout}
            className="mt-6 flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 w-full"
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6 lg:p-8 overflow-x-auto">
        <h1 className="text-3xl font-bold text-gray-800 flex flex-wrap gap-2">
          Welcome <span className="text-pink-500">{user.name}</span>
        </h1>
        <p className="text-gray-50 text-center mt-2 p-2 w-32 rounded-full bg-pink-500">Premium</p>

        {subscription ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 w-full h-full">
            <div className="mt-6 bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center max-w-xl">
              <img 
                src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=2048x2048&w=is&k=20&c=8QovDK9XochFpaIC-N3pn5EEaRSVuE1SKpQDVUxLSUk=" 
                alt=""  
                className="bg-cover w-60 h-60"
              />
              <h1 className="text-pink-500 font-bold mt-3 text-3xl">{user.name}</h1>
              <h1 className="text-black font-bold mt-3 text-sm">{user.email}</h1>
              <p className="text-gray-600"><strong>Subscribed On:</strong> {new Date(subscription.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-600"><strong>Order ID:</strong> {subscription.orderId}</p>
              <p className={`inline-block px-3 py-1 rounded-sm text-white text-sm mt-2 ${
                subscription.status === "active" ? "bg-green-500" : "bg-emerald-500"
              }`}>
                {subscription.status.toUpperCase()}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg h-full w-full overflow-x-auto">
              <h1 className="text-center text-3xl font-bold text-pink-500">Your Referral List</h1>
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="w-full bg-gray-200">
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Email</th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Name</th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Invitation Code</th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">User Code</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-6 text-sm text-gray-600">{user.email}</td>
                      <td className="py-3 px-6 text-sm text-gray-600">{user.name}</td>
                      <td className="py-3 px-6 text-sm text-gray-600">{user.invitationCode}</td>
                      <td className="py-3 px-6 text-sm text-gray-600">{user.userCode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        ) : (
          <p className="mt-4 text-gray-500">No active subscription.</p>
        )}
      </main>
    </div>
  ) : (
    <p className="text-center text-gray-500">No user data available.</p>
  );
};

export default Profile;