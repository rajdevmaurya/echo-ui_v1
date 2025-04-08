import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const { getCartCount } = useCart();
  const count = getCartCount();
  
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
  <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
    <i className="material-icons" style={{ fontSize: '18px' }}>shopping_cart</i>
    {count > 0 && (
      <span style={{
        position: 'absolute',
        top: '-4px',
        right: '-6px',
        background: 'green',
        color: 'white',
        borderRadius: '5%',
        padding: '2px 6px',
        fontSize: '10px',
        fontWeight: 'bold',
        lineHeight: 1
      }}>
        {count}
      </span>
    )}
  </Link>
</div>
  );
};

export default CartIcon;