import { Searchbar } from 'components/Searchbar';
import { Component } from 'react';
import { Container } from './App.styled';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from 'components/ImageGallery';

export class App extends Component {
  state = {
    imageName: '',    
  };

  handleImageNameChange = (imageName) => {
this.setState({imageName})
  }


  render() {
    return <Container>
      
      <Searchbar onSubmit={this.handleImageNameChange}/>
      <ImageGallery imageName={this.state.imageName}/>
      <ToastContainer autoClose={3000}/>
    </Container>
    
  }
}
