import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

function RegisterPage({ handleLogin }) {
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
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const registerRequest = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match. Try again');
    }

    const registerDetails = {
      email: email,
      password: password,
      name: name,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(registerDetails),
    };

    const response = await fetch('/admin/auth/register', requestOptions);

    if (response.status === 500) {
      console.log('Not Successful');
    } else if (response.status === 400) {
      alert(
        'An account with the entered email already exists! Please log in to the existing account, or sign up with a different email'
      );
    } else if (response.status === 200) {
      const data = await response.json();
      handleLogin(data.token);
      navigate('/dashboard');
    }
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
      <StyledTextField
        id='standard-basic'
        label='Email'
        variant='standard'
        sx={{ width: '300px' }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <StyledTextField
        id='standard-basic'
        label='Name'
        variant='standard'
        sx={{ width: '300px' }}
        onChange={(e) => setName(e.target.value)}
      />
      <StyledTextField
        id='standard-basic'
        label='Password'
        variant='standard'
        sx={{ width: '300px' }}
        onChange={(e) => setPassword(e.target.value)}
      />
      <StyledTextField
        id='standard-basic'
        label='Confirm Password'
        variant='standard'
        sx={{ width: '300px' }}
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
