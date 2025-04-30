import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import API from '../utils/api';
import M from 'materialize-css';

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
    paymentMethod: 'cod'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderSuccessful, setOrderSuccessful] = useState(false);
  
  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login', { state: { redirect: '/checkout' } });
    } else {
      // Pre-populate form with user data if available
      try {
        const userData = JSON.parse(user);
        setFormData(prevState => ({
          ...prevState,
          name: userData.name || '',
          email: userData.email || '',
          address: userData.address || '',
          city: userData.city || '',
          state: userData.state || '',
          zipCode: userData.zipCode || ''
        }));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, [navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const validateForm = () => {
    // Basic validation
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.address.trim()) return 'Address is required';
    if (!formData.city.trim()) return 'City is required';
    if (!formData.state.trim()) return 'State is required';
    if (!formData.zipCode.trim()) return 'ZIP Code is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email address';
    
    // ZIP code validation (assuming India PIN code format)
    const zipRegex = /^\d{6}$/;
    if (!zipRegex.test(formData.zipCode)) return 'Please enter a valid 6-digit PIN code';
    
    return null;
  };
  
  const handleSubmit = async (e) => {
   
    e.preventDefault();
    
    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Generate order ID (would typically come from the backend)
      const orderId = 'ORD' + Date.now().toString().slice(-8);
      
      // Prepare order data
      const orderData = {
        orderId,
        items: cart.map(item => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          company: item.company,
          brand: item.brand
        })),
        shipping: {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        payment: {
          method: formData.paymentMethod,
          status: formData.paymentMethod === 'cod' ? 'pending' : 'processing'
        },
        totalAmount: getCartTotal(),
        status: 'received',
        date: new Date().toISOString()
      };
      
      // Send order to API
      let response;
      
      try {
        console.log('Placing order...');
        console.log('Order Data:', orderData);
        const storedUser = localStorage.getItem('user');
        const accessToken = JSON.parse(storedUser).accessToken;
        response = await API.request('/jobs/bookOrderRequest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
          },
         // body: JSON.stringify(orderData)
         data: JSON.stringify(orderData)
        });
      } catch (fetchError) {
        console.error('Network error:', fetchError);
        
        // For demo/development: simulate successful API response if actual API fails
        if (process.env.NODE_ENV === 'developmen') {
          console.log('Development mode: Simulating successful order placement');
          
          // Store order in localStorage for persistence
          const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
          localStorage.setItem('orders', JSON.stringify([...existingOrders, orderData]));
          
          // Show success message
          setOrderSuccessful(true);
          
          // Clear cart
          clearCart();
          
          // Wait 1 second before redirecting
          setTimeout(() => {
            navigate('/order-confirmation', { 
              state: { 
                orderId: orderData.orderId,
                orderData: orderData
              } 
            });
          }, 1000);
          
          return;
        }
        
        throw new Error('Network error. Please check your connection and try again.');
      }
      
      if (!(response.status === 201)) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to place order. Please try again.');
      }
      
      const data = await response.data;
      
      // Show success message
      setOrderSuccessful(true);
      
      // Clear cart after successful order
      clearCart();
      
      // Wait 1 second before redirecting
      /*setTimeout(() => {
        navigate('/order-confirmation', { 
          state: { 
            orderId: data.orderId || orderData.orderId,
            orderData: data.order || orderData
          } 
        });
      }, 1000);*/
      navigate('/')
       M.toast({ html: `Your Order has been  placed OrderId= ${data.orderId} `, classes: 'rounded green' });
       M.toast({ html: data.orderId, classes: 'rounded' });
    } catch (error) {
      console.error('Order placement error:', error);
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (cart.length === 0 && !orderSuccessful) {
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
      
      {orderSuccessful && (
        <div className="card-panel green lighten-4 green-text text-darken-4 center-align">
          <i className="material-icons medium">check_circle</i>
          <h5>Order Placed Successfully!</h5>
          <p>Redirecting to order confirmation...</p>
        </div>
      )}
      
      {!orderSuccessful && (
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
                      className={!formData.name && error ? 'invalid' : ''}
                    />
                    <label htmlFor="name" className={formData.name ? 'active' : ''}>Full Name</label>
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
                      className={!formData.email && error ? 'invalid' : ''}
                    />
                    <label htmlFor="email" className={formData.email ? 'active' : ''}>Email</label>
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
                      className={!formData.address && error ? 'invalid' : ''}
                    />
                    <label htmlFor="address" className={formData.address ? 'active' : ''}>Address</label>
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
                      className={!formData.city && error ? 'invalid' : ''}
                    />
                    <label htmlFor="city" className={formData.city ? 'active' : ''}>City</label>
                  </div>
                  <div className="input-field col s3">
                    <input 
                      id="state" 
                      type="text" 
                      name="state" 
                      value={formData.state}
                      onChange={handleChange}
                      required 
                      className={!formData.state && error ? 'invalid' : ''}
                    />
                    <label htmlFor="state" className={formData.state ? 'active' : ''}>State</label>
                  </div>
                  <div className="input-field col s3">
                    <input 
                      id="zipCode" 
                      type="text" 
                      name="zipCode" 
                      value={formData.zipCode}
                      onChange={handleChange}
                      required 
                      pattern="\d{6}"
                      className={!formData.zipCode && error ? 'invalid' : ''}
                    />
                    <label htmlFor="zipCode" className={formData.zipCode ? 'active' : ''}>PIN</label>
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
                    <i className="material-icons left">error</i>
                    {error}
                  </div>
                )}
                
                <div className="row">
                  <div className="col s12">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="waves-effect waves-light btn-large full-width"
                    >
                      {isLoading ? (
                        <span>
                          <i className="material-icons left">hourglass_empty</i>
                          Processing...
                        </span>
                      ) : (
                        <span>
                          Place Order
                        </span>
                      )}
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
                className="waves-effect"
              >
                <i className="material-icons left">arrow_back</i>
                Back to Cart
              </Button>
            </div>
          </div>
        </div>
      )}
      
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
        
        /* Success message styling */
        .card-panel.green-text i {
          display: block;
          margin-bottom: 10px;
        }
        
        /* Full width button styling */
        .full-width {
          width: 100%;
          display: block;
          text-align: center;
          padding: 0 1rem;
          height: 54px;
          line-height: 54px;
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