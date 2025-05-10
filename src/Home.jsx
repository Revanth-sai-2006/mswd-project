import React from 'react';
import { Container, Typography } from '@mui/material';

const Home = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Welcome to Hotel Management System</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Book luxurious rooms and manage your bookings seamlessly.
      </Typography>
    </Container>
  );
};

export default Home;
