import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderApi } from '../utils/OrderApi';
import { handleLogError } from '../utils/Helpers';
import M from 'materialize-css';
import Button from '../UI/Button';
import Input from '../UI/Input';
import AuthForm from '../UI/AuthForm';
// import classes from './Login.module.css';

function Login() {
  const Auth = useAuth();
  const isLoggedIn = Auth.userIsAuthenticated();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(username && password)) {
      setIsError(true);
      return;
    }

    try {
      const response = await orderApi.authenticate(username, password);
      const { id, name, accessToken } = response.data;
      const role = response.data.roles[0];
      const loginUserName = `${username}`;
      const authenticatedUser = { id, name,loginUserName, role, accessToken };
      M.toast({ html: 'Login successful!', classes: 'green' });
      Auth.userLogin(authenticatedUser);

      setUsername('');
      setPassword('');
      setIsError(false);
    } catch (error) {
      handleLogError(error);
      setIsError(true);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <AuthForm
      handleSubmit={handleSubmit}
      key='login form'
      title='Login'
      error={isError}
      errorMsg='The username or password provided are incorrect!'>
      <Input
        label='Username'
        id='username'
        name='username'
        placeholder='Enter your username'
        value={username}
        onChange={handleInputChange}
      />
      <Input
        label='Password'
        id='password'
        name='password'
        type='password'
        placeholder='Enter your password'
        value={password}
        onChange={handleInputChange}
      />
      <Button type="submit" className='uppercase' handleClick={handleSubmit}>Login</Button>
      <div className="divider" style={{ margin: '2rem 0' }} />
      <p className='center'>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </AuthForm>
  );
}

export default Login;
