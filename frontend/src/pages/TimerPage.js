import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import Countdown, { zeroPad, calcTimeDelta } from 'react-countdown';

function TimerPage() {
  // React Countdown Timer Package: https://github.com/ndresx/react-countdown
  // Default Timer is set to 30 minutes
  const [timer, setTimer] = useState(Date.now() + 1000 * 10);
  const [timerStoppedTime, setTimerStoppedTime] = useState(null);
  const [timerStartedTime, setTimerStartedTime] = useState(null);
  const [timerTotalPausedTime, setTotalPausedTime] = useState(0);
  const [timerTotalTimeElapsed, setTotalTimeElapsed] = useState(0);
  const [mode, setMode] = useState('study');
  const [timerState, setTimerState] = useState('stopped');
  const countdownRef = useRef();

  const changeMode = (event, mode) => {
    setMode(mode);
  };

  const changeTimerState = (event, state) => {
    console.log('Changed: ', state);
    setTimerState(state);
  };

  const startTimer = () => {
    countdownRef.current.api.start();
    setTimerStartedTime(Date.now());
  };

  const stopTimer = () => {
    countdownRef.current.api.pause();
    let now = Date.now();
    console.log('Timer: ', timer);
    if (timerStoppedTime === null) {
      // console.log('Time Left: ', (timer - now) / 1000);
      // console.log('Time Elapsed: ', (now - timerStartedTime) / 1000);
      let elapsed = now - timerStartedTime;
      setTotalTimeElapsed(elapsed);
    } else {
      let pausedTime = timerStartedTime - timerStoppedTime + timerTotalPausedTime;
      let total = timerTotalPausedTime + (timerStartedTime - timerStoppedTime);
      setTotalPausedTime(total);
      // console.log('Time Left Again: ', (timer - now + pausedTime) / 1000);
      // console.log('Time Elapsed: ', (now - timerStartedTime + timerTotalTimeElapsed) / 1000);
      let elapsed = now - timerStartedTime + timerTotalTimeElapsed;
      setTotalTimeElapsed(elapsed);
    }
    setTimerStoppedTime(now);
    updateUserStudyTime();
  };

  const updateUserStudyTime = () => {};

  const Completionist = () => (
    <span style={{ fontFamily: 'Nunito', fontSize: '60px', color: '#FFFFFF', fontWeight: 'bold' }}>
      Times Up!
    </span>
  );
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
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
            <Countdown
              ref={countdownRef}
              date={timer}
              autoStart={false}
              controlled={false}
              renderer={renderer}
            />
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
              onClick={startTimer}
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
              onClick={stopTimer}
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
