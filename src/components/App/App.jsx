import { Searchbar } from 'components/Searchbar';
import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ImageGallery } from 'components/ImageGallery';
import { ButtonMore, Container } from 'components/ImageGallery/ImageGallery.styled';

import { Loader } from 'components/Loader';

import { fetchImages } from 'components/services/pixabayApi';
import { EmptyNotification } from 'components/EmptyNotification';

export class App extends Component {
  state = {
    error: null,
    images: [],
    page: 1,
    imageName: '',
    total: 1,
    loading: false,
    empty: false,
    showButtonMore: true,
  };

  componentDidUpdate(_, prevState) {
    const { page, images, imageName } = this.state;
    if (prevState.imageName !== imageName || prevState.page !== page) {
      this.getImages(imageName, page);
    }

    if (images.length > 12 && prevState.images !== images) {
      const { height: cardHeight } = document
        .querySelector('ul')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  }

  handleImageNameChange = imageName => {
    if (imageName === this.state.imageName) {
      toast.error(
        `Images for this request have already been shown. Try another one.`
      );
      return;
    }
    this.setState({
      imageName,
      images: [],
      page: 1,
      total: 1,
      loading: false,
      empty: false,
      error: null,
    });
  };

  getImages = async (imgName, page) => {
    try {
      this.setState({ loading: true });
      const responseImages = await fetchImages(imgName, page);

      if (!responseImages.hits.length) {
        toast.error(
          `Sorry, there are no images matching your query: "${imgName}". Please try to search something else.`
        );
        return this.setState({ empty: true });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...responseImages.hits],
        total: responseImages.total,
        empty: false,
        showButtonMore: true,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  loadMoreBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1, showButtonMore: false  }));
  };

  render() {
    const { error, loading, empty, total, page, showButtonMore, images } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleImageNameChange} />
        <ImageGallery images={images} />
        {error && <h2>Something went wrong: ({error})!</h2>}
        {loading && <Loader />}
        {empty && <EmptyNotification />}
        {showButtonMore && total / 12 > page && (
  <ButtonMore type="button" onClick={this.loadMoreBtn}>
    Load more
  </ButtonMore>
)}
        <ToastContainer autoClose={2000} />
      </Container>
    );
  }
}
