import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderApi } from '../utils/OrderApi';
import { handleLogError } from '../utils/Helpers';
import M from 'materialize-css';
import AuthForm from '../UI/AuthForm';
import Button from '../UI/Button';
import Input from '../UI/Input';

function Signup() {
  const Auth = useAuth();
  const isLoggedIn = Auth.userIsAuthenticated();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    mobileNumber: '',
  });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, name, email, mobileNumber } = formData;
    if (!(username && password && name && email && mobileNumber)) {
      setIsError(true);
      setErrorMessage('Please fill out all fields!');
      M.toast({ html: 'All fields are required!', classes: 'red' });
      return;
    }

    try {
      const response = await orderApi.signup(formData);
      const { id, name, accessToken } = response.data;
      const role = response.data.roles[0];
      const authenticatedUser = { id, name, role, accessToken };
      Auth.userLogin(authenticatedUser);
      setIsError(false);
      setErrorMessage('');
      M.toast({ html: 'Sign up successful! Redirecting...', classes: 'green' });

      // Navigate to login after a slight delay
      setTimeout(() => setIsSignedUp(true), 1000);
    } catch (error) {
      handleLogError(error);
      let errorMsg = 'Something went wrong. Please try again.';
      if (error.response?.data) {
        const { message, errors, status } = error.response.data;
        if (status === 409) {
          errorMsg = message ? message : 'You have alrady this account';
        } else if (errors?.length > 0) {
          errorMsg = errors[0].defaultMessage;
        }
      }
      setIsError(true);
      setErrorMessage(errorMsg);
      M.toast({ html: errorMsg, classes: 'red' });
    }
  };

  if (isLoggedIn) return <Navigate to="/" />;
  if (isSignedUp) return <Navigate to="/login" />;

  return (
    <AuthForm
      handleSubmit={handleSubmit}
      key='Create Account form'
      title='Create Account'
      error={isError}
      errorMsg={errorMessage}>
      <Input
        label='Username'
        id='username'
        name='username'
        placeholder='Enter your username'
        value={formData.username}
        onChange={handleInputChange}
      />
      <Input
        type="password"
        label='Password'
        id='password'
        name='password'
        placeholder='Enter your password'
        value={formData.password}
        onChange={handleInputChange}
      />
      <Input
        label='Full Name'
        id='name'
        name='name'
        placeholder='Enter your full name'
        value={formData.name}
        onChange={handleInputChange}
      />
      <Input
        type="email"
        label='Email'
        id='email'
        name='email'
        placeholder='Enter your email'
        value={formData.email}
        onChange={handleInputChange}
      />
      <Input
        label='Mobile Number'
        id='mobileNumber'
        name='mobileNumber'
        placeholder='Enter your mobile number'
        value={formData.mobileNumber}
        onChange={handleInputChange}
      />

      <Button type="submit" className='uppercase' handleClick={handleSubmit}>Sign Up</Button>
      <div className="divider" style={{ margin: '2rem 0' }} />
      <p className='center'>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </AuthForm>
  );
}

export default Signup;
