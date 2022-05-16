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
          margin: '60px 0px',
          backgroundColor: '#DCD8CB',
        }}
      >
        <Box sx={{ marginTop: '15px' }}>
          <ToggleButtonGroup sx={{ height: '30px' }} value={mode} exclusive onChange={changeMode}>
            <ToggleButton sx={{ border: 'none', margin: '0px 5px', textTransform: 'none' }} value='study'>
              Study Time
            </ToggleButton>
            <ToggleButton sx={{ border: 'none', margin: '0px 5px', textTransform: 'none' }} value='short'>
              Short Break
            </ToggleButton>
            <ToggleButton sx={{ border: 'none', margin: '0px 5px', textTransform: 'none' }} value='long'>
              Long Break
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box>
          <Typography
            sx={{ fontFamily: 'Nunito', fontSize: '120px', color: '#000000', fontWeight: 'bold' }}
            component='div'
          >
            {timer}
          </Typography>
        </Box>
        <ToggleButtonGroup sx={{ height: '30px' }} value={timerState} exclusive onChange={changeTimerState}>
          {timerState === 'stopped' ? (
            <ToggleButton sx={{ border: 'none', margin: '0px 5px' }} value='started'>
              <Typography sx={{ fontFamily: 'Nunito', fontWeight: 'bold' }} variant='h6' component='div'>
                Start
              </Typography>
            </ToggleButton>
          ) : (
            <ToggleButton sx={{ border: 'none', margin: '0px 5px' }} value='stopped'>
              <Typography sx={{ fontFamily: 'Nunito', fontWeight: 'bold' }} variant='h6' component='div'>
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
