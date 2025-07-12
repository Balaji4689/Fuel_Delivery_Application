
import React, { useState, useEffect } from "react";
import "../../dashboard/dashboard.css";
import {
  Dashboard as DashboardIcon,
  CalendarMonth,
  HeadsetMic,
  Logout,
  ShoppingCart as ShoppingCartIcon, 
} from "@mui/icons-material";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import logo from "../../assets/logo-r.png";

import Order from "./Order";
import OrderHistory from "./OrderHistory";
import Cart from "./Cart"; 

const UserDashboard = () => {
  const [customerName, setCustomerName] = useState("User");
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [cartItems, setCartItems] = useState([]); 
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p._id === product._id);
      if (existing) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, qty: p.qty + 1 } : p
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((p) => p._id !== productId));
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((p) => (p._id === productId ? { ...p, qty: newQty } : p))
    );
  };

  useEffect(() => {
    const storedName = localStorage.getItem("customerName");
    if (storedName) setCustomerName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully!");
    window.location.href = "/Signin";
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar-container" aria-label="Sidebar">
        <div>
          <div className="logo-section">
            <img src={logo} alt="Logo" className="logo-d" />
          </div>

          <nav>
            <div
              className={`sidebar-item ${activeSection === "Dashboard" ? "active" : ""}`}
              onClick={() => setActiveSection("Dashboard")}
            >
              <DashboardIcon fontSize="medium" />
              <span>Dashboard</span>
            </div>

            <div
              className={`sidebar-item ${activeSection === "Orders" ? "active" : ""}`}
              onClick={() => setActiveSection("Orders")}
            >
              <DeliveryDiningIcon fontSize="medium" />
              <span>Order</span>
            </div>

            <div className={`sidebar-item ${activeSection === "Cart" ? "active" : ""}`}onClick={() => setActiveSection("Cart")}>
              <ShoppingCartIcon fontSize="medium" />
              <span>Cart</span></div>
            <div
              className={`sidebar-item ${activeSection === "OrderHistory" ? "active" : ""}`}
              onClick={() => setActiveSection("OrderHistory")}
            >
              <CalendarMonth fontSize="medium" />
              <span>Order History</span>
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

          <div className="profile-wrapper" title={`${customerName}'s Profile`}>
            <div className="profile-placeholder">
              {customerName.charAt(0).toUpperCase()}
            </div>
            <span>{customerName}</span>
          </div>
        </div>
      </aside>
      <main className="main-content">
        {activeSection === "Dashboard" && (
          <section className="dashboard-section">
            <h1>Welcome, {customerName}!</h1>
            <p>This is your dashboard where you can manage everything.</p>
          </section>
        )}

        {activeSection === "Orders" && (
          <Order
            addToCart={addToCart}
            cartItems={cartItems}
          />
        )}
        {activeSection === "Cart" && (
          <Cart
            cartItems={cartItems}
            onClose={() => setActiveSection("Orders")} 
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        )}
        {activeSection === "OrderHistory" && <OrderHistory />}
      </main>
    </div>
  );
};

export default UserDashboard;