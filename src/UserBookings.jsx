import React, { useState, useEffect } from 'react';
import {
  Container, Typography, List, ListItem, ListItemText, IconButton, Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Mock customer bookings data for demonstration
const mockBookings = [
  { id: 1, room: 'Deluxe Room', checkIn: '2025-05-01', checkOut: '2025-05-03' },
  { id: 2, room: 'Suite', checkIn: '2025-06-10', checkOut: '2025-06-12' },
];

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);

  // Load bookings from localStorage or use mock data if not available
  useEffect(() => {
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      setBookings(mockBookings); // Set mock bookings if no saved data
    }
  }, []);

  // Update localStorage whenever bookings are updated
  const updateLocalStorage = (newBookings) => {
    localStorage.setItem('bookings', JSON.stringify(newBookings));
  };

  const handleCancel = (id) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
    updateLocalStorage(updatedBookings); // Save to localStorage
    alert('Booking cancelled');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Bookings</Typography>
      <List>
        {bookings.map((booking) => (
          <React.Fragment key={booking.id}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={() => handleCancel(booking.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={booking.room}
                secondary={`Check-in: ${booking.checkIn} | Check-out: ${booking.checkOut}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default UserBookings;
