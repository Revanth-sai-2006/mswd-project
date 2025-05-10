import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const mockRooms = [
  { id: 1, name: 'Deluxe Room', type: 'Deluxe', price: 120, image: 'https://images.unsplash.com/photo-1680503146476-abb8c752e1f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsdXhlJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 2, name: 'Suite', type: 'Suite', price: 200, image: 'https://media.istockphoto.com/id/184609057/photo/luxury-hotel-room.webp?a=1&b=1&s=612x612&w=0&k=20&c=Y_mQGHGC606sR11-Wuf5PHwbQnKKLHSBWCEesYA2Pmk=' },
  { id: 3, name: 'Standard Room', type: 'Standard', price: 80, image: 'https://images.unsplash.com/photo-1535666183084-5822cdd07f32?w=600&auto=format&fit=crop&q=60' },
  { id: 4, name: 'Penthouse', type: 'Penthouse', price: 350, image: 'https://images.unsplash.com/photo-1517588017620-1acfc22721b3?w=600&auto=format&fit=crop&q=60' },
];

const BrowseRooms = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Rooms
      </Typography>
      <Grid container spacing={3}>
        {mockRooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardMedia
                component="img"
                height="200"
                image={room.image}
                alt={room.name}
                sx={{
                  objectFit: 'cover',
                  borderBottom: '2px solid #ccc',
                }}
                onError={(e) => { // Add error handling for image loading issues
                  e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available'; // Fallback image
                }}
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Typography variant="h6">{room.name}</Typography>
                <Typography variant="body2">Type: {room.type}</Typography>
                <Typography variant="body2">Price: ${room.price}/night</Typography>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/rooms/${room.id}`)}
                  sx={{ mt: 1 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BrowseRooms;
