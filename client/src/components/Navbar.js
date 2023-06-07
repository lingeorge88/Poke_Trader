import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import Auth from '../../utils/auth';

const Navbar = () => {
    const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    //redirect users back to homepage after logging out //
    window.location.href = '/';
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
         Poke-Trader
        </Typography>
        <Button component={Link} to="/Homepage" color="inherit">Home</Button>
        {Auth.loggedIn() && (
          <Button component={Link} to="/MyCollection" color="inherit">{Auth.getProfile().data.username}'s Collection</Button>
        )}
        {Auth.loggedIn() ? (
          <Button component={Link} onClick={logout} color="inherit">Log Out</Button>
        ) : (
          <Button component={Link} to="/Login" color="inherit">Sign In!</Button>,
          <Button component={Link} to="/Signup" color="inherit">Sign Up!</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;