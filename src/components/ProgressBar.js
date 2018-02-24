import React, { Component } from 'react';

class ProgressBar extends Component {

  handleOnClick = (e) => {
    // var x = e.pageX - this.offsetLeft; 
    let pos = (e.clientX-e.target.offsetLeft)/e.target.offsetWidth;
    this.props.seekTo(pos);
  }
  render() {
    return (
      <div className='ProgressBar'>
        <div className='time-line' onClick={(e)=>{this.handleOnClick(e)}}>
          <div className='time-marker' style={{left: this.props.progress+'%'}}></div>
          <div className='time'>{this.props.timeLeft}</div>
        </div>  
      </div>  
    );
  }
}

export default ProgressBar;
