import { Box, Button, Typography } from '@mui/material';
import NotFoundImg from 'imgs/NotFound.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';

NotFound.propTypes = {};

function NotFound(props) {
  const navigate = useNavigate();

  const handleBackToHomePage = () => {
    navigate('/');
  };

  return (
    <Box className={styles.notFoundBox}>
      <img src={NotFoundImg} alt="NotFoundImg" />
      <Typography variant="h7" component="p">
        Nội dung bạn tìm kiếm không tồn tại!
      </Typography>
      <Button onClick={handleBackToHomePage}>Quay lại trang chủ</Button>
    </Box>
  );
}

export default NotFound;
