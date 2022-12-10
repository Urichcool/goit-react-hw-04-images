import { useState } from 'react';
import {
  SearchBarContainer,
  SearchBarForm,
  SearchBarButton,
  SearchBarLabel,
  SearchBarInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit }) => {
  const [imgQuery, setImgQuery] = useState('');

  const handleNameChange = e => {
    setImgQuery(e.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (imgQuery === '') {
      return;
    }

    onSubmit(imgQuery);
    setImgQuery('');
  };

  return (
    <SearchBarContainer>
      <SearchBarForm onSubmit={handleSubmit}>
        <SearchBarButton type="submit">
          <SearchBarLabel>Search</SearchBarLabel>
        </SearchBarButton>

        <SearchBarInput
          type="text"
          autoComplete="off"
          name="imgName"
          value={imgQuery}
          onChange={handleNameChange}
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchBarForm>
    </SearchBarContainer>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
