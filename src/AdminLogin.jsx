import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Divider,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5173/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      if (user?.role === 'admin') {
        dispatch(login({ ...user, token }));
        navigate('/admin/dashboard');
      } else {
        alert('Access denied. Not an admin.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials or server error.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}
          >
            Admin Login
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ color: 'text.secondary', mb: 3 }}
          >
            Login with admin credentials
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <TextField
              label="Email"
              type="email"
              value={email}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 1,
                py: 1.5,
                fontWeight: 'bold',
                borderRadius: '12px',
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              }}
            >
              Login as Admin
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default AdminLogin;
