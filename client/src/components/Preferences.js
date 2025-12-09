import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {useAuth} from '../contexts/AuthContext'
import axios from '../utils/axios';
import {Button} from '@mui/material'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Sports',
  'Fun',
  'Activities',
];

function getStyles(name, preferenceName, theme) {
  return {
    fontWeight:
      preferenceName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Preferences({close}) {
  const {account} = useAuth()
  const theme = useTheme();
  const [preferenceName, setPreferenceName] = React.useState([]);
  const preferencesRef = React.useRef();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPreferenceName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

const submitPreferences = () => {
  preferencesPost(preferencesRef.current.querySelector('#select-multiple-chip').value.split(","))
}

function preferencesPost(chosenPreferences) {

  axios
  .post("/preferences/save", {
    username: account.username,
    preferences: chosenPreferences
  })
  .then(res => console.log(res))
  .catch(err => console.error(err))
}


  return (
    <div className='hi' style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} >
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Favourite categories</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={preferenceName}
          onChange={handleChange}
          input={<OutlinedInput ref={node => preferencesRef.current = node} id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, preferenceName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>

        <Button
          onClick={() => preferencesPost(preferencesRef.current.querySelector('#select-multiple-chip').value.split(","))}>
         Submit Preferences
        </Button>
      </FormControl>
      
    </div>
  );
}
