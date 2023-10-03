import './App.css';
import React, {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
// import SearchedCard from './pages/SearchedCard';
// import MyCollection from './pages/MyCollection';
// import LandingPage from './pages/LandingPage';
import { setContext } from '@apollo/client/link/context';
// import HomePage from './pages/Homepage';
// import TradingPage from './pages/TradingPage';
// import SingleUserPage from './pages/SingleUser';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const SearchedCard = lazy(() => import('./pages/SearchedCard'));
const MyCollection = lazy(() => import('./pages/MyCollection'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const HomePage = lazy(() => import('./pages/Homepage'));
const TradingPage = lazy(() => import('./pages/TradingPage'));
const SingleUserPage =lazy(() => import('./pages/SingleUser'));

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {

  const token = localStorage.getItem('id_token');
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
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/*"
                element={
                  <React.Fragment>
                    <Navbar />
                    <Routes>
                      <Route path="/home" element={<HomePage />} />
                      <Route path="/search" element={<SearchedCard />} />
                      <Route path="/saved" element={<MyCollection />} />
                      <Route path="/trade" element={<TradingPage />} />
                      <Route path="/users/:userId" element={<SingleUserPage />} />
                    </Routes>
                    <Footer />
                  </React.Fragment>
                }
              />
            </Routes>
          </React.Suspense>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
);
}

export default App;