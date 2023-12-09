import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    searchWord: '',
    isOpenModal: false,
    elementByModal: null,
    error: false,
    errMessage: null,
  };

  getSearchWord = (searchWord) => {
    this.setState({ searchWord });
  };

  toggleModal = () => {
    this.setState(prev => ({
      isOpenModal: !prev.isOpenModal,
    }));
  };

  getElForModal = (image) => {
    this.toggleModal();

    this.setState({
      elementByModal: image,
    });
  };

  render() {
    const {
      searchWord,
      isOpenModal,
      elementByModal,
    } = this.state;

    return (
      <div>
        {isOpenModal &&
          <Modal
            toggleModal={this.toggleModal}
            elementByModal={elementByModal}
          />
        }
        <Searchbar getSearchWord={this.getSearchWord} />
        {searchWord &&
          < ImageGallery
            searchWord={searchWord}
            toggleModal={this.toggleModal}
            getElForModal={this.getElForModal}
          />
        }
      </div>
    );
  }
}

export default App;
