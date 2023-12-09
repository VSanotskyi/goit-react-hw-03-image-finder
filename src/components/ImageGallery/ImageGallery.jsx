import { Component } from 'react';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import { imagesApi } from '../../api/api';

const PER_PAGE = 12;

class ImageGallery extends Component {
  state = {
    images: null,
    totalPage: 0,
    page: 1,
    loader: false,
    btnDisable: false,
    errMessage: null,
  };

  componentDidMount() {
    this.getImagesBySearchWord();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.page !== prevState.page) {
      this.getImagesBySearchWord();
    }

    if (this.props.searchWord !== prevProps.searchWord) {
      this.setState({ images: [] });
      this.getImagesBySearchWord();
    }
  }

  getImagesBySearchWord = async () => {
    const { page } = this.state;
    const { searchWord } = this.props;

    try {
      this.setState({ loader: true });
      const { data: { hits, totalHits } } = await imagesApi(page, searchWord,
        PER_PAGE);
      this.setState(({ images }) => ({
        images: images ? [...images, ...hits] : hits,
        totalPage: Number.parseInt(totalHits / PER_PAGE),
      }));
    } catch (err) {
      console.log(err);
      this.setState({
        errMessage: err.message,
      });
    } finally {
      this.setState({ loader: false });
    }
  };

  handleClick = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { images, page, loader, totalPage, errMessage } = this.state;
    const { searchWord, toggleModal } = this.props;

    return (
      <div>
        {loader && <Loader />}
        {
          images?.length > 0 ? (
            <ul>
              {images && images.map(i => (
                <ImageGalleryItem
                  key={i.id}
                  image={i}
                  toggleModal={toggleModal}
                  getElForModal={this.props.getElForModal}
                />
              ))}
            </ul>
          ) : !loader && errMessage ? <h1>{errMessage}</h1> :
            <h1>"{searchWord}" is not Defined</h1>
        }
        {
          images?.length > 0 && (
            <button
              type="button"
              onClick={this.handleClick}
              disabled={page >= totalPage}
            >Load more
            </button>
          )
        }
      </div>
    );
  }
}

export default ImageGallery;
