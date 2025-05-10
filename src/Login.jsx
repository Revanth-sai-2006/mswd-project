/*import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Simulate login
    const mockUser = {
      email,
      role: email === 'admin@hotel.com' ? 'admin' : 'user',
    };
  
    console.log('Attempting login with:', mockUser); // ✅ Check if user is created correctly
  
    dispatch(login(mockUser));
    console.log('Dispatched login'); // ✅ Check if dispatch was triggered
    setTimeout(() => {
        console.log('Current Redux state:', JSON.parse(localStorage.getItem('persist:root')));
      }, 500);
    console.log('Logging in with:', mockUser);

  
    // Redirect based on role
    if (mockUser.role === 'admin') {
      console.log('Redirecting to admin dashboard');
      navigate('/admin/dashboard');
    } else {
      console.log('Redirecting to user dashboard');
      navigate('/user/dashboard');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          type="submit"
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;*/
