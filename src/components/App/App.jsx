import { Searchbar } from 'components/Searchbar';
import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from 'components/ImageGallery';

export class App extends Component {
  state = {
    imageName: '',
  };

  handleImageNameChange = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleImageNameChange} />
        <ImageGallery imageName={this.state.imageName} />
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
