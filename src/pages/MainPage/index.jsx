import Header from 'components/Common/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainPage.module.scss';

function MainPage() {
  return (
    <div className={styles.root}>
      <Header />
      <Outlet />
    </div>
  );
}

export default MainPage;
