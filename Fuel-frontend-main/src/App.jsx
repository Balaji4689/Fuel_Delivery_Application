import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signin from './components/Signin';
import Contact from './components/Contact';
import CustomerLogin from './components/CustomerLogin';
import CustomerRegister from './components/CustomerRegister';
import PetrolStationRegister from './components/PetrolStationRegister';
import PetrolStationLogin from './components/PetrolStationLogin';
import DeliveryLogin from './components/DeliveryLogin';
import DeliveryRegister from './components/DeliveryRegister';
import UserDashboard from './dashboard/user/userDashboard';
import VendorDashboard from './dashboard/vendor/vendorDashboard';
import DeliveryDashboard from './dashboard/Delivery/deliveryDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Services from './components/Services';
import NotFound from './components/NotFound';


const App = () => {
  const location = useLocation();
  const showNavbar = !(
    location.pathname.startsWith('/userDashboard') ||
    location.pathname.startsWith('/vendorDashboard') ||
    location.pathname.startsWith('/DeliveryDashboard')
  );

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/customerlogin" element={<CustomerLogin />} />
        <Route path="/customerregister" element={<CustomerRegister />} />
        <Route path="/petrolstationLogin" element={<PetrolStationLogin />} />
        <Route path="/petrolstationregister" element={<PetrolStationRegister />} />
        <Route path="/deliverylogin" element={<DeliveryLogin />} />
        <Route path="/deliveryregister" element={<DeliveryRegister />} />
        <Route path='/*' element={<NotFound/>}/>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
        <Route path="/userDashboard/*" element={<UserDashboard />} />
        <Route path="/vendorDashboard" element={<VendorDashboard />} />
        <Route path="/deliveryDashboard" element={<DeliveryDashboard />} />
        </Route>

      {/* <Route path="/userDashboard/products/:firmId" element={<ProductMenu />} /> */}

      </Routes>
    </>
  );
};

export default App;
