import './App.css';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SearchedCard from './pages/SearchedCard';
import Signup from './pages/SignUp';
import Login from './pages/Login';


function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>

      <Route 
      path="/login"
      element={<Login />}
      />

      <Route 
      path="signup"
      element={<Signup />}
      />

      <CssBaseline />
      <SearchedCard />
    </ThemeProvider>
  );
}

export default App;
