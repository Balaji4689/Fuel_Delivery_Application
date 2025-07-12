

import React, { useState, useEffect } from 'react';
import { API_Path } from '../../Helper/ApiPath';


import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';


const ProductMenu = ({ firmId, firmName, onBack, addToCart, cartItems }) => { 
  const [products, setProducts] = useState([]);

  const productHandler = async () => {
    try {
      const response = await fetch(`${API_Path}/product/${firmId}/products`);
      const newProductData = await response.json();

      if (newProductData && Array.isArray(newProductData.products)) {
        setProducts(newProductData.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Product fetch failed", error);
    }
  };

  useEffect(() => {
    if (firmId) {
      productHandler();
    }
  }, [firmId]);

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
      <section className='Products-section'>
        <button onClick={onBack} className='GoBackButton'>← Back</button>
        <h2 className="station-title">The {firmName}</h2>

        <div className='heading'>
          <span className="fuel-types">Petrol, Diesel & 24/7 fuel delivery</span>
        </div>

        <br /><br />

        {products.length === 0 ? (
          <p>No products found for this firm.</p>
        ) : (
          products.map((item) => (
            <div key={item._id} className="product-card">
              <div className="product-left">
                <h3 className='product-names'>{item.productName}</h3>
                <p className="product-price">₹{item.price}</p>
                <p className="product-description">
                  Safe and secure fuel delivery to your doorstep, 24/7 service available.
                </p>
              </div>
              <div className="product-right">
                <img src={`${API_Path}/uploads/${item.image}`} alt={item.productName} />
                <button className="add-btn" onClick={() => addToCart(item)}>Add</button> 
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
};

export default ProductMenu;