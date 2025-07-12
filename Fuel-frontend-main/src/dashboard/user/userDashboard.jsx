
import React, { useState, useEffect } from 'react';
import "../../dashboard/dashboard.css";
import { QrCodeScanner, CalendarMonth, Dashboard as DashboardIcon, HeadsetMic, Logout, AccessTime } from '@mui/icons-material';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import Order from './Order';
import OrderHistory from './OrderHistory';
import Cart from './Cart';
import logo from "../../assets/logo-r.png"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const UserDashboard = () => {
  const [customerName, setCustomerName] = useState('User');
  const [profileImage, setProfileImage] = useState(null);
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    const storedName = localStorage.getItem('customerName');
    const storedImage = localStorage.getItem('profileImage');
    if (storedName) setCustomerName(storedName);
    if (storedImage) setProfileImage(storedImage);
  }, []);

  const handleBack = () => {        
    setActiveSection('Orders');
  };

  const handleCheckout = () => {    
    alert("Checkout successful!");
    setCartItems([]);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully!");
    window.location.href = '/Signin';
  };

  return (
    <div className="dashboard-wrapper">
      <aside className='sidebar-container' aria-label="Sidebar">
        <div>
          <div className='logo-section'>
            <img src={logo} alt="Logo" className='logo-d' />
          </div>

          <nav>
            <div className='sidebar-item' onClick={() => setActiveSection('Dashboard')}>
              <DashboardIcon fontSize='medium' />
              <span>Dashboard</span>
            </div>

            <div className='sidebar-item' onClick={() => setActiveSection('Orders')}>
              <DeliveryDiningIcon fontSize='medium' />
              <span>Order</span>
            </div>
            <div className='sidebar-item' onClick={() => setActiveSection('Cart')}>
            <ShoppingCartIcon fontSize='medium'/>
              <span>Cart</span>
            </div>
            <div className='sidebar-item' onClick={() => setActiveSection('OrderHistory')}>
              <CalendarMonth fontSize='medium' />
              <span>Order History</span>
            </div>
          </nav>
        </div>

        <div className='sidebar-bottom'>
          <div className='sidebar-item support'>
            <HeadsetMic fontSize='medium' />
            <span>Support</span>
          </div>

          <div className='sidebar-item logout' onClick={handleLogout}>
            <Logout fontSize='medium' />
            <span>Logout</span>
          </div>
         <div className='profile-wrapper' title={`${customerName}'s Profile`}>
            <div className="profile-placeholder">
              {customerName?.charAt(0).toUpperCase()}
            </div>
            <span>{customerName}</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {activeSection === 'Dashboard' && (
          <div className="dashboard-section">
            <h1>Welcome, {customerName}!</h1>
            <p>This is your dashboard where you can manage everything.</p>
          </div>
        )}
{activeSection === 'Orders' && (
  <Order
    cartItems={cartItems}
    setCartItems={setCartItems}
    onSuccess={() => setActiveSection('Dashboard')}
  />
)}

        {activeSection === 'OrderHistory' && <OrderHistory />}
        {activeSection === 'Cart' && (
          <Cart  cartItems={cartItems}  setCartItems={setCartItems}  onBack={handleBack}  onCheckout={handleCheckout}/>
        )}

      </main>
    </div>
  );
};

export default UserDashboard;
