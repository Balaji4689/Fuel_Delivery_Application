
import React from 'react';
import '../../dashboard.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';


const TopBar = ({ cartItemCount, onCartClick }) => {
  return (
    <section className='TopBar'>
      <div className='SearchBar'>
        <input type="text" placeholder='search' /><SearchIcon />
      </div>
      <div className='cart' onClick={onCartClick} style={{ cursor: 'pointer' }}>
        <ShoppingCartIcon />
        {cartItemCount > 0 && <span className='cart-count'>{cartItemCount}</span>}
      </div>
    </section>
  );
};

export default TopBar;