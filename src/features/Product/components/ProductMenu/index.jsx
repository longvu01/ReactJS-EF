import React from 'react';
import PropTypes from 'prop-types';
import { Box, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styles from './ProductMenu.module.scss';
import classNames from 'classnames';

ProductMenu.propTypes = {};

function ProductMenu(props) {
  let activeStyle = {
    textDecoration: 'underline',
    fontWeight: 'bold',
    color: '#1976d2',
  };

  return (
    <Box component="ul" className={styles.root}>
      <li>
        <Link
          component={NavLink}
          to=""
          className={styles.link}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          end
        >
          Description
        </Link>
      </li>

      <li>
        <Link
          component={NavLink}
          to="additional"
          className={styles.link}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          end
        >
          Additional Information
        </Link>
      </li>

      <li>
        <Link
          component={NavLink}
          to="reviews"
          className={styles.link}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          end
        >
          Reviews
        </Link>
      </li>
    </Box>
  );
}

export default ProductMenu;
