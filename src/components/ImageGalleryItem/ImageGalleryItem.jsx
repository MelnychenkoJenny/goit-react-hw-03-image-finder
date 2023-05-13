import { Modal } from 'components/Modal';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  openModal = () => {
    this.setState({showModal: true})

  }
  closeModal = () => {
    this.setState({showModal: false})
  }

  render() {
    return (
      <div>
        <li key={this.props.image.id} onClick={this.openModal}>
          <img
            src={this.props.image.webformatURL}
            alt={this.props.image.tags}
            width="30"
          ></img>
        </li>
        {this.state.showModal && (
          <Modal onClose={this.closeModal}>
            <img
              src={this.props.image.largeImageURL}
              alt={this.props.image.tags}
              width='50'
            />
          </Modal>
        )}
      </div>
    );
  }
}
