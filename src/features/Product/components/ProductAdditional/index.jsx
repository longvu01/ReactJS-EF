import { Paper } from '@mui/material';
import DOMPurify from 'dompurify';
import React from 'react';

function ProductAdditional({ product = {} }) {
  const safeDescription = DOMPurify.sanitize(product.description);

  return (
    <Paper elevation={0} style={{ padding: 15 }}>
      Additional Information
      <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
    </Paper>
  );
}

export default ProductAdditional;
