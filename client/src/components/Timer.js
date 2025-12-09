import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import {useContext, useState, useEffect} from "react";
import SettingsContext from "./SettingsContext";
import StopButton from './StopButton';
import axios from '../utils/axios';
import {useAuth} from '../contexts/AuthContext';
import React from 'react';
import AudioPlayer from './Alert';
import Chart from './Chart';



 
const red = '#f54e4e';
const green = '#4aec8c';
const blue = '#2b78e4'

export const Timer = (props) => {

const audioManager = new AudioPlayer
  const stop = ()=>  {
    const secondsForMode = props.mode === 'pomodoro' ? settingsInfo.workMinutes * 60 : props.mode === 'shortBreak' ? settingsInfo.shortBreakMinutes * 60 : settingsInfo.longBreakMinutes * 60;
    setIsPaused(true);
    setSecondsLeft(secondsForMode)
    }

  const settingsInfo = useContext(SettingsContext);
  const {account} = useAuth()
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(settingsInfo.workMinutes * 60);

  function tick() {
    setSecondsLeft(secondsLeft - 1);
  }


  const saveCompletedPomodoro = () => {
    if (props.mode === 'pomodoro') {

    if (account.username !== null) {
      let dateNow = new Date()
      let dd = String(dateNow.getDate()).padStart(2, '0');
      let mm = String(dateNow.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = dateNow.getFullYear();
  
      const today = mm + '/' + dd + '/' + yyyy;

      const minutes = settingsInfo.workMinutes;
      const pomodoro = {username: account.username, name: today, minutes: minutes}
      axios

        .post('/pomodoro/save', pomodoro)
        .then(res => console.log("Pomodoro saved successfully"))
        .catch(err => console.error(err))
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused) {
        return;
      }
      if (secondsLeft === 0) {
        audioManager.playAudio();
        stop();
        saveCompletedPomodoro();
        return;
        // return switchMode();
      }
      tick();
    },1000);


    return () => clearInterval(interval);
  }, [isPaused, secondsLeft]);

  useEffect(() => {
      setSecondsLeft(totalSeconds)
      setIsPaused(true)
  }, [props.mode]);

  const calculateSeconds = () => {
    if(props.mode === 'pomodoro') {
      return settingsInfo.workMinutes * 60;
    } else if(props.mode === 'shortBreak') {
      return settingsInfo.shortBreakMinutes * 60;
    } else {
      return settingsInfo.longBreakMinutes * 60;
    }
  }
  let totalSeconds = calculateSeconds();

  let percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if(seconds < 10) seconds = '0'+seconds;

  return (
    <>
    <CircularProgressbar
      value={percentage}
      text={minutes + ':' + seconds}
      counterClockwise={true}
      styles={buildStyles({
      textColor:'#20 10 10',
      pathColor:props.mode == 'pomodoro' ? red 
      : props.mode == 'shortBreak' ? green
      : blue,
      tailColor:'rgba(255,255,255,.2)',
    })} />
    <div style={{marginTop:'20px'}}>
      {isPaused
        ? <PlayButton onClick={() => { setIsPaused(false)}} />
        : <PauseButton onClick={() => { setIsPaused(true)}} />}
        <StopButton onClick={()=> stop()}/>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />

    </div>
    <div style={{marginTop:'20px'}}>
    </div>
  </>
  )
}
