import axios from 'axios/dist/node/axios.cjs';

// Update the API_URL to your Vercel project's URL
const API_URL = 'http://127.0.0.1:5000';

export const api = {
    // User endpoints
    register: (userData) => axios.post(`${API_URL}/register`, userData),
    login: (credentials) => axios.post(`${API_URL}/login`, credentials),
    
    // Pet endpoints
    createPet: (petData) => axios.post(`${API_URL}/pets`, petData),
    getUserPets: (userId) => axios.get(`${API_URL}/pets/${userId}`),
    
    // Health records endpoints
    createHealthRecord: (data) => axios.post(`${API_URL}/health-records/${data.pet_id}`, data),
    getPetHealthRecords: (petId) => axios.get(`${API_URL}/health-records/${petId}`)
};
