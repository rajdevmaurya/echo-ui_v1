import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import Logo from '../shared/Logo';
import API from '../utils/api';
import Button from '../UI/Button';
import { Link } from "react-router-dom";
import { useCart } from '../context/CartContext'; // Import the cart context

const JobDetails = () => {
  const { job_id } = useParams(); // Access job_id from the URL
  const [job, setJob] = useState(null);
  const navigate = useNavigate(); // Hook for navigation
  const { cart, addToCart } = useCart(); // Get cart and addToCart function from context

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await API.get(`jobs/${job_id}`);
        setJob(response.data);
      } catch (error) {
        console.error(error);
        M.toast({ html: error.message || 'Failed to fetch job details', classes: 'rounded' });
      }
    };

    fetchJob();
  }, [job_id, navigate]);

  useEffect(() => {
    setTimeout(() => {
      const tabs = document.querySelectorAll('.tabs');
      M.Tabs.init(tabs, {});
    }, 100);
  }, [job]);

  // Handler for adding job to cart
  const handleAddToCart = () => {
    if (job) {
      // Create a cart item from the job
      const cartItem = {
        id: job.id,
        title: job.title,
        company: job.company,
        brand: job.brand,
        price: job.price || 0, // Make sure you have a price field in your job data or use a default value
        logoUrl: job.logoUrl,
        type: 'service', // To identify item type in cart
        quantity: 1 // Add default quantity
      };
      
      // Add to cart
      addToCart(cartItem);
      
      // Show success message
      M.toast({ html: `Product has been added to your cart!`, classes: 'rounded green' });
    }
  };

  // Handler for Book Now (check if in cart, then redirect to checkout)
  const handleBookNow = () => {
    if (job) {
      // Check if this job is already in the cart
      const itemInCart = cart.find(item => item.id === job.id);
      
      if (!itemInCart) {
        // Item not in cart, so add it
        const cartItem = {
          id: job.id,
          title: job.title,
          company: job.company,
          brand: job.brand,
          price: job.price || 0,
          logoUrl: job.logoUrl,
          type: 'service',
          quantity: 1
        };
        
        // Add to cart
        addToCart(cartItem);
        
        // Show message that item was added
        M.toast({ html: `Product has been added to your cart!`, classes: 'rounded green' });
      } else {
        // Item already in cart, just show a message that we're proceeding to checkout
        M.toast({ html: `Proceeding to checkout...`, classes: 'rounded blue' });
      }
      
      // Short timeout to allow toast to be visible before navigation
      setTimeout(() => {
        // Redirect to checkout page
        navigate('/checkout');
      }, 300);
    }
  };

  return (
    <div className="container job-details-wrapper">
      {job && (
        <div className='card' style={{ padding: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <Button variant='icon' handleClick={() => navigate(-1)}><i className='material-icons'>arrow_back</i> <span className='hide-on-med-and-down'>Go Back</span></Button>
          </div>
          <div className="common-img-header">
            <div><Logo logoUrl={job?.logoUrl} alt={job?.company} /></div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '500', marginTop: 0, color: 'inherit', marginBottom: '0.75rem' }}>{job?.title}</h2>
              <p>Brand: <strong>{job?.brand} </strong>, Price: <strong>{job?.price}</strong>, Status: <strong>In stock</strong> </p>
              {/* <p><TimesAgo createDate={job?.createDate} /></p> */}
              <div className="divider" style={{ margin: '1rem 0' }}></div>
               <p></p>
               <p></p>
              <div className='pre-text' style={{ marginBottom: '1rem' }}>
                {job?.featureDescription}
              </div>
              <div className="divider hide-on-med-and-down" style={{ margin: '2rem 0' }}></div>
              <div className='btn-wrapper'>
                 {/*<Button href={`/collection/jobs/${job?.id}`} variant="link-secondary-outline">Inquiry</Button>*/}
                <Button handleClick={handleAddToCart} variant="link-secondary-outline">Add to Cart</Button>
                <Button handleClick={handleBookNow} variant="link-secondary">Book Now</Button>
              </div>
              <div className="divider" style={{ margin: '2rem 0' }}></div>
              {job?.posttype && <p>Categories: <Link to={`/collection/${job?.posttype.toLowerCase()}`}><strong>{job?.posttype}</strong></Link></p>}
              <p style={{ marginTop: '0.5rem' }}>Company: <strong>{job?.company}</strong></p>
            </div>
          </div>

          <div className="row" style={{ margin: '2rem 0 0' }}>
            {/* tabs */}
            <ul className="tabs">
              <li className="tab col s2">
                <a className="active" href="#description"><strong>Description</strong></a>
              </li>
              <li className="tab col s2">
                <a href="#other"><strong>Service Details</strong></a>
              </li>
            </ul>

            {/* tab content */}
            <div className="tab-content">
              <div id="description">
                <div className='pre-text'>
                  {job?.description}
                </div>
              </div>
              <div id="other">
                <div className='pre-text'>
                  comming soon...
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;