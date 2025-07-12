import React from 'react';

import { API_Path } from '../../Helper/ApiPath'; 

const Cart = ({ cartItems, onBack, setCartItems , onCheckout}) => {

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };


  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) } 
          : item
      ).filter(item => item.quantity > 0) 
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className='cart-page'>
      <button onClick={onBack} className='GoBackButton'>← Back to Order</button>
      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className='cart-items-list'>
          {cartItems.map((item) => (
            <div key={item._id} className='cart-item'>
              <img src={`${API_Path}/uploads/${item.image}`} alt={item.productName} className='cart-item-image' />
              <div className='cart-item-details'>
                <h4 className='cart-item-name'>{item.productName}</h4>
                <p className='cart-item-price'>₹{item.price.toFixed(2)} per item</p>
                <div className='cart-item-quantity-control'>
                  <button onClick={() => decreaseQuantity(item._id)}>-</button>
                  <span>{item.quantity} liter</span>
                  <button onClick={() => increaseQuantity(item._id)}>+</button>
                  <button onClick={() => removeItem(item._id)} className='remove-item-btn'>Remove</button>
                </div>
                <p className='cart-item-subtotal'>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
                    <div className='promo-code'>
  <p>If you have a promo code, enter it here:</p>
  <div className="promo-input-group">
    <input placeholder='Promo Code' />
    <button>Submit</button>
  </div>
</div>
          <div className='cart-summary'>
            <h3>Total: ₹{calculateTotal()}</h3>
            <button className='checkout-btn' onClick={onCheckout}>
  Proceed to Checkout
</button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;