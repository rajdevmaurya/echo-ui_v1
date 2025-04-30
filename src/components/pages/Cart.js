import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  
  return (
    <div className="container">
      <span style={{ fontWeight: "bold", color: "darkgreen" }}>Your Cart </span>

      <h4 className="hide-on-med-and-up center-align">Your Cart</h4>
      
      {cart.length === 0 ? (
        <div className="card-panel">
          <p className="center-align">Your cart is empty.</p>
          <div className="center-align">
            <Link to="/collection/jobs" className="btn">Browse Services</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="card cart-item">
                <div className="card-content">
                  <div className="row valign-wrapper no-margin">
                    {/* Image Column */}
                    <div className="col s3 m2 l1 center-align">
                      {item.logoUrl ? (
                        <img 
                          src={item.logoUrl} 
                          alt={item.company} 
                          className="circle responsive-img"
                        />
                      ) : (
                        <div className="placeholder-img grey lighten-2 circle"></div>
                      )}
                    </div>
                    
                    {/* Content Column */}
                    <div className="col s9 m10 l11">
                      <div className="row no-margin">
                        {/* Title & Info */}
                        <div className="col s12 m7 l8">
                          <h5 className="item-title">{item.title}</h5>
                          <p className="item-info">Company: {item.company}</p>
                          <p className="item-info">Brand: {item.brand}</p>
                        </div>
                        
                        {/* Quantity & Price for Desktop */}
                        <div className="col hide-on-small-only m3 l2">
                          <div className="input-field compact">
                            <input 
                              type="number" 
                              value={item.quantity} 
                              min="1"
                              onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="quantity-input"
                            />
                            <label className="active">Quantity</label>
                          </div>
                        </div>
                        
                        <div className="col hide-on-small-only m2 l2 right-align">
                          <p className="price">INR {(item.price * item.quantity).toFixed(2)}</p>
                          <button 
                            className="btn-small red waves-effect waves-light"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                        </div>
                        
                        {/* Mobile-only controls row */}
                        <div className="col s12 hide-on-med-and-up">
                          <div className="row valign-wrapper mobile-controls">
                            <div className="col s6">
                              <div className="input-field compact no-margin">
                                <input 
                                  type="number" 
                                  value={item.quantity} 
                                  min="1"
                                  onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                  className="quantity-input"
                                />
                                <label className="active">Qty</label>
                              </div>
                            </div>
                            <div className="col s6 right-align">
                              <p className="price">INR {(item.price * item.quantity).toFixed(2)}</p>
                              <button 
                                className="btn-small red waves-effect waves-light"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <i className="material-icons">delete</i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="card-panel summary-panel">
            <div className="row actions-row">
              <div className="col s12 m6 l6 action-buttons">
                <Link to="/collection/jobs" className="btn-flat waves-effect">
                  Continue Shopping
                </Link>
                <button 
                  className="btn-flat red-text text-darken-4 waves-effect hide-on-small-only"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
              <div className="col s12 m6 l6 cart-summary">
                <div className="total-section">
                  <h5>Total: <span className="total-amount">INR {getCartTotal().toFixed(2)}</span></h5>
                </div>
                <Button 
                  variant="link-secondary" 
                  href="/checkout"
                  className="checkout-btn"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Custom Styles */}
      <style jsx>{`
        .no-margin {
          margin-bottom: 0 !important;
        }
        
        .cart-item {
          margin: 16px 0;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .item-title {
          font-size: 1.2rem;
          font-weight: 500;
          margin-top: 0;
          margin-bottom: 8px;
        }
        
        .item-info {
          margin: 4px 0;
          font-size: 0.9rem;
          color: #666;
        }
        
        .price {
          font-weight: 500;
          font-size: 1.1rem;
          color: #222;
          margin: 8px 0;
        }
        
        .input-field.compact {
          margin-top: 8px;
          margin-bottom: 8px;
        }
        
        .quantity-input {
          max-width: 60px;
          text-align: center;
          height: 2.5rem;
        }
        
        .placeholder-img {
          width: 40px;
          height: 40px;
          display: inline-block;
        }
        
        .mobile-controls {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #eee;
        }
        
        .summary-panel {
          background-color: #fafafa;
          border-radius: 8px;
          margin-top: 20px;
        }
        
        .actions-row {
          margin-bottom: 0;
        }
        
        .action-buttons {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .cart-summary {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        
        .total-section {
          margin-bottom: 10px;
        }
        
        .total-amount {
          color: #4caf50;
        }
        
        .checkout-btn {
          margin-top: 8px;
        }
        
        /* Responsive Adjustments */
        @media only screen and (max-width: 600px) {
          .cart-summary {
            align-items: center;
            margin-top: 16px;
          }
          
          .action-buttons {
            justify-content: center;
          }
          
          .card-content {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;