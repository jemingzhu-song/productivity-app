import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function LoginPage({ handleLogin }) {
  const StyledTextField = styled(TextField)({
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
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginRequest = async () => {
    if (!validateEmail(email)) {
      alert('Email is invalid. Enter a valid email');
      return;
    }

    const loginDetails = {
      email: email,
      password: password,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(loginDetails),
    };

    const response = await fetch('/auth/login', requestOptions);

    if (response.status === 500) {
      alert('Incorrect password or email');
    } else if (response.status === 400) {
      alert('Incorrect email or password');
    } else if (response.status === 200) {
      const data = await response.json();
      console.log('Worked: ', data);
      // handleLogin(data.token);
      navigate('/');
    }
  };

  const goToRegisterPage = () => {
    navigate('/register');
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
        Login
      </Typography>
      <TextField
        id='standard-basic'
        label='Email'
        variant='standard'
        sx={{
          width: '300px',
          ':hover': { borderColor: '#000000' },
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
        label='Password'
        variant='standard'
        sx={{
          width: '300px',
          ':hover': { borderColor: '#000000' },
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
      <Button
        color='inherit'
        sx={{ marginTop: '20px', fontSize: '16px', textTransform: 'none' }}
        onClick={loginRequest}
      >
        Login
      </Button>
    </Box>
  );
}

LoginPage.propTypes = {
  handleLogin: PropTypes.func,
};

export default LoginPage;
