import React from 'react'
import audio from './alarm.mp3'

class AudioTest extends React.Component {

  playAudio = ()=> {
    new Audio(audio).play()
  }

  render() {
    return (
      <div>
        <button onClick={this.playAudio}>
          PLAY AUDIO
        </button>
      </div>
    )
  }

}

export default AudioTest