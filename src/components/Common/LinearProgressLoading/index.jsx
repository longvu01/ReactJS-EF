import { Box } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import styles from './LinearProgressLoading.module.scss';

function index(props) {
  return (
    <Box className={styles.loading}>
      <LinearProgress></LinearProgress>
    </Box>
  );
}

export default index;
