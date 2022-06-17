import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import styles from './ProgressRating.module.scss';

function ProgressRating({ starNumber, value, total }) {
  const percentValue = (value / total) * 100 || 0;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
      <Box sx={{ minWidth: 35, width: 50 }}>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          variant="body2"
          color="text.secondary"
        >
          {starNumber}{' '}
          <StarIcon fontSize="small" sx={{ ml: 0.3 }} className={styles.star} />
        </Typography>
      </Box>
      <Box sx={{ width: '100%', mx: 1 }}>
        <LinearProgress
          variant="determinate"
          value={percentValue}
          className={styles.progressBar}
        />
      </Box>
      <Box sx={{ minWidth: 35, width: 100 }}>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            mr: 2,
          }}
          variant="body2"
          color="text.secondary"
        >{`${value} đánh giá`}</Typography>
      </Box>
    </Box>
  );
}

export default ProgressRating;
