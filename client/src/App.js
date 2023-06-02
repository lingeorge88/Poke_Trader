import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import SearchedCard from './pages/SearchedCard';

import LandingPage from './pages/LandingPage';
import { setContext } from '@apollo/client/link/context';
import HomePage from './pages/Homepage';


const httpLink = createHttpLink({
  uri: '/graphql',
});
function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  // const client = new ApolloClient({
  //   link: authLink.concat(httpLink),
  //   cache: new InMemoryCache(),
  // });
  return (
    // <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> */}
          <Route path="/home" element = {<HomePage/>} />
          <Route path="/search" element={<SearchedCard />} />
          {/* Add as many routes as needed */}
        </Routes>
      </Router>
    </ThemeProvider>
    // </ApolloProvider>
  );
}

export default App;