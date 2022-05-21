import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function RegisterPage({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const registerRequest = async () => {
    if (firstName.length < 1 || firstName.length > 51) {
      alert('First Name is invalid. Must be between 1 and 50 characters inclusive');
      return;
    }
    if (lastName.length < 1 || lastName.length > 51) {
      alert('Last Name is invalid. Must be between 1 and 50 characters inclusive');
      return;
    }
    if (!validateEmail(email)) {
      alert('Email is invalid. Enter a valid email');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match. Try again');
      return;
    }
    const registerDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(registerDetails),
    };

    const response = await fetch('/auth/register', requestOptions);

    if (response.status === 500) {
      alert('Backend Error - Email Already Exists');
    } else if (response.status === 400) {
      alert(
        'An account with the entered email already exists! Please log in to the existing account, or sign up with a different email'
      );
    } else if (response.status === 200) {
      const data = await response.json();
      handleLogin(data.token);
      navigate('/');
    }
  };

  // Helper Functions
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <Box
      sx={{
        minWidth: 300,
        margin: '50px 10%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='h5' color='#000000'>
        Register
      </Typography>
      <TextField
        id='standard-basic'
        label='Email'
        variant='standard'
        sx={{
          width: '300px',
          '& label.Mui-focused': {
            color: '#000000',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#000000',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#000000',
            },
            '&:hover fieldset': {
              borderColor: '#000000',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000000',
            },
          },
        }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id='standard-basic'
        label='First Name'
        variant='standard'
        sx={{
          width: '300px',
          '& label.Mui-focused': {
            color: '#000000',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#000000',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#000000',
            },
            '&:hover fieldset': {
              borderColor: '#000000',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000000',
            },
          },
        }}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        id='standard-basic'
        label='Last Name'
        variant='standard'
        sx={{
          width: '300px',
          '& label.Mui-focused': {
            color: '#000000',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#000000',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#000000',
            },
            '&:hover fieldset': {
              borderColor: '#000000',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000000',
            },
          },
        }}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        id='standard-basic'
        label='Password'
        variant='standard'
        sx={{
          width: '300px',
          '& label.Mui-focused': {
            color: '#000000',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#000000',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#000000',
            },
            '&:hover fieldset': {
              borderColor: '#000000',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000000',
            },
          },
        }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        id='standard-basic'
        label='Confirm Password'
        variant='standard'
        sx={{
          width: '300px',
          '& label.Mui-focused': {
            color: '#000000',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#000000',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#000000',
            },
            '&:hover fieldset': {
              borderColor: '#000000',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000000',
            },
          },
        }}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        color='inherit'
        sx={{ marginTop: '20px', fontSize: '16px', textTransform: 'none' }}
        onClick={registerRequest}
      >
        Register
      </Button>
    </Box>
  );
}

RegisterPage.propTypes = {
  handleLogin: PropTypes.func,
};

export default RegisterPage;
