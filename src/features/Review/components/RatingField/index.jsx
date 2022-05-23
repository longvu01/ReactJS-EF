import StarIcon from '@mui/icons-material/Star';
import { Rating } from '@mui/material';
import Box from '@mui/material/Box';

const labels = {
  1: 'Không thích',
  2: 'Tạm được',
  3: 'Bình thường',
  4: 'Hài lòng',
  5: 'Rất hài lòng',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function RatingField({ rating, hover, onChange, onHover }) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ml: 3,
      }}
    >
      <Rating
        name="hover-feedback"
        size="large"
        value={rating}
        getLabelText={getLabelText}
        onChange={onChange}
        onChangeActive={onHover}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {rating !== null && (
        <Box sx={{ ml: 2, minWidth: 100 }}>
          {labels[hover !== -1 ? hover : rating]}
        </Box>
      )}
    </Box>
  );
}

export default RatingField;
