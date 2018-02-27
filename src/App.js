import React, { Component } from 'react';
import './App.css';
import Library from './components/Library';
import SearchBar from './components/SearchBar';
import Player from './components/Player';
import SC from 'soundcloud';
import _ from 'lodash';
//  API KEYS:
// 340f063c670272fac27cfa67bffcafc4
// e2a6681bccff23130855618e14c481af

class App extends Component {
  constructor() {
    super();
    this.state = { library:[], playing: undefined, player: undefined};
  }

  componentDidMount() {
    SC.initialize({
      client_id: 'e2a6681bccff23130855618e14c481af'
    });
    let initialQuery = {  q: 'troyboi',limit: '40',favoritings_count:{from: '10000'}}
    this.getTracks(initialQuery);
  }
  // componentWillUpdate() {
  //     console.log(this.state);
  //     if (this.state.player){
  //       this.state.player.play();
  //     }
  // }
  getTracks = (query) => {
    SC.get('/tracks', query).then(tracks => {
      this.setState({ library: tracks });
    });
  }
  setSong = (songId, t) => {
    if (songId !== undefined) {
      // this.playMusic(songId, t);
      SC.stream('/tracks/'+songId).then((player)=>{
        this.setState({playing: songId, player: player});
      });
      
    } else {
      this.setState({playing: undefined, player: undefined});
    }
    
  }
  search = (str) => {
    let newQuery = {q: str, limit: '40'};
    this.getTracks(newQuery);
  }
  

  playMusic = (songId) => {
    SC.stream('/tracks/'+songId).then(function(player){
      player.play().then(function(){
        console.log('Playback started!');
      }).catch(function(e){
        console.error('Playback rejected. Try calling play() from a user interaction.', e);
      });
    });
  }

  render() {
    let disableSearch = this.state.playing !== undefined ? true:false;
    let songObj = this.state.library.filter(obj => {return obj.id === this.state.playing})[0];
    const search = _.debounce((this.search), 300);
    console.log('songobj', songObj);
    return (
      <div className='App'>
        <SearchBar search={search} disableSearch={disableSearch}/>
        <Library library = {this.state.library} playing={this.state.playing} setSong={this.setSong} />
        {this.state.playing &&
          <Player song={songObj} player={this.state.player} setSong={this.setSong} library={this.state.library}/>
        }
      </div>
    );
  }
}

export default App;
