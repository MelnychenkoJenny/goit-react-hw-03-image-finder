import { Modal } from 'components/Modal';
import { Component } from 'react';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  openModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <>
        <GalleryItem key={this.props.image.id} onClick={this.openModal}>
          <Image
            src={this.props.image.webformatURL}
            alt={this.props.image.tags}
          ></Image>
        </GalleryItem>
        {this.state.showModal && (
          <Modal onClose={this.closeModal}>
            <img
              src={this.props.image.largeImageURL}
              alt={this.props.image.tags}
            />
          </Modal>
        )}
      </>
    );
  }
}
