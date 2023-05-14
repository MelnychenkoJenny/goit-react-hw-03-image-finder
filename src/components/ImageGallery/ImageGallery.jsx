import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Loader } from 'components/Loader';
import { fetchImages } from 'components/services/pixabayApi';
import { Component } from 'react';
import { toast } from 'react-toastify';
import {
  ButtonMore,
  Container,
  Empty,
  GalleryList,
} from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    error: null,
    images: [],
    page: 1,
    imageName: '',
    total: 1,
    loading: false,
    empty: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.imageName !== this.props.imageName ||
      prevState.page !== this.state.page
    ) {
      this.getImages(this.props.imageName, this.state.page);
    }
  }

  getImages = async (imageName, page) => {
    try {
      if (imageName !== this.state.imageName) {
        this.setState({ loading: true });
        const responseImages = await fetchImages(imageName, page);

        if (!responseImages.hits.length) {
          toast.error(
            `Sorry, there are no images matching your query: "${imageName}". Please try to search something else.`
          );
          return this.setState({
            images: [],
            page: 1,
            total: 1,
            loading: false,
            error: null,
            empty: true,
            imageName: '',
          });
        }
        return this.setState(prevState => ({
          images: responseImages.hits,
          page: prevState.page,
          total: responseImages.total,
          imageName,
          empty: false,
        }));
      }
      if (imageName === this.state.imageName) {
        this.setState({ loading: true });
        const nextImages = await fetchImages(
          this.state.imageName,
          this.state.page
        );
        return this.setState(prevState => ({
          images: [...prevState.images, ...nextImages.hits],
          page: prevState.page,
        }));
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  loadMoreBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <Container>
        {this.state.error && (
          <h2>Something went wrong: ({this.state.error})!</h2>
        )}
        {this.state.loading && <Loader />}
        {this.state.empty && <Empty>Sorry. There are no images ... 😭</Empty>}
        <div>
          <GalleryList>
            {this.state.images.map(img => (
              <ImageGalleryItem image={img} key={img.id} />
            ))}
          </GalleryList>
          {this.state.total / 12 > this.state.page && (
            <ButtonMore type="button" onClick={this.loadMoreBtn}>
              Load more
            </ButtonMore>
          )}
        </div>
      </Container>
    );
  }
}
