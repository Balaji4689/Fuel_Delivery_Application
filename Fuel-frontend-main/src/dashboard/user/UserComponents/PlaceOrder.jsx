import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../dashboard.css'
const PlaceOrder = ({ cartItems, onSuccess })  => {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    pinCode: '',
    phone: '',
  });

  const handleInputChange = (e) => {

    const { placeholder, value } = e.target;
    setFormData({ ...formData, [placeholder.toLowerCase().replace(/ /g, '')]: value });
  };

  const calculateTotal = () => {
    return cartItems
      ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
      : '0.00';
  };

  const handleOrder = () => {

    if (!selectedPaymentMethod) {
      alert('Please select a payment method!');
      return;
    }
    console.log('Placing order with data:', formData, 'Payment:', selectedPaymentMethod);
    alert('Order placed successfully!');
  
    if (typeof onSuccess === 'function') {
      onSuccess(); 
    }
    window.location.reload();
    setTimeout(() => {
    }, 500); 

    console.log('Placing order with data:', formData, 'Payment:', selectedPaymentMethod);
    alert('Order placed successfully!');
    if (typeof onSuccess === 'function') {
      onSuccess(); 
    }
  };

  return (
    <div className='checkout-container'>
      
    <div className='checkout-left'>
      <h2>Shipping Details</h2>
      <label>
        <span>Name</span>
        <input placeholder='Name' onChange={handleInputChange} />
      </label>
      <label>
        <span>Address</span>
        <textarea placeholder='Address' onChange={handleInputChange} />
      </label>
      <label>
        <span>Pin Code</span>
        <input placeholder='Pin Code' onChange={handleInputChange} />
      </label>
      <label>
        <span>Phone Number</span>
        <input type='number' placeholder='Phone Number' onChange={handleInputChange} />
      </label>
    </div>

    <div className='checkout-right'>
      <h3>Select Payment Method</h3>
      <label>
        <input  type='radio'  name='payment'  value='amazonPay'  onChange={(e) => setSelectedPaymentMethod(e.target.value)}/>
        Amazon Pay UPI (SBI **4878)
      </label>
      <label>
        <input  type='radio'  name='payment'  value='card'  onChange={(e) => setSelectedPaymentMethod(e.target.value)}/>
        Credit or Debit Card
      </label>
      <label>
        <input  type='radio'  name='payment'  value='netBanking'  onChange={(e) => setSelectedPaymentMethod(e.target.value)}/>
        Net Banking
      </label>
      <label>
        <input  type='radio'  name='payment'  value='upi'  onChange={(e) => setSelectedPaymentMethod(e.target.value)}/>
        Other UPI Apps
      </label>

      <div className='order-summary'>
        <h3>Order Total: ₹{calculateTotal()}</h3>
        <button onClick={handleOrder} className='place-order-btn'>
          Use this payment method
        </button>
      </div>
    </div>
  </div>
  );
};

export default PlaceOrder;
