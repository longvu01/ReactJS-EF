import Header from 'components/Common/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './HomePage.module.scss';

HomePage.propTypes = {};

function HomePage(props) {
  return (
    <div className={styles.root}>
      <Header />
      <Outlet />
    </div>
  );
}

export default HomePage;
