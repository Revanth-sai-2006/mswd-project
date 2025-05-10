import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container, Typography, Card, CardMedia, CardContent,
  TextField, Button, Box
} from '@mui/material';

const mockRooms = [
  { id: 1, name: 'Deluxe Room', type: 'Deluxe', price: 120, image: 'https://images.unsplash.com/photo-1680503146476-abb8c752e1f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsdXhlJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 2, name: 'Suite', type: 'Suite', price: 200, image: 'https://media.istockphoto.com/id/184609057/photo/luxury-hotel-room.webp?a=1&b=1&s=612x612&w=0&k=20&c=Y_mQGHGC606sR11-Wuf5PHwbQnKKLHSBWCEesYA2Pmk=' },
  { id: 3, name: 'Standard Room', type: 'Standard', price: 80, image: 'https://images.unsplash.com/photo-1648383228240-6ed939727ad6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, name: 'Penthouse', type: 'Penthouse', price: 350, image: 'https://media.istockphoto.com/id/1127417417/photo/modern-luxurious-bedroom-in-a-seaside-villa-with-black-stone-wall.webp?a=1&b=1&s=612x612&w=0&k=20&c=-CV7mUDve-tGI8T_wEyKFVUK-Al0hpys_NbH4HPuhuQ=' },
];

const RoomDetails = () => {
  const { id } = useParams();
  const room = mockRooms.find((r) => r.id === parseInt(id));

  const [bookingData, setBookingData] = useState({ checkIn: '', checkOut: '', guests: 1 });
  const [billData, setBillData] = useState(null); // State for the bill

  const user = useSelector((state) => state.auth.user);
  const isUser = user && user.role === 'user';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleBooking = () => {
    // Validate the booking data
    if (!bookingData.checkIn || !bookingData.checkOut || bookingData.guests <= 0) {
      alert("Please fill in all fields correctly.");
      return;
    }

    // Calculate total nights
    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);
    const timeDifference = checkOutDate - checkInDate;
    const totalNights = timeDifference / (1000 * 3600 * 24); // Convert ms to days

    if (totalNights <= 0) {
      alert("Check-out date must be later than check-in date.");
      return;
    }

    // Calculate total price
    const totalPrice = totalNights * room.price;

    const newBooking = {
      id: Date.now(),
      room: room.name,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
      totalNights,
      totalPrice,
    };

    // Update the billData state with booking details
    setBillData(newBooking);
    console.log("Booking Data Updated: ", newBooking); // Debugging line

    // Show confirmation message
    alert(`Booking confirmed for ${room.name} from ${bookingData.checkIn} to ${bookingData.checkOut} for ${bookingData.guests} guests!`);
  };

  if (!room) {
    return <Navigate to="/rooms" />;
  }

  // If the user is not logged in as a 'user', we don't show the booking option
  if (!isUser) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" color="error">
          You need to be logged in as a user to book a room.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={room.image}
          alt={room.name}
        />
        <CardContent>
          <Typography variant="h5">{room.name}</Typography>
          <Typography>Type: {room.type}</Typography>
          <Typography>Price: ${room.price}/night</Typography>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Book this room</Typography>
            <TextField
              name="checkIn"
              label="Check-In Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
              value={bookingData.checkIn}
              onChange={handleChange}
            />
            <TextField
              name="checkOut"
              label="Check-Out Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
              value={bookingData.checkOut}
              onChange={handleChange}
            />
            <TextField
              name="guests"
              label="Number of Guests"
              type="number"
              fullWidth
              margin="normal"
              value={bookingData.guests}
              onChange={handleChange}
            />
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleBooking}>
              Confirm Booking
            </Button>
          </Box>

          {/* Bill Section */}
          {billData && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Booking Confirmation</Typography>
              <Typography>Room: {billData.room}</Typography>
              <Typography>Check-In: {billData.checkIn}</Typography>
              <Typography>Check-Out: {billData.checkOut}</Typography>
              <Typography>Guests: {billData.guests}</Typography>
              <Typography>Total Nights: {billData.totalNights}</Typography>
              <Typography>Total Price: ${billData.totalPrice}</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default RoomDetails;
