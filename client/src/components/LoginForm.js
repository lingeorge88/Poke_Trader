import React, { useState } from 'react';
import { TextField, Button, Grid, Box,} from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';


const Login = () => {
  const navigate = useNavigate();

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);

  // refactored to use GraphQL API instead of RESTful API
  const [login, { loading }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: userFormData,
      });
      
      Auth.login(data.login.token);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
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
            Something went wrong with your login credentials!
          </Alert>
        }
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField 
              label="Email"
              type="text"
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
              disabled={!(userFormData.email && userFormData.password)}
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

export default Login;