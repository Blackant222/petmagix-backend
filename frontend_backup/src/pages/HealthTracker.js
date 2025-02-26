import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { api } from '../services/api';
import HealthForm from '../components/HealthForm';
import MetricsChart from '../components/MetricsChart';

const HealthTracker = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);
  const [aiInsights, setAiInsights] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const records = await api.getPetHealthRecords(petId);
        setHealthRecords(records.data);
      } catch (error) {
        console.error('Error fetching health records:', error);
      }
    };
    fetchData();
  }, [petId]);

  const handleHealthSubmit = async (formData) => {
    try {
      const response = await api.createHealthRecord({ ...formData, pet_id: petId });
      setHealthRecords([response.data.record, ...healthRecords]);
      setAiInsights(response.data.insights);
    } catch (error) {
      console.error('Error saving health record:', error);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Health Tracker</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Add Health Record</Typography>
            <HealthForm onSubmit={handleHealthSubmit} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>AI Insights</Typography>
            <Typography>{aiInsights || 'No insights available yet'}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Health History</Typography>
            {healthRecords.length > 0 ? (
              <MetricsChart data={healthRecords} />
            ) : (
              <Typography color="text.secondary">No health records available</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HealthTracker;