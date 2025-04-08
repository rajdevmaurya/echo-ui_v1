import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  return (
    <div className="container">
      <h2>Your Cart</h2>
      
      {cart.length === 0 ? (
        <div className="card-panel">
          <p>Your cart is empty.</p>
          <Link to="/collection/jobs" className="btn">Browse Services</Link>
        </div>
      ) : (
        <>
          <div className="collection">
            {cart.map(item => (
              <div key={item.id} className="collection-item">
                <div className="row" style={{ marginBottom: 0 }}>
                  <div className="col s2 m1">
                    {item.logoUrl && (
                      <img 
                        src={item.logoUrl} 
                        alt={item.company} 
                        className="circle responsive-img"
                        style={{ maxWidth: '40px' }}
                      />
                    )}
                  </div>
                  <div className="col s6 m7">
                    <h5>{item.title}</h5>
                    <p>Company: {item.company}</p>
                    <p>Brand: {item.brand}</p>
                  </div>
                  <div className="col s2 m2">
                    <div className="input-field">
                      <input 
                        type="number" 
                        value={item.quantity} 
                        min="1"
                        onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                      />
                      <label className="active">Quantity</label>
                    </div>
                  </div>
                  <div className="col s2 m2 right-align">
                    <p className="price">${(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      className="btn-small red" 
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="material-icons">delete</i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="card-panel">
            <div className="row">
              <div className="col s12 m6">
                <Button variant="link-secondary-outline" handleClick={clearCart}>Clear Cart</Button>
                <Link to="/collection/jobs" className="btn-flat">Continue Shopping</Link>
              </div>
              <div className="col s12 m6 right-align">
                <h5>Total: ${getCartTotal().toFixed(2)}</h5>
                <Button variant="link-secondary" href="/checkout">Proceed to Checkout</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;