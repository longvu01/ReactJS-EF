import productApi from 'api/productApi';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await productApi.get(productId);
        setProduct(result);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
        console.log('Failed to fetch product', error);
      }

      setLoading(false);
    })();
  }, [productId]);

  return { product, loading };
}

export default useProductDetail;
