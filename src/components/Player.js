import React, { Component } from 'react';
import ProgressBar from './ProgressBar';

class Player extends Component {
  constructor() {
    super();
    this.state = {currentTime: 0};
  }

  componentDidMount() {
    this.props.player.play();
    this.interval = setInterval(this.timer, 500);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    this.props.player.kill();
  }
  
  timer = () => {
    this.setState({currentTime: this.props.player.currentTime()});
  }
  render() {
    let progress = this.state.currentTime/this.props.song.duration*100;
    console.log(progress);
    return (

    	<div className='player-wrapper' onClick={() => {this.props.player.kill();this.props.setSong(this.props.library[3].id)}}>
	      <div className='info'>
          <img src={require('../img/soundcloud-logo.png')} alt='soundcloud logo'/>
          <h2 className='song-title'>{this.props.song.title}</h2>
          <p className='artist-name'>{this.props.song.user.username}</p>
        </div>
        <div className='player'>
          <div className='player-progress-bar' style={{width: progress+'%'}}></div>
        </div>  
      </div>
    );
  }
}

export default Player;
