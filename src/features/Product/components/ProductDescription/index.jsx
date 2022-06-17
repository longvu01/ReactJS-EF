import { Paper } from '@mui/material';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

ProductDescription.propTypes = {
  description: PropTypes.string,
};

function ProductDescription({ description }) {
  const safeDescription = DOMPurify.sanitize(description);

  return (
    <Paper elevation={0} style={{ padding: 15 }}>
      <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
    </Paper>
  );
}

export default ProductDescription;
