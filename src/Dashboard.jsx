import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Paper, Typography, Box, Card, CardContent } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PeopleIcon from '@mui/icons-material/People';

const availableRoomTypes = [
  { type: 'Deluxe Room', description: 'A luxurious room with modern amenities.', price: 120 },
  { type: 'Suite', description: 'A spacious suite with a separate living area.', price: 200 },
  { type: 'Standard Room', description: 'A comfortable room for a budget-friendly stay.', price: 80 },
  { type: 'Penthouse', description: 'An elegant penthouse with an amazing city view.', price: 350 },
];

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const cardStyle = {
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '12px',
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.email} ({user?.role})
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        This is your main dashboard page.
      </Typography>

      {/* Dashboard Stats */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ ...cardStyle, backgroundColor: '#e3f2fd' }}>
            <div>
              <Typography variant="h6">Total Rooms</Typography>
              <Typography variant="h4">{user?.role === 'admin' ? 45 : 13}</Typography>
            </div>
            <HotelIcon fontSize="large" color="primary" />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ ...cardStyle, backgroundColor: '#fce4ec' }}>
            <div>
              <Typography variant="h6">Bookings</Typography>
              <Typography variant="h4">{user?.role === 'admin' ? 123 : 5}</Typography>
            </div>
            <BookOnlineIcon fontSize="large" color="secondary" />
          </Paper>
        </Grid>

        {user?.role === 'admin' && (
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ ...cardStyle, backgroundColor: '#e8f5e9' }}>
              <div>
                <Typography variant="h6">Users</Typography>
                <Typography variant="h4">78</Typography>
              </div>
              <PeopleIcon fontSize="large" color="success" />
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Available Room Types Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, textAlign: 'center', mb: 4 }}>
          Available Room Types
        </Typography>
        <Grid container spacing={3}>
          {availableRoomTypes.map((room) => (
            <Grid item xs={12} sm={6} md={3} key={room.type}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  '&:hover': {
                    animation: 'shake 0.6s ease-in-out',
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 600,
                      color: '#1976d2',
                    }}
                  >
                    {room.type}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '1rem',
                      color: '#555',
                    }}
                  >
                    {room.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Open Sans, sans-serif',
                      fontWeight: 600,
                      color: '#388e3c',
                    }}
                  >
                    ${room.price} /night
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Adding shake animation via CSS */}
      <style>
        {`
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            50% { transform: translateX(10px); }
            75% { transform: translateX(-10px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </Container>
  );
};

export default Dashboard;
