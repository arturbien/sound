import React, { Component } from 'react';
import Song from './Song';


class Library extends Component {
  render() {
  	let songs = this.props.library.map(
  		song => {
  			return (
	  			<Song
            setSong={this.props.setSong}
            playing = {this.props.playing}
            songId = {song.id} 
	  				key={song.id}
	  				title={song.title}
	  				artist={song.user.username}
	  				image={song.artwork_url} />)
  		})
  	if (songs) {
  		return (
	      <section className='Library'>
	      	{songs}
      	</section>
    	);
  	} else {
  		return <h1>LOADING..</h1>;
  	}
  }
}

export default Library;
