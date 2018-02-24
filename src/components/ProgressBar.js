import React, { Component } from 'react';

class ProgressBar extends Component {
  constructor() {
    super();
    this.state = {value: ''};
  }

  componentDidMount() {
    this.props.player.play();
    console.log(this.props.song);
  }
  componentWillUnmount() {
    this.props.player.kill();
  }
  render() {
    let progress = Math.floor(this.props.player.currentTime/this.props.player.duration);
    return (
        <div className='player'>
          <div className='player-progress-bar' style={{width: this.props.progress+'%'}}></div>
        </div>  

    );
  }
}

export default ProgressBar;
