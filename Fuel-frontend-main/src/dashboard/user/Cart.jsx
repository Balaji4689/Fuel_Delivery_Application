import React, { useState, useEffect } from 'react';
import { API_Path } from '../../Helper/ApiPath';
import { useNavigate } from 'react-router-dom'; 
import '../dashboard.css'; 

const Cart = ({ cartItems, onClose, removeFromCart, updateQuantity, clearCart }) => {
  const navigate = useNavigate(); 
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    pinCode: '',
    phone: '',
  });


  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2);
  };


  const handleInputChange = (e) => {
    const { placeholder, value } = e.target;

    setFormData({ ...formData, [placeholder.toLowerCase().replace(/ /g, '')]: value });
  };


  const handlePlaceOrder = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method!');
      return;
    }


    if (!formData.name || !formData.address || !formData.pinCode || !formData.phone) {
      alert('Please fill in all shipping details!');
      return;
    }

    console.log('Placing order with data:', formData, 'Payment:', selectedPaymentMethod, 'Cart Items:', cartItems);
    alert('Order placed successfully!');

    if (typeof clearCart === 'function') {
      clearCart();
    }

  };

  return (
    <div className="cart-page-container">
      <div className="cart-content-area">
        <div className="cart-header">
          <h2>Your Cart </h2>
          {onClose && <button onClick={onClose} className="close-cart-btn">✖</button>}
        </div>

        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <p>Your cart is empty. Add some products from the "Order" section!</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={`${API_Path}/uploads/${item.image}`} alt={item.productName} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.productName}</h4>
                  <p>₹{item.price.toFixed(2)}</p>
                  <div className="cart-item-quantity-control">
                    <button onClick={() => updateQuantity(item._id, item.qty - 1)} disabled={item.qty === 1}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQuantity(item._id, item.qty + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item._id)} className="remove-item-btn">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <div className="cart-footer">
              <h3>Subtotal: ₹{calculateTotal()}</h3> 
              <div className="promo-code-section">
                <label htmlFor="promo-input">Promo Code:</label>
                <input  type="text"  id="promo-input"  placeholder='Enter promo code'/>
                <button className="apply-promo-btn">Apply</button>
              </div>
            </div>

            <hr /> 
            <div className='checkout-container'>
              <div className='checkout-left'>
                <h2>Shipping Details </h2>
                <label>
                  <span>Name</span>
                  <input  placeholder='Name'  value={formData.name}  onChange={handleInputChange}/>
                </label>
                <label>
                  <span>Address</span>
                  <textarea  placeholder='Address'  value={formData.address}  onChange={handleInputChange}/>
                </label>
                <label>
                  <span>Pin Code</span>
                  <input  placeholder='Pin Code'  value={formData.pinCode}  onChange={handleInputChange}/>
                </label>
                <label>
                  <span>Phone Number</span>
                  <input  type='number'  placeholder='Phone Number'  value={formData.phone}  onChange={handleInputChange}/>
                </label>
              </div>

              <div className='checkout-right'>
                <h3>Select Payment Method </h3>
                <label>
                  <input  type='radio'  name='payment'  value='amazonPay'  checked={selectedPaymentMethod === 'amazonPay'}  onChange={(e) => setSelectedPaymentMethod(e.target.value)}/>
                  Amazon Pay UPI (SBI **4878)
                </label>
                <label>
                  <input  type='radio'  name='payment'  value='card'  checked={selectedPaymentMethod === 'card'}  onChange={(e) => setSelectedPaymentMethod(e.target.value)}/>
                  Credit or Debit Card
                </label>
                <label>
                  <input  type='radio'  name='payment'  value='netBanking'  checked={selectedPaymentMethod === 'netBanking'}  onChange={(e) => setSelectedPaymentMethod(e.target.value)}/>
                  Net Banking
                </label>
                <label>
                  <input  type='radio'  name='payment'  value='upi'  checked={selectedPaymentMethod === 'upi'}  onChange={(e) => setSelectedPaymentMethod(e.target.value)}/>
                  Other UPI Apps
                </label>
              </div>
            </div>
            <div className='order-summary'>
              <h3>Order Total: ₹{calculateTotal()}</h3> 
              <button onClick={handlePlaceOrder} className='place-order-btn'>
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;