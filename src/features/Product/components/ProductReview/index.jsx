import { Paper } from '@mui/material';
import DOMPurify from 'dompurify';
import React from 'react';

function ProductReview({ product = {} }) {
  const safeDescription = DOMPurify.sanitize(product.description);

  return (
    <Paper elevation={0} style={{ padding: 15 }}>
      Reviews
      <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
    </Paper>
  );
}

export default ProductReview;
