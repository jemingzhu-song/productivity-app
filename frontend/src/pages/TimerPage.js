import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useState } from 'react';

function TimerPage() {
  const [timer, setTimer] = useState('30:00');
  const [mode, setMode] = useState('study');
  const [timerState, setTimerState] = useState('stopped');

  const changeMode = (event, mode) => {
    setMode(mode);
  };

  const changeTimerState = (event, state) => {
    console.log('Changed: ', state);
    setTimerState(state);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          height: '300px',
          width: '450px',
          borderRadius: '10px',
          margin: '60px 0px',
          backgroundColor: mode === 'study' ? '#F0776A' : mode === 'short' ? '#79BCE9' : '#67DC98',
        }}
      >
        <Box sx={{ marginTop: '15px' }}>
          <ToggleButtonGroup sx={{ height: '30px' }} value={mode} exclusive onChange={changeMode}>
            <ToggleButton sx={{ border: 'none', margin: '0px 5px', textTransform: 'none' }} value='study'>
              <Typography sx={{ color: '#FFFFFF' }}>Study Time</Typography>
            </ToggleButton>
            <ToggleButton sx={{ color: '#FFFFFF', border: 'none', textTransform: 'none' }} value='short'>
              <Typography sx={{ color: '#FFFFFF' }}>Short Break</Typography>
            </ToggleButton>
            <ToggleButton
              sx={{ color: '#FFFFFF', border: 'none', margin: '0px 5px', textTransform: 'none' }}
              value='long'
            >
              <Typography sx={{ color: '#FFFFFF' }}>Long Break</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ marginBottom: '5px' }}>
          <Typography
            sx={{
              fontFamily: 'Nunito',
              fontSize: '120px',
              color: '#FFFFFF',
              fontWeight: 'bold',
            }}
            component='div'
          >
            {timer}
          </Typography>
        </Box>
        <ToggleButtonGroup sx={{ height: '30px' }} value={timerState} exclusive onChange={changeTimerState}>
          {timerState === 'stopped' ? (
            <ToggleButton
              sx={{
                height: '50px',
                width: '200px',
                backgroundColor: '#FFFFFF',
                border: 'none',
                margin: '0px 5px',
                ':hover': { backgroundColor: '#C9C9C9' },
              }}
              value='started'
            >
              <Typography
                sx={{
                  color: mode === 'study' ? '#F0776A' : mode === 'short' ? '#79BCE9' : '#67DC98',
                  fontFamily: 'Nunito',
                  fontWeight: 'bold',
                }}
                variant='h5'
                component='div'
              >
                Start
              </Typography>
            </ToggleButton>
          ) : (
            <ToggleButton
              sx={{
                height: '50px',
                width: '200px',
                backgroundColor: '#FFFFFF',
                border: 'none',
                margin: '0px 5px',
                ':hover': { backgroundColor: '#C9C9C9' },
              }}
              value='stopped'
            >
              <Typography
                sx={{
                  color: mode === 'study' ? '#F0776A' : mode === 'short' ? '#79BCE9' : '#67DC98',
                  fontFamily: 'Nunito',
                  fontWeight: 'bold',
                }}
                variant='h5'
                component='div'
              >
                Stop
              </Typography>
            </ToggleButton>
          )}
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
}

export default TimerPage;
