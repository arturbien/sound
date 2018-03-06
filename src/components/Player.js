import React, { Component } from 'react';
import ProgressBar from './ProgressBar';

let volume = 0.5;

class Player extends Component {
  constructor() {
    super();
    this.state = {currentTime: 0, volume: volume};
  }

  componentDidMount() {
    this.props.player.on('finish', () => {
      this.props.setSong(undefined);
    });
    this.props.player.play();
    this.interval = setInterval(this.timer, 500);
  }
  componentDidUpdate() {
    this.props.player.setVolume(this.state.volume);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    this.props.player.kill();
    volume = this.state.volume;
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
    	<section className='Player' >
        <div className='container'>

          <div className='song-info'>
            <div className='song-cover'>
              {this.props.song.artwork_url &&
                <img src={this.props.song.artwork_url.replace('badge', 't500x500')} alt='song cover'/>
              }
            </div>
            <div className='song-details'>
              <h2 className='song-title'><a href={this.props.song.permalink_url} target='_blank'>{this.props.song.title}</a></h2>
              <p className='song-artist'><a href={this.props.song.user.permalink_url} target='_blank'>{this.props.song.user.username}</a></p>
              <div className='song-stats'>
                <div className='stat'><i className='fa fa-play'></i>{this.props.song.playback_count}</div>
                <div className='stat'><i className='fa fa-heart'></i>{this.props.song.likes_count}</div>
                <div className='stat'><i className='fa fa-comment'></i>{this.props.song.comment_count}</div>
              </div>
            </div>
            <a id='player-soundcloud-logo' href='https://soundcloud.com/' target='_blank'><img src={require('../img/soundcloud-powered.png')} alt='SoundCloud logo'/></a>
          </div>
          <div className='player-controls'>
            <ProgressBar progress={progress} seekTo={this.seekTo} timeLeft={timeLeft}/>
            <div className='player-buttons'>
              <button onClick={()=>{this.props.player.pause()}}>
                <i className='fa fa-pause'></i>
              </button>
              <button onClick={()=>{this.props.player.play()}}>
                <i className='fa fa-play'></i>
              </button>
              <button  onClick={()=>{this.props.player.seek(0.1);this.props.player.pause();}}>
                <i className='fa fa-stop'></i>
              </button>
            </div>
            <input type='range' value={this.state.volume} min='0' max='1' step='0.025' onChange={(e)=>{this.setState({volume: e.target.value})}} />
          </div>
        </div> 
      </section>
    );
  }
}

export default Player;
