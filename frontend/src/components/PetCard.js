import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {pet.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {pet.species} - {pet.breed}
        </Typography>
        <Typography variant="body2">Age: {pet.age} years</Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          onClick={() => navigate(`/health/${pet.id}`)}
          sx={{ color: '#ff9800' }}
        >
          Track Health
        </Button>
      </CardActions>
    </Card>
  );
};

export default PetCard;