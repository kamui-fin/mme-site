import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";
import 'swiper/css';
import style from "scss/components/Carousel.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BookCard } from "./BookCard";

interface Props {
  text: string
}

export const Carousel = ({text}: Props) => {
    const cards = [{
      title: "Sword Art Online Vol. 1", author: "Reki Kawahara", image: "https://images-na.ssl-images-amazon.com/images/I/51UVCfCXmzL._SX331_BO1,204,203,200_.jpg", coverType: "Paperback", price: 12.99
    },
    {
      title: "Sword Art Online Vol. 1", author: "Reki Kawahara", image: "https://images-na.ssl-images-amazon.com/images/I/51UVCfCXmzL._SX331_BO1,204,203,200_.jpg", coverType: "Paperback", price: 12.99
    },
    {
      title: "Sword Art Online Vol. 1", author: "Reki Kawahara", image: "https://images-na.ssl-images-amazon.com/images/I/51UVCfCXmzL._SX331_BO1,204,203,200_.jpg", coverType: "Paperback", price: 12.99
    },
    {
      title: "Sword Art Online Vol. 1", author: "Reki Kawahara", image: "https://images-na.ssl-images-amazon.com/images/I/51UVCfCXmzL._SX331_BO1,204,203,200_.jpg", coverType: "Paperback", price: 12.99
    },
    {
      title: "Sword Art Online Vol. 1", author: "Reki Kawahara", image: "https://images-na.ssl-images-amazon.com/images/I/51UVCfCXmzL._SX331_BO1,204,203,200_.jpg", coverType: "Paperback", price: 12.99
    },
    {
      title: "Sword Art Online Vol. 1", author: "Reki Kawahara", image: "https://images-na.ssl-images-amazon.com/images/I/51UVCfCXmzL._SX331_BO1,204,203,200_.jpg", coverType: "Paperback", price: 12.99
    }];

    const listCards = cards.map((card) =>
      <SwiperSlide>
        <div className={style.carouselItem}>
          <BookCard 
            title={card.title} 
            author={card.author} 
            image={card.image} 
            coverType={"Paperback"} 
            price={card.price}
          />
        </div>
      </SwiperSlide>
    );
    
    return (
      <>
      <h1 className={style.carouselText}>{text}</h1>
      <Swiper
      className={style.swiper}
      slidesPerView={5}
      slidesPerGroup={1}
      loop={true}
      navigation
      centeredSlides={true}
      loopFillGroupWithBlank={true}
      pagination={{
        enabled: false
      }}
      modules={[Pagination, Navigation]}
    >
      {listCards}
    </Swiper>
    </>
    )
}
