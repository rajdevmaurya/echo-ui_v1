import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Button.module.css';

const Button = ({ variant = 'button', handleClick = () => { }, children, className = '', href, ...rest }) => {
  if (variant === 'link') {
    return (
      <Link className={`${classes.btn} ${className}`}
        to={href}
        {...rest}>
        {children}
      </Link>
    );
  }
  if (variant === 'link-secondary') {
    return (
      <Link className={`${classes.btn} ${classes['btn-secondary']} ${className}`}
        to={href}
        {...rest}>
        {children}
      </Link>
    );
  }
  if (variant === 'link-secondary-outline') {
    return (
      <Link className={`${classes.btn} ${classes['btn-secondary-outline']} ${className}`}
        to={href}
        {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button className={[
      variant === 'button' && classes.btn,
      variant === 'text' && `${classes.btn} ${classes['btn-text']}`,
      variant === 'icon' && classes['btn-icon-wrapper'],
      className
    ].filter(Boolean).join(' ')}
      onClick={handleClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
