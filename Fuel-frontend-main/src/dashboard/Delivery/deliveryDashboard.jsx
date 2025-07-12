
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../dashboard/dashboard.css";
import logo from "../../assets/logo-r.png"

import {  Dashboard as DashboardIcon,  LocalShipping,  StarRate,  ExitToApp,  AssignmentTurnedIn,  HourglassEmpty,  Person,  HeadsetMic,} from "@mui/icons-material";

import MyOrders from "./myOrders";
import Ratings from "./rating";

const DeliveryDashboard = () => {
  const [deliveryName, setDeliveryName] = useState("Delivery Agent");
  const [profileImage, setProfileImage] = useState(null);
  const [activeSection, setActiveSection] = useState("Dashboard");

  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("deliveryName");
    const storedImage = localStorage.getItem("deliveryImage");
    if (storedName) setDeliveryName(storedName);
    if (storedImage) setProfileImage(storedImage);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("deliveryImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("deliveryName");
    localStorage.removeItem("deliveryImage");
    alert("Logged out successfully!");
    navigate("/Signin");
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar-container" aria-label="Sidebar">
        <div>
          <div className="logo-section">
            <img src={logo} alt="Logo" className='logo-d' />
          </div>

          <nav>
            <div className="sidebar-item" onClick={() => setActiveSection("Dashboard")}>
              <DashboardIcon fontSize="medium" />
              <span>Dashboard</span>
            </div>
            <div className="sidebar-item" onClick={() => setActiveSection("MyOrders")}>
              <LocalShipping fontSize="medium" />
              <span>My Orders</span>
            </div>
            <div className="sidebar-item" onClick={() => setActiveSection("Ratings")}>
              <StarRate fontSize="medium" />
              <span>My Ratings</span>
            </div>
          </nav>
        </div>
        <div className='sidebar-bottom'>
  <div className='sidebar-item support'>
    <HeadsetMic fontSize='medium' />
    <span>Support</span>
  </div>

  <div className="sidebar-item logout" onClick={handleLogout}>
    <ExitToApp fontSize="medium" />
    <span>Logout</span>
  </div>

  <div className="profile-wrapper" title={`${deliveryName}'s Profile`}>
            <div className="profile-placeholder">
              {deliveryName?.charAt(0).toUpperCase()}
            </div>
            <span>{deliveryName}</span>
          </div>
</div>
      </aside>
      <main className="main-content">
        {activeSection === "Dashboard" && (
          <div className="dashboard-section">
            <h1>Welcome, {deliveryName}!</h1>
            <p>Manage your deliveries efficiently.</p>
            <div className="overview-cards">
              <div className="card">
                <AssignmentTurnedIn className="icon" />
                <h3>Completed Deliveries</h3>
                <p>50</p>
              </div>
              <div className="card">
                <HourglassEmpty className="icon" />
                <h3>Pending Deliveries</h3>
                <p>5</p>
              </div>
              <div className="card">
                <StarRate className="icon" />
                <h3>Average Rating</h3>
                <p>4.8</p>
              </div>
            </div>
          </div>
        )}
        {activeSection === "MyOrders" && <MyOrders />}
        {activeSection === "Ratings" && <Ratings />}
      </main>
    </div>
  );
};

export default DeliveryDashboard;
