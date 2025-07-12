import React, { useState } from 'react';
import TopBar from './UserComponents/TopBar';
import Chain from './UserComponents/Chain';
import FirmCollections from './UserComponents/FirmCollections'; 
import ProductMenu from './UserComponents/ProductMenu';
import Cart from './Cart';
import PlaceOrder from './UserComponents/PlaceOrder';

const Order = ({ cartItems, setCartItems, onSuccess }) => {
  const [selectedFirm, setSelectedFirm] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showPlaceOrder, setShowPlaceOrder] = useState(false);


  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const toggleCart = () => {
    setShowCart((prevShowCart) => !prevShowCart);
    setShowPlaceOrder(false); 
  };

  return (
    <div>
      <TopBar cartItemCount={cartItems.length} onCartClick={toggleCart} />

      {showPlaceOrder ? (
        <PlaceOrder cartItems={cartItems} onSuccess={() => {setShowPlaceOrder(false);

         }} />
        
      ) : showCart ? (
        <Cart  cartItems={cartItems}  onBack={() => setShowCart(false)}  setCartItems={setCartItems}  onCheckout={() => {    setShowCart(false);    setShowPlaceOrder(true);  }}/>
      ) : (
        <>
          {!selectedFirm ? (
            <>
              <Chain onFirmClick={(firmId, firmName) => setSelectedFirm({ firmId, firmName })} />
              <FirmCollections onFirmClick={(firmId, firmName) => setSelectedFirm({ firmId, firmName })} />
            </>
          ) : (
            <ProductMenu  firmId={selectedFirm.firmId}  firmName={selectedFirm.firmName}  onBack={() => setSelectedFirm(null)} onAddToCart={addToCart}/>
          )}
        </>
      )}
    </div>
  );
};

export default Order;
