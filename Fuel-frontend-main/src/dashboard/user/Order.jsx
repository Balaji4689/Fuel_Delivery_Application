

import React, { useState, useEffect } from 'react';
import '../dashboard.css';
import { API_Path } from '../../Helper/ApiPath';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EastIcon from '@mui/icons-material/East';

import ProductMenu from './ProductMenu';


const Order = ({ addToCart, cartItems }) => {
  const [vendors, setVendors] = useState([]);
  const [selectedFirm, setSelectedFirm] = useState(null);

  const fetchVendors = async () => {
    try {
      const res = await fetch(`${API_Path}/vendor/all-vendors`);
      const data = await res.json();
      setVendors(data.vendors || []);
      console.log('vendors:', data.vendors);
    } catch (err) {
      console.error('Error fetching vendors:', err);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleFirmClick = (firmId, firmName) => {
    setSelectedFirm({ id: firmId, name: firmName });
  };

  const handleScroll = (direction) => {
    const gallery = document.getElementById('ChainGallery');
    const scrollAmount = 500;
    gallery.scrollTo({
      left: gallery.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
      behavior: 'smooth',
    });
  };

  if (selectedFirm) {
    return (
      <ProductMenu
        firmId={selectedFirm.id}
        firmName={selectedFirm.name}
        onBack={() => setSelectedFirm(null)}
        addToCart={addToCart} 
        cartItems={cartItems} 
      />
    );
  }

  return (
    <>
      <section className="TopBar">
        <div className="SearchBar">
          <input type="text" placeholder="Search fuel station..." />
          <SearchIcon />
        </div>
        <div className="cart"> 
          <ShoppingCartIcon />
          {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
        </div>
      </section>

      <div className="btnsection">
        <button onClick={() => handleScroll('left')}>
          <ArrowBackIcon />
        </button>
        <button onClick={() => handleScroll('right')}>
          <EastIcon />
        </button>
      </div>

      <h2 className="chain-heading">Top Fuel Stations in Hyderabad</h2>

      <div className="ChainSection" id="ChainGallery">
        {vendors.map((vendor) => (
          <div className="venderBox" key={vendor._id}>
            {vendor.firm?.map((firm) => (
              <div  key={firm._id}  className="firmImage"  style={{ cursor: 'pointer' }}  onClick={() => handleFirmClick(firm._id, firm.firmName)}>
                <img  src={`${API_Path}/uploads/${firm.image}`}  alt={firm.firmName}  loading="lazy"/>
              </div>
            ))}
          </div>
        ))}
      </div>

      <h3 className="firmController-heading">Fuel Stations with Online Delivery</h3>

      <section className="firmsection">
        {vendors.map((vendor) =>
          vendor.firm?.map((firm) => (
            <div className="firm-venderBox" key={firm._id}>
              <div  className="firm-Image"  onClick={() => handleFirmClick(firm._id, firm.firmName)}  style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                <img  src={`${API_Path}/uploads/${firm.image}`}  alt={firm.firmName}  loading="lazy"/>
                <div className="firmOffer">{firm.offer || 'No current offer'}</div>
                <div>
                  <div className="firm-Names">{firm.firmName}</div>
                  <div className="area">{firm.area}</div>
                  <div className="offer">{firm.offer}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
};

export default Order;