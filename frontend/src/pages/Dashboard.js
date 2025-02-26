import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Paper } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import PetCard from '../components/PetCard';
import RewardsBadge from '../components/RewardsBadge';
import MetricsChart from '../components/MetricsChart';

const Dashboard = () => {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [healthData, setHealthData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const petsResponse = await api.getUserPets(user.user_id);
        setPets(petsResponse.data);
        
        // Get health data for the first pet if exists
        if (petsResponse.data.length > 0) {
          const healthResponse = await api.getPetHealthRecords(petsResponse.data[0].id);
          setHealthData(healthResponse.data);
        }
      }
    };
    fetchData();
  }, [user]);

  return (
    <Box sx={{ flexGrow: 1, mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4">Dashboard</Typography>
            <RewardsBadge points={user?.points || 0} />
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Health Metrics Overview</Typography>
            {healthData.length > 0 ? (
              <MetricsChart data={healthData} />
            ) : (
              <Typography color="text.secondary">No health data available</Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Your Pets</Typography>
            {pets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
            {pets.length === 0 && (
              <Typography color="text.secondary">No pets added yet</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;