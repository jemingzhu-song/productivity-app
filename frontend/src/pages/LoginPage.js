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

    const response = await fetch('/admin/auth/login', requestOptions);

    if (response.status === 500) {
      console.log('Not Successful');
    } else if (response.status === 400) {
      alert('Incorrect email or password');
    } else if (response.status === 200) {
      const data = await response.json();
      handleLogin(data.token);
      navigate('/dashboard');
    }
  };

  const goToRegisterPage = () => {
    navigate('/register');
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
      <StyledTextField
        id='standard-basic'
        label='Email'
        variant='standard'
        sx={{ width: '300px', ':hover': { borderColor: '#000000' } }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <StyledTextField
        id='standard-basic'
        label='Password'
        variant='standard'
        sx={{ width: '300px' }}
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
