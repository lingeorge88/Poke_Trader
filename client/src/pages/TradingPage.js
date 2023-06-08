import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import { Button, Box } from '@mui/material';

const TradingPage = () => {
  const { loading, data } = useQuery(QUERY_USERS);

  if (loading) {
    return <div>Loading...</div>;
  }

  const users = data?.users || [];

  return (
    <div className='container'>
      <h1>🌈 Trading Page 🔄</h1>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <div style={{textAlign:'center'}}>
            <h2> 🙎‍♂️ Fellow Trainers 🙎‍♀️</h2>
          {users.map((user) => (
            <Button key={user._id} variant="contained" color="success" component={Link}
            to={`/users/${user._id}`} sx={{ margin: '12px' }} size="large">
              {user.username}
            </Button>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default TradingPage;