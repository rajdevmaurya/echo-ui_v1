import React from 'react';
import classes from './AuthForm.module.css';

const AuthForm = ({ handleSubmit, title, error, errorMsg, children }) => {
  return (
    <div className='container'>
      <div className={`${classes['auth-form-container']}`}>
        <form onSubmit={handleSubmit} className={`${classes['auth-form']}`}>
          <h2>{title}</h2>
          {error && (
            <p className={`${classes['error-message']}`}>{errorMsg}</p>
          )}
          {children}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
