import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

const Signup = () => {
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { loading }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: userFormData,
      });
      
      Auth.login(data.addUser.token);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <form noValidate onSubmit={handleFormSubmit}>
        {showAlert && 
          <Alert severity="error" onClose={() => setShowAlert(false)}>
            Something went wrong with your signup!
          </Alert>
        }
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField 
              label="Username"
              type="text"
              name="username"
              value={userFormData.username}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item>
            <TextField 
              label="Email"
              type="email"
              name="email"
              value={userFormData.email}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={userFormData.password}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item>
            <Button
              disabled={!(userFormData.username && userFormData.email && userFormData.password)}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Signup;