import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import { Button, Box, } from '@mui/material';
import Brendan from '../assets/Brendan_OD.png';
import May from '../assets/May_OD.png'

const TradingPage = () => {
  const { loading, data } = useQuery(QUERY_USERS);

  if (loading) {
    return <div>Loading...</div>;
  }

  const users = data?.users || [];

  return (
    <div className='container'>
      <h1>🌈 Trainer Plaza 🔄</h1>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <div style={{ textAlign: 'center' }}>
        <Box display="flex" alignItems="center" mb={2}>
            <img src={Brendan} alt="Brendan" style={{ width: '60px', height: 'auto', marginRight: '8px' }} />
            <h2 style={{ margin: 0, padding: 0 }}>Fellow Trainers</h2>
            <img src={May} alt="May" style={{ width: '60px', height: 'auto', marginLeft: '8px' }} />
          </Box>
          {users.map((user) => (
            <Button
              key={user._id}
              variant="contained"
              color="success"
              component={Link}
              to={`/users/${user._id}`}
              sx={{ margin: '12px' }}
              size="large"
            >
              {user.username}
            </Button>
          ))}
        </div>
      </Box>
    </div>
  );
};


export default TradingPage;