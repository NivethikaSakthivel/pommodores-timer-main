import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import { List } from 'antd';
import axios from '../utils/axios';
import {useAuth} from '../contexts/AuthContext'
import { useState } from 'react';

const Suggestions = () => {
  const {isLoggedIn, account} = useAuth()
  const [suggestions, setSuggestions] = useState([])


  const breakSuggestions = async () => {
    if (isLoggedIn) {
      await axios
      .get(`/suggestions/${account.username}`)
      .then(res => setSuggestions(res.data))
      .catch(err => console.error(err))
    } else {
      await axios
      .get(`/suggestions`)
      .then(res => setSuggestions(res.data))
      .catch(err => console.error(err))
    }
  }

  useEffect(() => {
    breakSuggestions()
  }, [])

  return (
  <>
    <List
      header={<div>BREAK SUGGESTIONS</div>}
      bordered
      dataSource={suggestions}
      renderItem={item => (
        <List.Item>
          {item.url ? <List.Item.Meta
            title={<a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>} 
          /> : <List.Item.Meta
          title={<p>{item.title}</p>} 
          />}
        </List.Item>
      )}
    />
  </>
)};

export default Suggestions