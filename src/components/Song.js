import React, { Component } from 'react';

var bg = ['linear-gradient(45deg,#30496B,#30B8D2)',
          'linear-gradient(45deg,#F32F8E,#B236D0)',
          'linear-gradient(45deg,#833DB8,#B998DD)',
          'linear-gradient(220deg, #ec77ab, #7873f5)']

class Song extends Component {

  componentWillMount(){
    // SETS BG IF IMAGE IS NOT PROVIDED
    this.background = this.props.image != null ? 'url('+this.props.image.replace('large', 't500x500')+')' : bg[Math.floor(Math.random()*bg.length)];
    this.animationDone = true;
  }

  componentDidUpdate(){
    // ANIMATIONS WHEN PRESSED PLAY AND STOP
    if (this.props.playing === this.props.songId) {
      this.song.style.zIndex='100';
      this.cd.classList.add('cd-slide');
      this.animationDone = false;
      setTimeout(()=>{
        this.cd.classList.add('cd-spin');
      },800);
    } else  {
      this.cd.classList.remove('cd-spin');
      setTimeout(()=>{
        this.cd.classList.add('cd-slide-back');
      },10);
      setTimeout(()=>{
        this.cd.className='cd';
        this.resetPosition(this.song);
        this.animationDone = true;
      },810);
    }     
  }

  mouseMove = (event) => {
    //MOVING SONG COVER ON HOVER
    if (this.props.playing === this.props.songId || this.props.playing === undefined) {
      let target = event.target || event.srcElement;
      let rectObject = target.getBoundingClientRect();

      let x = Math.floor((event.clientX - (rectObject.left+target.offsetWidth/2))/(target.offsetWidth/2)*100)/100;
      let y = Math.floor((event.clientY - (rectObject.top - document.body.scrollTop+target.offsetHeight/2))/(target.offsetHeight/2)*100)/100;

      target.style.transitionDuration = '0s';
      target.style.transform = 'scale(1.5, 1.5) rotateY('+ x*15 +'deg) rotateX('+ (-y*15) +'deg) rotateZ('+ x*5 +'deg)';
      target.style.zIndex='100';
    }
  }

  mouseOut = (event) => {
    // RESET SONG COVER POSITION ON MOUSE OUT
    let target = event.target || event.srcElement;
    if ((this.props.playing !== this.props.songId) && this.animationDone) {
      this.resetPosition(target);
    }         
  }

  mouseClick = (event) => {
    // PLAY / STOP SONG
    event.preventDefault();
    if (this.props.playing === undefined) {
      this.props.setSong(this.props.songId);
    } else  {
      this.props.setSong(undefined);
    }       
  }
  
  resetPosition =(t) => {
    t.style.transitionDuration = '0.5s';
    t.style.transform = 'scale(1, 1) rotateY(0deg) rotateX(0deg) rotateZ(0deg)';
    t.style.zIndex='-1';
  }

  render() {
    let blur = ((this.props.playing !== this.props.songId) && (this.props.playing !== undefined)) ? 'blur(6px)' : 'none';
    // let opacity = ((this.props.playing !== this.props.songId) && (this.props.playing !== undefined)) ? '0' : '1';
    let playerLogo = this.props.playing === this.props.songId ? 'fa fa-times-circle-o fa-2x icons' : 'fa fa-play-circle-o fa-2x icons';
    return (
      <div
        ref={songWrapper => this.song = songWrapper} 
        className='Song' 
        style={{backgroundImage: this.background, filter: blur}} 
        onMouseMove={(e)=>{this.mouseMove(e)}}
        onMouseLeave={(e)=>{this.mouseOut(e)}}
        onClick={(e)=>{this.mouseClick(e)}}>
        <div className='card-content'>
          
          <h3>{this.props.title}</h3>
          { (this.props.playing === undefined || this.props.playing === this.props.songId) &&
          <i className={playerLogo} />
          }
        </div>
        <img
          ref={cd => this.cd = cd} 
          className='cd' 
          src={require('../img/cd.png')}
          alt=''/>
      </div>
    );
  }
}

export default Song;
