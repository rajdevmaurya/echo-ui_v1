import React from 'react';
import classes from './Input.module.css';

const Input = ({ label, id, type = 'text', cssClasses = '', fieldErrorMsg, ...rest }) => {
  return (
    <div className={`${classes['input-group']} ${cssClasses}`}>
      {label && <label htmlFor={id}>{label}</label>}
      {type === 'textarea' ? (
        <>
          <textarea id={id} cols='10' {...rest}></textarea>
          <span className="helper-text" data-error={fieldErrorMsg}></span>
        </>
      ) : (
        <>
          <input id={id} type={type} {...rest} />
          <span className="helper-text" data-error={fieldErrorMsg}></span>
        </>
      )}
    </div>
  );
};

export default Input;
