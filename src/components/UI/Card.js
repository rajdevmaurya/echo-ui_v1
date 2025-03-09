import React from 'react';
import classes from './Card.module.css';

const Card = ({ children, cssClasses = '' }) => {
  return (
    <div className={`${classes.card} ${cssClasses} card`}>{children}</div>
  );
};

export default Card;
