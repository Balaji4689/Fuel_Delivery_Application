import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../dashboard/dashboard.css";
import {  Dashboard as DashboardIcon,  Business,  AddBox,  Inventory,  HeadsetMic,  Logout,} from "@mui/icons-material";
import logo from "../../assets/logo-r.png";

import AddFirm from "./forms/AddFirm";
import AddProduct from "./forms/AddProduct";
import AllProducts from "./forms/AllProducts";

const VendorDashboard = () => {
  const [vendorName, setVendorName] = useState("Vendor");
  const [profileImage, setProfileImage] = useState(null);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [hasFirm, setHasFirm] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("vendorName");
    const storedImage = localStorage.getItem("vendorImage");
    const storedFirm = localStorage.getItem("firmId"); 

    if (storedName) setVendorName(storedName);
    if (storedImage) setProfileImage(storedImage);
    if (storedFirm) setHasFirm(true); 
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("vendorImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("vendorName");
    localStorage.removeItem("vendorImage");
    localStorage.removeItem("firmId");
    alert("Logged out successfully!");
    navigate("/Signin");
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar-container" aria-label="Sidebar">
        <div>
          <div className="logo-section">
            <img src={logo} alt="Logo" className="logo-d" />
          </div>

          <nav>
            <div    className="sidebar-item"    onClick={() => setActiveSection("Dashboard")}  >
              <DashboardIcon fontSize="medium" />
              <span>Dashboard</span>
            </div>

            {!hasFirm && (
              <div    className="sidebar-item"    onClick={() => setActiveSection("AddFirm")}  >
                <Business fontSize="medium" />
                <span>Add Firm</span>
              </div>
            )}

            <div    className="sidebar-item"    onClick={() => setActiveSection("AddProduct")}  >
              <AddBox fontSize="medium" />
              <span>Add Product</span>
            </div>

            <div   className="sidebar-item"   onClick={() => setActiveSection("AllProducts")} >
              <Inventory fontSize="medium" />
              <span>All Products</span>
            </div>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-item support">
            <HeadsetMic fontSize="medium" />
            <span>Support</span>
          </div>

          <div className="sidebar-item logout" onClick={handleLogout}>
            <Logout fontSize="medium" />
            <span>Logout</span>
          </div>

<div className="profile-wrapper" title={`${vendorName}'s Profile`}>
            <div className="profile-placeholder">
              {vendorName?.charAt(0).toUpperCase()}
            </div>
            <span>{vendorName}</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {activeSection === "Dashboard" && (
          <div className="dashboard-section">
            <h1>Welcome, {vendorName}!</h1>
            <p>
              This is your vendor dashboard where you can manage firms and
              products.
            </p>
          </div>
        )}
        {activeSection === "AddFirm" && <AddFirm />}
        {activeSection === "AddProduct" && <AddProduct />}
        {activeSection === "AllProducts" && <AllProducts />}
      </main>
    </div>
  );
};

export default VendorDashboard;
