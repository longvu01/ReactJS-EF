import productApi from 'api/productApi';
import { useEffect, useState } from 'react';
import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import SlickItem from '../SlickItem';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  autoplay: true,
  autoplaySpeed: 2000,
  cssEase: 'linear',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function SlickList({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchDataCategories = async () => {
      const { data } = await productApi.getAll({
        _page: 0,
        'category.id': category.id,
      });
      setProducts(data);
    };

    fetchDataCategories();
  }, [category.id]);

  return (
    <div style={{ maxWidth: '100vw', minHeight: '350px' }}>
      <h2>{category.name}</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <SlickItem key={product.id} product={product} />
        ))}
      </Slider>
    </div>
  );
}

export default SlickList;
