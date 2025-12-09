import Suggestions from "./Suggestions"
import { useState } from "react";
import { SelectTimerType } from './SelectTimerType';
import { Timer } from "./Timer";
import TodoComponent from "./TodoList";
import {useAuth} from '../contexts/AuthContext';

function TimerContainer() {
  const [mode, setMode] = useState('pomodoro');
  const {isLoggedIn, account} = useAuth();

  return (
      <div>
        <SelectTimerType mode={mode} setMode={setMode} />
        <div style={{marginTop:'20px'}}>
          <Timer mode={mode}/>
          {mode == "pomodoro" && (isLoggedIn) && <TodoComponent/>}
        </div>
          {mode !== "pomodoro" && <Suggestions/>}
          
      </div>
  );
}

export default TimerContainer;