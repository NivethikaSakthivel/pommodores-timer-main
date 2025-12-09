import {Fragment, useState} from 'react'
import {
  AppBar,
  IconButton,
  Avatar,
  Popover,
  List,
  ListSubheader,
  ListItemButton,
} from '@mui/material'
import OnlineIndicator from './OnlineIndicator'
import AuthModal from './AuthModal'
import PreferencesModal from './PreferencesModal'
import {useAuth} from '../contexts/AuthContext'
import StatisticsModal from './StatisticsModal'

export default function Header() {
  const {isLoggedIn, account, logout} = useAuth()

  const [anchorEl, setAnchorEl] = useState(null)
  const [popover, setPopover] = useState(false)
  const [authModal, setAuthModal] = useState(false)
  const [preferencesModal, setPreferencesModal] = useState(false)
  const [register, setRegister] = useState(false)
  const [statisticsModal, setStatisticsModal] = useState(false)

  const openPopover = (e) => {
    setPopover(true)
    setAnchorEl(e.currentTarget)
  }

  const closePopover = () => {
    setPopover(false)
    setAnchorEl(null)
  }

  const clickLogin = () => {
    setRegister(false)
    setAuthModal(true)
    closePopover()
  }

  const clickPreferences = () => {
    setPreferencesModal(true)
    closePopover()
  }

  const clickRegister = () => {
    setRegister(true)
    setAuthModal(true)
    closePopover()
  }

  const clickStatistics = () => {
    setStatisticsModal(true)
    closePopover()
  }
  return (
    <AppBar className='header' position='static'>
      <h1>Pommodores</h1>

      <IconButton onClick={openPopover}>
        <OnlineIndicator online={isLoggedIn}>
          <Avatar src={account?.username || ''} alt={account?.username || ''} />
        </OnlineIndicator>
      </IconButton>

      <Popover
        anchorEl={anchorEl}
        open={popover}
        onClose={closePopover}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}>
        <List style={{minWidth: '100px'}}>
          <ListSubheader style={{textAlign: 'center'}}>
            Hello, {isLoggedIn ? account.username : 'Guest'}
          </ListSubheader>

          {isLoggedIn ? (
            <Fragment>
                <ListItemButton onClick={logout}>Logout</ListItemButton>
                <ListItemButton onClick={clickPreferences}>Preferences</ListItemButton>
                <ListItemButton onClick={clickStatistics}>Statistics</ListItemButton>
            </Fragment>
          
          ) : (
            <Fragment>
              <ListItemButton onClick={clickLogin}>Login</ListItemButton>

              <ListItemButton onClick={clickRegister}>Register</ListItemButton>
            </Fragment>
          )}
        </List>
      </Popover>

      <AuthModal
        open={authModal}
        close={() => setAuthModal(false)}
        isRegisterMode={register}
        toggleRegister={() => setRegister((prev) => !prev)}
      />


      <PreferencesModal
        open={preferencesModal}
        close={() => setPreferencesModal(false)}
        />

        <StatisticsModal
        open={statisticsModal}
        close={() => setStatisticsModal(false)}
        />
    </AppBar>
  )
}
