import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Typography 
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import PetCard from '../components/PetCard';

const PetList = () => {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPet, setNewPet] = useState({
    name: '',
    species: 'dog',
    breed: '',
    age: ''
  });

  useEffect(() => {
    const fetchPets = async () => {
      if (user) {
        const response = await api.getUserPets(user.user_id);
        setPets(response.data);
      }
    };
    fetchPets();
  }, [user]);

  const handleSubmit = async () => {
    try {
      const petData = { ...newPet, user_id: user.user_id };
      const response = await api.createPet(petData);
      setPets([...pets, response.data]);
      setOpen(false);
      setNewPet({ name: '', species: 'dog', breed: '', age: '' });
    } catch (error) {
      console.error('Error creating pet:', error);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">My Pets</Typography>
        <Button 
          variant="contained" 
          onClick={() => setOpen(true)}
          sx={{ backgroundColor: '#ff9800', '&:hover': { backgroundColor: '#f57c00' } }}
        >
          Add New Pet
        </Button>
      </Box>

      <Grid container spacing={3}>
        {pets.map(pet => (
          <Grid item xs={12} sm={6} md={4} key={pet.id}>
            <PetCard pet={pet} />
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Pet</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Pet Name"
              margin="normal"
              value={newPet.name}
              onChange={(e) => setNewPet({...newPet, name: e.target.value})}
            />
            <TextField
              fullWidth
              select
              label="Species"
              margin="normal"
              value={newPet.species}
              onChange={(e) => setNewPet({...newPet, species: e.target.value})}
            >
              <MenuItem value="dog">Dog</MenuItem>
              <MenuItem value="cat">Cat</MenuItem>
              <MenuItem value="bird">Bird</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Breed"
              margin="normal"
              value={newPet.breed}
              onChange={(e) => setNewPet({...newPet, breed: e.target.value})}
            />
            <TextField
              fullWidth
              label="Age"
              type="number"
              margin="normal"
              value={newPet.age}
              onChange={(e) => setNewPet({...newPet, age: e.target.value})}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            sx={{ color: '#ff9800' }}
          >
            Add Pet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PetList;