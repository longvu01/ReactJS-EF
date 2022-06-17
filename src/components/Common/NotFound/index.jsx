import { Box, Button, Typography } from '@mui/material';
import NotFoundImg from 'imgs/NotFound.png';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';

NotFound.propTypes = {};

function NotFound(props) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleBackToHomePage = () => {
    navigate('/');
  };

  return (
    <Box className={styles.notFoundBox}>
      <img src={NotFoundImg} alt="NotFoundImg" />
      <Typography variant="h7" component="p">
        Nội dung bạn tìm kiếm không tồn tại!
      </Typography>
      <Button variant="outlined" color="error" onClick={handleBack}>
        Quay lại
      </Button>
      <span>hoặc</span>
      <Button variant="contained" color="info" onClick={handleBackToHomePage}>
        Quay lại trang chủ
      </Button>
    </Box>
  );
}

export default NotFound;
