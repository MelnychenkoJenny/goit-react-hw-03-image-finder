import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { fetchImages } from 'components/services/pixabayApi';
import { Component } from 'react';
import { toast } from 'react-toastify';

export class ImageGallery extends Component {
  state = {
    error: '',
    images: null,
    page: 1,
    status: '',
    imageName: '',
    loading: false,
    
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageName !== this.props.imageName ) {
      this.getImages(this.props.imageName,  this.state.page);
    }
  }

  getImages = async imageName => {
    try {
      if (imageName !== this.state.imageName) {
        this.setState({ status: 'pending' });
        const responseImages = await fetchImages(imageName, 1);
        console.log(`pol ${responseImages}`);

        if (!responseImages.hits.length) {
            toast.error(`Sorry, there are no images matching your query: "${imageName}". Please try to search something else.`);
            return this.setState({ status: 'rejected' });
          }
        return this.setState(prevState => ({
            images: responseImages.hits,
            page: prevState.page,
            status: 'resolved',
            imageName,
          }));
      }
      if (imageName === this.state.imageName) {
        this.setState({ loading: true });
        console.log(this.state.images.length);
        const nextImages = await fetchImages(this.state.imageName, this.state.page);
        console.log(`btn `, nextImages);
        return this.setState(prevState => ({
          images: [...prevState.images, ...nextImages.hits],
          page: prevState.page + 1,
        }));
      }

      
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
    finally {
        this.setState({ loading: false }); 
      }
  };

 

  loadMoreBtn = () => {
    this.setState(
        prevState => ({ page: prevState.page + 1 }),
        () => this.getImages(this.state.imageName, this.state.page)
      );
    
  };

  render() {
    if (this.state.status === 'pending') {
      return <div>Loading...</div>;
    }
    if (this.state.status === 'rejected') {
      return <div>Ooops</div>;
    }
    if (this.state.status === 'resolved') {
      return (
        <div>
          <ul>
            {this.state.images.map(img => (
              <ImageGalleryItem image={img} key={img.id} />
            ))}
          </ul>
          {this.state.loading ? (
            <div>Loading more...</div>) : <button type="button" onClick={this.loadMoreBtn}>
            Load more
          </button>}
        </div>
      );
    }
    
  }
}
