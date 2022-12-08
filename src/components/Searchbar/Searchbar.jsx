import { Component } from 'react';
import {
  SearchBarContainer,
  SearchBarForm,
  SearchBarButton,
  SearchBarLabel,
  SearchBarInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    imgName: '',
  };

  handleNameChange = e => {
    this.setState({ imgName: e.currentTarget.value.toLowerCase().trim() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.imgName === '') {
      return;
    }

    this.props.onSubmit(this.state.imgName);
    this.setState({ imgName: '' });
  };

  render() {
    return (
      <SearchBarContainer>
        <SearchBarForm onSubmit={this.handleSubmit}>
          <SearchBarButton type="submit">
            <SearchBarLabel>Search</SearchBarLabel>
          </SearchBarButton>

          <SearchBarInput
            type="text"
            autoComplete="off"
            name="imgName"
            value={this.state.imgName}
            onChange={this.handleNameChange}
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchBarForm>
      </SearchBarContainer>
    );
  }
}
