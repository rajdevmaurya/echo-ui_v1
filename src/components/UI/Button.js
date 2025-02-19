import React from 'react';
import classes from './Button.module.css';
import { Link } from 'react-router-dom';

const Button = ({ varient = 'button', handleClick, children, className, href, ...rest }) => {
  if (varient === 'link') {
    return (
      <Link className={`${classes.btn} ${className}`}
        to={href}
        {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button className={[
      varient === 'button' && classes.btn,
      varient === 'text' && `${classes.btn} ${classes['btn-text']}`,
      varient === 'icon' && classes['btn-icon-wrapper'],
      className
    ].filter(Boolean).join(' ')}
      onClick={handleClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
