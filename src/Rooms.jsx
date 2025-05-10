import React, { useState } from 'react';
import {
  Container, Typography, TextField, Button, Box, Table, TableHead,
  TableRow, TableCell, TableBody, Switch, Dialog, DialogTitle, DialogContent,
  DialogActions
} from '@mui/material';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', price: '', type: '', image: '', status: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAddRoom = () => {
    setRooms([...rooms, { ...form, id: Date.now() }]);
    setOpen(false);
    setForm({ name: '', description: '', price: '', type: '', image: '', status: true });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Room Management</Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>Add Room</Button>

      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell>{room.name}</TableCell>
              <TableCell>{room.type}</TableCell>
              <TableCell>${room.price}</TableCell>
              <TableCell>
                <Switch
                  checked={room.status}
                  onChange={() => {
                    setRooms(rooms.map(r => r.id === room.id ? { ...r, status: !r.status } : r));
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Room</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              label="Room Name"
              name="name"
              fullWidth
              value={form.name}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              value={form.description}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              label="Price"
              name="price"
              fullWidth
              type="number"
              value={form.price}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              label="Type"
              name="type"
              fullWidth
              value={form.type}
              onChange={handleChange}
              margin="dense"
            />
            <TextField
              label="Image URL"
              name="image"
              fullWidth
              value={form.image}
              onChange={handleChange}
              margin="dense"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddRoom} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Rooms;
