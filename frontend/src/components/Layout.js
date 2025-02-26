import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#ff9800' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        PetMagix Health Hub
                    </Typography>
                    {user ? (
                        <>
                            <Button color="inherit" onClick={() => navigate('/dashboard')}>
                                Dashboard
                            </Button>
                            <Button color="inherit" onClick={() => navigate('/pets')}>
                                My Pets
                            </Button>
                            <Button color="inherit" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => navigate('/login')}>
                                Login
                            </Button>
                            <Button color="inherit" onClick={() => navigate('/register')}>
                                Register
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Container>
                <Box sx={{ mt: 4 }}>{children}</Box>
            </Container>
        </>
    );
};

export default Layout;