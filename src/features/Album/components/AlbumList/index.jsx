import React from 'react';
import PropTypes from 'prop-types';
import Album from '../Album';
import './style.scss';

AlbumList.propTypes = {
  albumList: PropTypes.array.isRequired,
};

function AlbumList({ albumList }) {
  return (
    <ul className="album-list">
      {albumList.map(album => (
        <Album key={album.id} album={album} />
      ))}
    </ul>
  );
}

export default AlbumList;
