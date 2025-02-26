import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Register = () => {
  const [userData, setUserData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await api.register({ email: userData.email, password: userData.password });
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Email might already be in use.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Register</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={userData.email}
        onChange={(e) => setUserData({...userData, email: e.target.value})}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={userData.password}
        onChange={(e) => setUserData({...userData, password: e.target.value})}
      />
      <TextField
        fullWidth
        label="Confirm Password"
        type="password"
        margin="normal"
        value={userData.confirmPassword}
        onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
      />
      <Button 
        type="submit" 
        fullWidth 
        variant="contained"
        sx={{ 
          mt: 3, 
          backgroundColor: '#ff9800',
          '&:hover': { backgroundColor: '#f57c00' }
        }}
      >
        Register
      </Button>
    </Box>
  );
};

export default Register;