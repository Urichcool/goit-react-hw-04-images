import {
  ImageGalleryListItem,
  ImageGalleryListImg,
} from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ smallImg, id }) => {
  return (
    <ImageGalleryListItem id={id}>
      <ImageGalleryListImg src={smallImg} alt=""></ImageGalleryListImg>
    </ImageGalleryListItem>
  );
};

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
