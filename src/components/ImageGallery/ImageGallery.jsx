import { useState, useEffect } from 'react';
import {
  ImageGalleryList,
  ImageGalleryLoadButton,
} from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGallery = ({
  imgName,
  images,
  imagesHandler,
  page,
  loadMore,
}) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    if (imgName === '') {
      return;
    }
    setLoading(true);
    try {
      fetch(
        `https://pixabay.com/api/?q=${imgName}&page=${page}&key=30483075-32508e0f0aa6f1eedcbd37828&image_type=photo&orientation=horizontal&per_page=20`
      ).then(res =>
        res
          .json()
          .then(images => {
            images.hits.map(({ id, webformatURL, largeImageURL }) => {
              return imagesHandler([
                {
                  id: id,
                  webformatURL: webformatURL,
                  largeImageURL: largeImageURL,
                },
              ]);
            });
          })
          .finally(setLoading(false))
      );
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgName, page]);

  const openModal = e => {
    const eventElement = images.find(
      img => img.id.toString() === e.target.closest('li').id
    );

    setLargeImage(eventElement.largeImageURL);

    togleModal();
  };

  const togleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {loading && <Loader />}
      {images.length !== 0 && (
        <ImageGalleryList onClick={openModal}>
          {images.map(({ id, webformatURL }) => {
            return (
              <ImageGalleryItem key={id} smallImg={webformatURL} id={id} />
            );
          })}
        </ImageGalleryList>
      )}

      {images.length !== 0 && (
        <ImageGalleryLoadButton
          type="button"
          onClick={() => {
            loadMore();
          }}
        >
          Load more
        </ImageGalleryLoadButton>
      )}
      {showModal && <Modal largeImage={largeImage} onClose={togleModal} />}
    </>
  );
};

ImageGallery.propTypes = {
  imgName: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  imagesHandler: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired,
};
