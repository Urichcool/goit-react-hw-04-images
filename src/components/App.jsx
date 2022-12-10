import { useState } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { AppContainer } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [imgName, setImgName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const imagesHandler = data => {
    setImages(state => [...state, ...data]);
  };

  const handleFormSubmit = imageName => {
    setImgName(imageName);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(state => state + 1);
  };

  return (
    <AppContainer>
      <SearchBar onSubmit={handleFormSubmit} />
      <ImageGallery
        imgName={imgName}
        images={images}
        imagesHandler={imagesHandler}
        page={page}
        loadMore={loadMore}
      />
    </AppContainer>
  );
};
