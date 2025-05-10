import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import UserLogin from './UserLogin';
import AdminLogin from './AdminLogin';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Rooms from './Rooms';
import BrowseRooms from './BrowseRooms';
import RoomDetails from './RoomDetails';
import UserBookings from './UserBookings';
import Navbar from './Navbar';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const user = useSelector((state) => state.auth.user);  // Get the logged-in user

  // Determine the background image based on user login state
  const backgroundStyle = {
    backgroundImage: user
      ? user.role === 'admin'
        ? 'url(https://static.vecteezy.com/system/resources/thumbnails/046/748/366/small_2x/christmas-frame-banner-with-sparkling-light-garland-and-copy-space-for-text-on-blue-background-photo.jpg)'  // Admin background
        : 'url(https://cdn.magicdecor.in/com/2024/11/05150322/Chinese-Style-Blue-Ink-Landscape-Painting-Wallpaper-Mural-M-710x450.jpg)'  // User background
      : 'url(https://t4.ftcdn.net/jpg/08/85/67/85/360_F_885678552_XTwSeyXIU7c8c7LodX9I0k1CmIT736DC.jpg)',  // Default background when no one is logged in
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Ensures the background covers the full viewport
  };

  return (
    <div style={backgroundStyle}>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/rooms" element={<BrowseRooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />

        {/* User Routes */}
        <Route path="/user/dashboard" element={
          <PrivateRoute roles={['user']}>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/my-bookings" element={
          <PrivateRoute roles={['user']}>
            <UserBookings />
          </PrivateRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <PrivateRoute roles={['admin']}>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/admin/rooms" element={
          <PrivateRoute roles={['admin']}>
            <Rooms />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
