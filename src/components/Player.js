import React, { Component } from 'react';
import ProgressBar from './ProgressBar';

class Player extends Component {
  constructor() {
    super();
    this.state = {currentTime: 0};
  }

  componentDidMount() {
    this.props.player.on('finish', () => {
      this.props.setSong(undefined);
    });
    this.props.player.play();
    this.interval = setInterval(this.timer, 500);

  }
  componentWillUnmount() {
    clearInterval(this.interval);
    this.props.player.kill();
  }
  
  seekTo = (percent) => {
    this.props.player.seek(percent*this.props.song.duration);
  }

  timer = () => {
    this.setState({currentTime: this.props.player.currentTime()});
  }
  render() {
    let progress = this.state.currentTime/this.props.song.duration*100;

    let d = new Date(1000*Math.round((this.props.song.duration-this.state.currentTime)/1000));
    let minutesLeft = '0'+d.getUTCMinutes();
    let secondsLeft = '0'+d.getUTCSeconds();
    let timeLeft = minutesLeft.slice(-2) + ':' + secondsLeft.slice(-2); 
    return (
    	<div className='player' >
        <div className='container'>
          
          <div className='info'>
            <div className='song-cover'>
              {this.props.song.artwork_url &&
                <img src={this.props.song.artwork_url.replace('badge', 't500x500')} alt='song cover'/>
              }
            </div>
            
            <div className='song-description'>
              <h2 className='song-title'>{this.props.song.title}</h2>
              <p className='artist-name'>{this.props.song.user.username}</p>
            </div>
            
          </div>

          <ProgressBar progress={progress} seekTo={this.seekTo} timeLeft={timeLeft}/>
          <div className='player-buttons'>
            <button onClick={()=>{this.props.player.pause()}}>
              <i className='fa fa-pause'></i>
            </button>
            <button onClick={()=>{this.props.player.play()}}>
              <i className='fa fa-play'></i>
            </button>
            <button  onClick={()=>{this.props.player.seek(0);this.props.player.pause();}}>
              <i className='fa fa-stop'></i>
            </button>
          </div>
        </div>  
	      
        
      </div>
    );
  }
}

export default Player;
  // <div className='player-progress-bar' style={{width: progress+'%'}}></div>
  // <img src={require('../img/soundcloud-logo.png')} alt='soundcloud logo'/>

  // let minutesLeft = d.getUTCMinutes().length < 2 ? '0'+d.getUTCMinutes():d.getUTCMinutes();
  //   let secondsLeft = d.getUTCSeconds().length < 2 ? '0'+d.getUTCSeconds():d.getUTCSeconds();
  //   let timeLeft = minutesLeft + ':' + secondsLeft;