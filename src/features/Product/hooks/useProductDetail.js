import productApi from 'api/productApi';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const result = await productApi.get(productId);

        setProduct(result);
      } catch (error) {
        setError(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      }

      setLoading(false);
    })();
  }, [productId, enqueueSnackbar]);

  return { product, loading, error };
}

export default useProductDetail;
