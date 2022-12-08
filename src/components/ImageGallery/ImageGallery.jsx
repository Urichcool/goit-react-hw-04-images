import { Component } from 'react';
import { ImageGalleryList, ImageGalleryLoadButton } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  static propTypes = {
    imgName: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    imagesHandler: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    loadMore: PropTypes.func.isRequired
  };

  state = {
    loading: false,
    showModal: false,
    largeImage: '',
  };




  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imgName !== this.props.imgName || prevProps.page !== this.props.page) {
      this.setState({ loading: true });
      try{fetch(
        `https://pixabay.com/api/?q=${this.props.imgName}&page=${this.props.page}&key=30483075-32508e0f0aa6f1eedcbd37828&image_type=photo&orientation=horizontal&per_page=20`
      ).then(res =>
        res
          .json()
          .then(images => {
              images.hits.map(({id, webformatURL, largeImageURL}) => {
                this.props.imagesHandler([{id: id, webformatURL: webformatURL,largeImageURL: largeImageURL }]);
            })

            
          
          }
          
        )
        .finally(this.setState({ loading: false  })))
        }
      catch(error){
      }
    }
   
  }



  openModal = e => {
    const eventElement = this.props.images.find(
      img => img.id.toString() === e.target.closest('li').id
    );

    this.setState({ largeImage: eventElement.largeImageURL });

    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { loading, showModal, largeImage } = this.state;
    return (
      <>
        {loading && <Loader />}
        {this.props.images.length !== 0 && (
          <ImageGalleryList onClick={this.openModal}>
            {this.props.images.length !== 0 &&
              this.props.images.map(({ id, webformatURL }) => {
                return (
                  <ImageGalleryItem key={id} smallImg={webformatURL} id={id} />
                );
              })}
          </ImageGalleryList>
        )}

        {this.props.images.length !== 0 && (
          <ImageGalleryLoadButton
            type="button"
            onClick={() => {
              this.props.loadMore();
            }}
          >
            Load more
          </ImageGalleryLoadButton>
        )}
        {showModal && (
          <Modal largeImage={largeImage} onClose={this.togleModal} />
        )}
      </>
    );
  }
}
