import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const SelectTimerType = (props) => {

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: string
  ) => {
    if (newMode !== null) {
      props.setMode(newMode)
    }
  };

  return (
    <>
      <ToggleButtonGroup
        value={props.mode}
        exclusive
        onChange={handleChange}
        size='small'
        fullWidth
      >
        <ToggleButton value="pomodoro">Pomodoro</ToggleButton>
        <ToggleButton style={{color: 'success'}}value="shortBreak">Short Break</ToggleButton>
        <ToggleButton value="longBreak">Long Break</ToggleButton>
      </ToggleButtonGroup>
    </>
  )
}
