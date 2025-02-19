import React from 'react';

function Logo({ logoUrl, alt }) {
  const defaultLogoUrl = '/jobs-portal-logo.svg';
  return (
    <React.Fragment>
      <img src={logoUrl ? logoUrl : defaultLogoUrl} alt={alt} className="responsive-img" />
    </React.Fragment>
  );
}

export default Logo;
