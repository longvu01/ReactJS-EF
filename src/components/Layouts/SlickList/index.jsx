import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import SlickItem from '../SlickItem';
import styles from './SlickList.module.scss';

function CustomArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: '#1976d2',
        borderRadius: '50%',
        height: '19px',
      }}
      onClick={onClick}
    />
  );
}

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: 'linear',
  nextArrow: <CustomArrow />,
  prevArrow: <CustomArrow />,
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
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`products?category.id=${id}`);
  };

  return (
    <div className={styles.root}>
      <h3 className={styles.title} onClick={() => handleNavigate(category.id)}>
        {category.name}
      </h3>
      <Slider {...settings}>
        {category.products.map((product) => (
          <SlickItem key={product.id} product={product} />
        ))}
      </Slider>
    </div>
  );
}

export default SlickList;
