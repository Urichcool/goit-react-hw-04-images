import { Component } from "react";
import { SearchBar } from "./Searchbar/Searchbar";
import { AppContainer } from "./App.styled";
import { ImageGallery } from "./ImageGallery/ImageGallery";


export class App extends Component {
  state = {
    imgName: '',
    images: [],
    page: 1,
  };

  imagesHandler = data => {
    this.setState(prevState => ({
      images: [...prevState.images, ...data.hits],
    }));
  };

  handleFormSubmit = imgName => {
    this.setState({
      imgName: imgName,
      images: [],
      page: 1 
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const {imgName, images, page} = this.state
    return (
      <AppContainer>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          imgName={imgName}
          images={images}
          imagesHandler={this.imagesHandler}
          page={page}
          loadMore={this.loadMore}
        />
      </AppContainer>
    );
  }
};
