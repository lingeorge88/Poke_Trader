import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Video from '../assets/Opening.mp4';
// Import the AudioPlayer component;
import logo from '../assets/Logo.png'

function LandingPage() {
    const [videoEnded, setVideoEnded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVideoEnded(true);
        }, 16000); // Set this value to the length of your video in milliseconds
        return () => clearTimeout(timer);
    }, []);

    const handleVideoEnded = () => {
        setVideoEnded(true);
    };

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="center"
                minHeight="100vh"
            >

                <Slide direction="down" in={videoEnded} timeout={3000}>
                    <img src={logo} alt="Logo" style={{ width: '100%', marginBottom: '100px' }} />
                </Slide>

                {!videoEnded && (
                    <video width="165%" height="180%" controls onEnded={handleVideoEnded}>
                        <source src={Video} type="video/mp4" />
                    </video>
                )}

                {videoEnded && (
                    <Slide direction="up" in={videoEnded} timeout={3000}>
                        <Grid container direction="column" spacing={2} alignItems="center">
                            <Grid item>
                                <Button variant="outlined" color="primary" size="large">
                                    Login
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" size="large">
                                    Signup
                                </Button>
                            </Grid>
                        </Grid>
                    </Slide>
                )}

            </Box>
        </Container>
    );
}

export default LandingPage;