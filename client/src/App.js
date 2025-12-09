import {useAuth} from './contexts/AuthContext'
import Header from './components/Header'
import { Suggestions } from './components/Suggestions'
import TimerContainer from "./components/TimerContainer";
import Settings from "./components/Settings";
import {useState} from "react";
import SettingsContext from "./components/SettingsContext";


export default function App() {
  const {isLoggedIn} = useAuth()
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);

  return (
    <div className='App'>
      <Header />
      <main>
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        shortBreakMinutes,
        setWorkMinutes,
        setShortBreakMinutes,
        longBreakMinutes,
        setLongBreakMinutes
      }}>
        {showSettings ? <Settings /> : <TimerContainer />}
      </SettingsContext.Provider>
      
      </main>

    </div>
  )
}

