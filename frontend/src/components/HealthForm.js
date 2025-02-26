import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Grid } from '@mui/material';

const HealthForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    weight: '',
    activity_level: '',
    diet_notes: '',
    hydration: '',
    symptoms: '',
    behavioral_notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      weight: '',
      activity_level: '',
      diet_notes: '',
      hydration: '',
      symptoms: '',
      behavioral_notes: ''
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Weight (kg)"
            type="number"
            value={formData.weight}
            onChange={(e) => setFormData({...formData, weight: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Activity Level"
            value={formData.activity_level}
            onChange={(e) => setFormData({...formData, activity_level: e.target.value})}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="moderate">Moderate</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Diet Notes"
            multiline
            rows={2}
            value={formData.diet_notes}
            onChange={(e) => setFormData({...formData, diet_notes: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Hydration (ml)"
            type="number"
            value={formData.hydration}
            onChange={(e) => setFormData({...formData, hydration: e.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth
            sx={{ backgroundColor: '#ff9800', '&:hover': { backgroundColor: '#f57c00' } }}
          >
            Save Health Record
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HealthForm;