import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import SearchedCard from './pages/SearchedCard';
import MyCollection from './pages/MyCollection';
import LandingPage from './pages/LandingPage';
import { setContext } from '@apollo/client/link/context';
import HomePage from './pages/Homepage';


const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  
  return (
    <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element = {<HomePage/>} />
          <Route path="/search" element={<SearchedCard />} />
          <Route path="/saved" element={<MyCollection />} />
        </Routes>
      </Router>
    </ThemeProvider>
     </ApolloProvider>
  );
}

export default App;