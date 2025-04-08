import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button';

const Checkout = () => {
  const { cart, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'creditCard'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login', { state: { redirect: '/checkout' } });
    }
  }, [navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Prepare order data
      const orderData = {
        items: cart.map(item => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          price: item.price
        })),
        shipping: formData,
        totalAmount: getCartTotal(),
        date: new Date().toISOString()
      };
      
      // Send order to API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
      
      const data = await response.json();
      
      // Clear cart after successful order
      clearCart();
      
      // Redirect to order confirmation page
      navigate('/order-confirmation', { state: { orderId: data.orderId } });
      
    } catch (error) {
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (cart.length === 0) {
    return (
      <div className="container">
        <h2>Checkout</h2>
        <div className="card-panel">
          <p>Your cart is empty. Please add items to your cart before checking out.</p>
          <Button variant="link-secondary" href="/collection/jobs">
            Browse Services
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container">
      <h2 className="hide-on-small-only">Checkout</h2>
      <h4 className="hide-on-med-and-up center-align">Checkout</h4>
      
      <div className="row">
        <div className="col s12 m6">
          <div className="card-panel">
            <h5>Shipping Details</h5>
            <form onSubmit={handleSubmit} className="compact-form">
              <div className="row">
                <div className="input-field col s12">
                  <input 
                    id="name" 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                  <label htmlFor="name">Full Name</label>
                </div>
              </div>
              
              <div className="row">
                <div className="input-field col s12">
                  <input 
                    id="email" 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              
              <div className="row">
                <div className="input-field col s12">
                  <input 
                    id="address" 
                    type="text" 
                    name="address" 
                    value={formData.address}
                    onChange={handleChange}
                    required 
                  />
                  <label htmlFor="address">Address</label>
                </div>
              </div>
              
              <div className="row">
                <div className="input-field col s6">
                  <input 
                    id="city" 
                    type="text" 
                    name="city" 
                    value={formData.city}
                    onChange={handleChange}
                    required 
                  />
                  <label htmlFor="city">City</label>
                </div>
                <div className="input-field col s3">
                  <input 
                    id="state" 
                    type="text" 
                    name="state" 
                    value={formData.state}
                    onChange={handleChange}
                    required 
                  />
                  <label htmlFor="state">State</label>
                </div>
                <div className="input-field col s3">
                  <input 
                    id="zipCode" 
                    type="text" 
                    name="zipCode" 
                    value={formData.zipCode}
                    onChange={handleChange}
                    required 
                  />
                  <label htmlFor="zipCode">ZIP</label>
                </div>
              </div>
              
              <div className="row">
                <div className="col s12">
                  <p className="payment-title">Payment Method</p>
                  <div className="payment-options">
                     
                    <p>
                      <label> 
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={handleChange} 
                        />
                        <span>Cash on Delivery</span>
                      </label>
                    </p>
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="card-panel red lighten-4 red-text text-darken-4">
                  {error}
                </div>
              )}
              
              <div className="row">
                <div className="col s12">
                  <Button 
                    variant="link-secondary" 
                    type="submit" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Place Order'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        <div className="col s12 m6">
          <div className="card-panel">
            <h5>Order Summary</h5>
            <ul className="collection order-items">
              {cart.map(item => (
                <li key={item.id} className="collection-item">
                  <div className="row valign-wrapper" style={{ marginBottom: 0 }}>
                    <div className="col s2">
                      {item.logoUrl && (
                        <img 
                          src={item.logoUrl} 
                          alt={item.company} 
                          className="circle responsive-img"
                          style={{ maxWidth: '30px' }}
                        />
                      )}
                    </div>
                    <div className="col s7">
                      <span className="item-title">{item.title}</span>
                      <p className="grey-text item-details">{item.company} • Qty: {item.quantity}</p>
                    </div>
                    <div className="col s3 right-align">
                      <p className="price">INR {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="divider"></div>
            
            <div className="row total-section">
              <div className="col s6">
                <h5>Total</h5>
              </div>
              <div className="col s6 right-align">
                <h5>INR {getCartTotal().toFixed(2)}</h5>
              </div>
            </div>
            
            <Button 
              variant="link-secondary-outline" 
              href="/cart"
              style={{ marginRight: '10px' }}
            >
              Back to Cart
            </Button>
          </div>
        </div>
      </div>
      
      {/* Add some custom styling for responsiveness */}
      <style jsx>{`
        .compact-form .row {
          margin-bottom: 10px;
        }
        .compact-form .input-field {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .payment-title {
          font-weight: 500;
          margin-bottom: 5px;
        }
        .payment-options p {
          margin: 5px 0;
        }
        .order-items .item-title {
          font-weight: 500;
          display: block;
        }
        .order-items .item-details {
          font-size: 0.9rem;
          margin-top: 0;
        }
        .total-section {
          margin-top: 10px;
          margin-bottom: 10px;
        }
        
        /* Responsive adjustments */
        @media only screen and (max-width: 600px) {
          .container {
            width: 95%;
          }
          .price {
            font-size: 0.9rem;
          }
          .order-items .collection-item {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;