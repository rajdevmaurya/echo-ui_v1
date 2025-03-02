import React from 'react';

function CustomLogo({ logoUrl, alt }) {
  const defaultLogoUrl = '/jobs-portal-logo.svg';

  return (
    <div 
      style={{
        width: '170px', // Increased from 100px to 140px
        height: '180px', // Increased height as well
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
        backgroundColor: '#fff',
        overflow: 'hidden',
        transition: 'transform 0.3s ease-in-out',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <img
        src={logoUrl || defaultLogoUrl}
        alt={alt || 'Company Logo'}
        style={{
          width: '100%',  // Ensures it covers the entire div
          height: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
}

export default CustomLogo;
