import React, { Component } from 'react';
import { JobContext } from '../context/JobContext';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './Search.module.css';

class Search extends Component {
  state = {
    searchText: ''
  };

  handleChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  handleEnterPressed = async (e, searchJob) => {
    if (e.key === 'Enter' && this.state.searchText.trim() !== '') {
      e.preventDefault();
      await searchJob(this.state.searchText, 0, 10);
    }
  };

  handleSubmit = async (e, searchJob) => {
    e.preventDefault();
    if (this.state.searchText.trim() !== '') {
      await searchJob(this.state.searchText);
      const { navigate, location } = this.props;
      let targetPath = location.pathname;
        if(targetPath.startsWith('/jobs/')){
          targetPath = '/collection';
        }
        else if(targetPath.startsWith('/admin/')){
          targetPath = '/admin';
        }
      navigate(targetPath);
    }
  };
  render() {
    return (
      <JobContext.Consumer>
        {({ searchJob }) => (
          <form className={classes['search-form']} onSubmit={(e) => this.handleSubmit(e, searchJob)}>
            <div className={classes['input-group']}>
              <label className="label-icon sr-only" htmlFor='searchText'>
                <i className="material-icons">search</i>
              </label>
              <input
                id="searchText"
                type="text"
                className={classes['search-input']}
                placeholder="Type your search query here and press enter."
                value={this.state.searchText}
                onChange={this.handleChange}
                onKeyDown={(e) => this.handleEnterPressed(e, searchJob)}
              />
              <button type='submit'><i className="material-icons">search</i></button>
            </div>
          </form>
        )}
      </JobContext.Consumer>
    );
  }
}

function WithHooks(props) {
  const location = useLocation();
  const navigate = useNavigate();
  return <Search {...props} location={location} navigate={navigate} />;
}

export default WithHooks;
