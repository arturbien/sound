import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
  	let value = event.target.value;
    this.setState({value: value});
    this.props.search(value !=='' ? value : '*');
  }
  
  render() {
    return (
    	<header className='SearchBar'>
	      <form>
	        <input id='search-input' type="text" value={this.state.value} onChange={this.handleChange} disabled={this.props.disableSearch}/>
	      </form>
      </header>
    );
  }
}

export default SearchBar;
