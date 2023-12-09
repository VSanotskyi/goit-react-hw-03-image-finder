import css from './Modal.module.css';
import { Component } from 'react';

class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }

  handleEsc = () => {
    this.props.toggleModal();
  };

  closeModalOnMouseClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    const {
      toggleModal,
      elementByModal: {
        webformatURL, tags,
      },
    } = this.props;

    return (
      <div
        className={css.Overlay}
        onClick={(e) => this.closeModalOnMouseClick(e)}
      >
        <button
          onClick={toggleModal}
          className={css.Button}
        >
          close
        </button>
        <div className={css.Modal}>
          <img
            src={webformatURL}
            alt={tags}
          />
        </div>
      </div>
    );
  }
}

export default Modal;
