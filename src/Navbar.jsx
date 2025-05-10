import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/authSlice';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        >
          <HomeFilledIcon sx={{ mr: 1 }} />
          MyNest
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to="/rooms">Browse Rooms</Button>

          {/* Conditional Rendering based on user role */}
          {!user ? (
            <>
              <Button color="inherit" component={Link} to="/login">User Login</Button>
              <Button color="inherit" component={Link} to="/admin/login">Admin Login</Button>
              <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </>
          ) : (
            <>
              {user.role === 'admin' && (
                <>
                  <Button color="inherit" component={Link} to="/admin/dashboard">Dashboard</Button>
                  <Button color="inherit" component={Link} to="/admin/customers">Customer Details</Button> {/* ✅ Admin can view customers */}
                </>
              )}
              {user.role === 'user' && (
                <>
                  <Button color="inherit" component={Link} to="/user/dashboard">Dashboard</Button>
                  <Button color="inherit" component={Link} to="/my-bookings">My Bookings</Button>
                </>
              )}
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
