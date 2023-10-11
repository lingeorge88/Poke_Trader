import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Video from '../assets/Opening.mp4';
import logo from '../assets/Logo.png';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Lugia from '../assets/lugia.png';
import Hooh from '../assets/hooh.png';
import Pikachu from '../assets/pikachu-cap.png';

function LandingPage() {
    const [videoEnded, setVideoEnded] = useState(false);
    const [playVideo, setPlayVideo] = useState(false);
    const [showForm, setShowForm] = useState(null);

    useEffect(() => {
        let timer;
        if (playVideo) {
            timer = setTimeout(() => {
                setVideoEnded(true);
            }, 15000); 
        }
        return () => clearTimeout(timer);
    }, [playVideo]);
    const handleVideoEnded = () => {
        setVideoEnded(true);
    };

    const renderForm = () => {
        if(showForm === 'login') {
            return <LoginForm />
        } else if(showForm === 'signup') {
            return <SignupForm />
        }
    }

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="center"
                minHeight="100vh"
            >

                <Slide direction="down" in={true} timeout={3000}>
                    <img src={logo} alt="Logo" style={{ width: '100%', marginBottom: '100px' }} />
                </Slide>
                    {(!playVideo || videoEnded) && (
                    <Slide direction="up" in={true} timeout={3000}>
                        <Grid container direction="column" spacing={2} alignItems="center">
                            <Grid item>
                                <Button 
                                  variant="outlined" 
                                  color="primary" 
                                  size="large"
                                  onClick={() => setShowForm('login')} startIcon={<img src={Hooh} alt="ho-oh" style={{ width: '50px', height: 'auto' }} />}
                                >
                                    Login
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button 
                                  variant="contained" 
                                  color="primary" 
                                  size="large"
                                  onClick={() => setShowForm('signup')} startIcon={<img src={Lugia} alt="lugia" style={{ width: '50px', height: 'auto' }} />}
                                >
                                    Signup
                                </Button>
                            </Grid>
                            <Grid item>
                            <Button variant="contained" color="warning" size="large" onClick={() => {
                                setPlayVideo(true);
                                setVideoEnded(false);}} startIcon={<img src={Pikachu} alt="Pikachu" style={{ width: '50px', height: 'auto', verticalAlign: 'middle'}} />}>
                            Surprise!
                        </Button>
                        </Grid>
                        </Grid>
                    </Slide>
                    )}
                {playVideo && !videoEnded && (
                    <video width="165%" height="180%" controls onEnded={handleVideoEnded}>
                        <source src={Video} type="video/mp4" />
                    </video>
                )}
             {(!playVideo || videoEnded) && <Box mt={4}>{renderForm()}</Box>}
            </Box>
        </Container>
    );
}

export default LandingPage;