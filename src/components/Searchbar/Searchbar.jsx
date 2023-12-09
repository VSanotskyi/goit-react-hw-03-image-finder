import { Component } from 'react';

class Searchbar extends Component {
  state = {
    searchWorld: '',
  };
  
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.getSearchWord(this.state.searchWorld);
    this.setState({ searchWorld: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form onSubmit={this.handleSubmit}
              className="form"
        >
          <button type="submit"
                  className="button"
          >
            <span className="button-label">Search</span>
          </button>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchWorld"
            value={this.state.searchWorld}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }

}

export default Searchbar;
