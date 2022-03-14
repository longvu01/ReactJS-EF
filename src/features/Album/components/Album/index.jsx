import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

Album.propTypes = {
  album: PropTypes.object.isRequired,
};

function Album({ album }) {
  return (
    <li className="album">
      <div className="album__thumbnail">
        <img src={album.thumbnailUrl} alt={album.name} />
      </div>
      {/* Control */}
      <p className="album__name">{album.name}</p>
    </li>
  );
}

export default Album;
