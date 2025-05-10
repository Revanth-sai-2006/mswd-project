import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice';
import { motion } from 'framer-motion';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // default role
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Full Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!phone) newErrors.phone = "Phone number is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmpassword) newErrors.confirmpassword = "Please confirm your password";
    if (password !== confirmpassword) newErrors.confirmpassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5173/users', {
        name, email, phone, password, confirmpassword, role
      });

      const { token, user } = response.data;

      if (user?.role === 'user') {
        dispatch(login({ ...user, token }));
        navigate('/user/dashboard');
      } else {
        alert('Signup failed or invalid role.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Paper elevation={4} sx={{ p: 4, borderRadius: '16px' }}>
          <Typography variant="h5" gutterBottom align="center">
            Create an Account
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              label="Full Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              label="Phone"
              type="tel"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={Boolean(errors.confirmpassword)}
              helperText={errors.confirmpassword}
            />
            {/* Hidden input or dropdown if needed */}
            <TextField
              label="Role"
              select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
              disabled
            >
              <MenuItem value="user">User</MenuItem>
            </TextField>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ py: 1.5, borderRadius: '10px' }}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Signup;
