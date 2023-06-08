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

function Navbar() {
  const handleLogout = () => {
    authService.logout();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'black' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={Logo} alt="logo" style={{ width: '380px', height: 'auto', marginRight: '16px' }} />
        </div>
        <div>
        <Button component={RouterLink} to="/home" color="inherit" startIcon={<img src={Bulbasaur} alt="bulbasaur" style={{ width: '50px', height: 'auto' }} />}>
            Home
          </Button>
          <Button component={RouterLink} to="/search" color="inherit" startIcon={<img src={Charmander} alt="squirtle" style={{ width: '50px', height: 'auto' }} />}>
            Search
          </Button>
          <Button component={RouterLink} to="/saved" color="inherit" startIcon={<img src={Squirtle} alt="squirtle" style={{ width: '45px', height: 'auto' }} />}>
            My Pokebox
          </Button>
          <Button component={RouterLink} to="/trade" color="inherit"startIcon={<img src={Eevee} alt="squirtle" style={{ width: '45px', height: 'auto' }} />}>
            Trade
          </Button>
          <Button onClick={handleLogout} color="inherit"startIcon={<img src={Pikachu} alt="squirtle" style={{ width: '55px', height: 'auto' }} />}>
            Log Out
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;