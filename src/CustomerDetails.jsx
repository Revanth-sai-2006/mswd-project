import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CustomerDetails = () => {
  const [customers, setCustomers] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve customers and their bookings (this could come from an API in real-world usage)
    const customerData = JSON.parse(localStorage.getItem('users')) || [];
    const bookingsData = JSON.parse(localStorage.getItem('bookings')) || [];

    setCustomers(customerData);
    setUserBookings(bookingsData);
  }, []);

  const handleViewBookings = (userId) => {
    // View the bookings for a specific customer
    const userBookings = userBookings.filter(booking => booking.userId === userId);
    navigate(`/admin/customer/${userId}`, { state: { userBookings } });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Customer Details
      </Typography>

      <Grid container spacing={3}>
        {customers.map((customer) => (
          <Grid item xs={12} sm={6} md={4} key={customer.id}>
            <Paper elevation={3} sx={{ padding: '1.5rem', borderRadius: '12px' }}>
              <Typography variant="h6">{customer.name}</Typography>
              <Typography>Email: {customer.email}</Typography>
              <Typography>Phone: {customer.phone}</Typography>
              <Button
                variant="outlined"
                onClick={() => handleViewBookings(customer.id)}
                sx={{ mt: 2 }}
              >
                View Bookings
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CustomerDetails;
