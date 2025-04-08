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
  const { addToCart } = useCart(); // Get the addToCart function from context

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
        type: 'service' // To identify item type in cart
      };
      
      // Add to cart
      addToCart(cartItem);
      
      // Show success message
      M.toast({ html: `${job.title} has been added to your cart!`, classes: 'rounded green' });
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
              <p>Brand: <strong>{job?.brand}</strong></p>
              {/* <p><TimesAgo createDate={job?.createDate} /></p> */}
              <div className="divider" style={{ margin: '1rem 0' }}></div>
              <div className='pre-text' style={{ marginBottom: '1rem' }}>
                {job?.featureDescription}
              </div>
              <div className="divider hide-on-med-and-down" style={{ margin: '2rem 0' }}></div>
              <div className='btn-wrapper'>
                <Button href={`/collection/jobs/${job?.id}`} variant="link-secondary-outline">Inquiry</Button>
                {/* Changed from href to handleClick for the Book Service button */}
                <Button handleClick={handleAddToCart} variant="link-secondary">Book Now</Button>
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nemo possimus deserunt voluptates quaerat ipsum quasi exercitationem, obcaecati veritatis corrupti molestias aperiam eligendi incidunt cumque? Culpa adipisci quidem in perferendis ab sint, tempore voluptates consequuntur nisi ipsa! Officiis quod ullam voluptatibus asperiores architecto dolorum atque repellendus sit sint nesciunt facilis maxime, quia id. Quod magnam libero, voluptatum, accusamus, sunt minima officia hic cupiditate praesentium optio odit adipisci a qui deserunt id architecto et ullam. Odio aliquid voluptatibus labore sequi voluptatem ut, recusandae dignissimos adipisci vel culpa, corporis dolore, placeat totam quam harum mollitia soluta! Dolore tempora officiis perspiciatis aliquid corrupti.
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