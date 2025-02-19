import React, { Component } from 'react';
import classes from './Search.module.css';

class Search extends Component {
  state = {
    searchText: ''
  };

  handleChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  handleEnterPressed = async (e) => {
    if (e.key === 'Enter' && this.state.searchText.trim() !== '') {
      e.preventDefault();
      await this.props.searchJob(this.state.searchText);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.searchText.trim() !== '') {
      await this.props.searchJob(this.state.searchText);
    }
  };

  render() {
    return (
      <form className={`${classes['search-form']}`} onSubmit={this.handleSubmit}>
        <div className={`${classes['input-group']}`}>
          <label className="label-icon sr-only" htmlFor='searchText'>
            <i className="material-icons">search</i>
          </label>
          <input
            id="searchText"
            type="text"
            className={`${classes['search-input']}`}
            placeholder="Type your search query here and press enter."
            value={this.state.searchText}
            onChange={this.handleChange}
            onKeyDown={this.handleEnterPressed}
          />
          <button type='submit'>  <i className="material-icons">search</i></button>
        </div>
      </form>
    );
  }
}

export default Search;
