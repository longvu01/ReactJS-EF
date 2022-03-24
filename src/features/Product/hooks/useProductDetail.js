import productApi from 'api/productApi';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';

function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const mounted = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (mounted.current) setLoading(true);

        const result = await productApi.get(productId);

        if (mounted.current) setProduct(result);
      } catch (error) {
        if (mounted.current) {
          console.log('error', error);
          setError(error);
          enqueueSnackbar(error.message, { variant: 'error' });
          console.log('Failed to fetch product', error);
        }
      }

      if (mounted.current) setLoading(false);
    };

    fetchData();

    return () => {
      mounted.current = false;
    };
  }, [productId]);

  return { product, loading, error };
}

export default useProductDetail;
