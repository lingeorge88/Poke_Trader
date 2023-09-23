import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import authService from '../utils/auth';
import Logo from '../assets/Logo.png';
import Bulbasaur from '../assets/bulbasaur.png';
import Charmander from '../assets/charmander.png';
import Squirtle from '../assets/Squirtle.png';
import Pikachu from '../assets/pikachu.png';
import Eevee from '../assets/eevee.png';
import { useMediaQuery, useTheme } from '@mui/material';


function Navbar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const handleLogout = () => {
    authService.logout();
  };

  const smallStyles = {
    fontSize: isSmallScreen ? '0.5rem' : '1rem',
    padding: isSmallScreen ? '5px' : '12px',
    margin: isSmallScreen ? '2px' : '10px',
    width: isSmallScreen ? '50px' : '55px',
    height: 'auto'
};
  return (
    <AppBar position="static" sx={{ bgcolor: 'black' }}>
            <Toolbar sx={{ justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap', }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={Logo} alt="logo" style={{ width: '380px', height: 'auto', marginRight: '16px' }} />
                </div>
                <div>
                    <Button component={RouterLink} to="/home" color="inherit" startIcon={<img src={Bulbasaur} alt="bulbasaur" style={{ ...smallStyles }} />}>
                        Home
                    </Button>
                    <Button component={RouterLink} to="/search" color="inherit" startIcon={<img src={Charmander} alt="charmander" style={{ ...smallStyles }} />}>
                        Search
                    </Button>
                    <Button component={RouterLink} to="/saved" color="inherit" startIcon={<img src={Squirtle} alt="squirtle" style={{ ...smallStyles }} />}>
                        My Pokébox
                    </Button>
                    <Button component={RouterLink} to="/trade" color="inherit" startIcon={<img src={Eevee} alt="eevee" style={{ ...smallStyles }} />}>
                        Trade
                    </Button>
                    <Button onClick={handleLogout} color="inherit" startIcon={<img src={Pikachu} alt="pikachu" style={{ ...smallStyles }} />}>
                        Log Out
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
  );
}

export default Navbar;