import type { NextPage } from "next"
import { Hero } from "components/Hero"
import styles from "scss/layouts/index.module.scss"
import carousel from "scss/components/Carousel.module.scss"
import { Carousel } from "components/Carousel"
import { SwiperSlide } from "swiper/react"
import { BookCard } from "components/BookCard"
import ScifiIcon from "assets/scifi.svg"
import ActionIcon from "assets/action.svg"
import MysteryIcon from "assets/mystery.svg"
import ComedyIcon from "assets/comedy.svg"
import ThrillerIcon from "assets/thriller.svg"
import RomanceIcon from "assets/romance.svg"
import { IconTextCard } from "components/IconTextCard"

const Home: NextPage = () => {
    const cards = [
        {
            title: "Sword Art Online Vol. 1",
            author: "Reki Kawahara",
            image: "https://images-na.ssl-images-amazon.com/images/I/51UVCfCXmzL._SX331_BO1,204,203,200_.jpg",
            coverType: "Paperback",
            price: 12.99,
        },
        {
            title: "Sword Art Online Vol. 1",
            author: "Reki Kawahara",
            image: "https://images-na.ssl-images-amazon.com/images/I/51UVCfCXmzL._SX331_BO1,204,203,200_.jpg",
            coverType: "Paperback",
            price: 12.99,
        },
        {
            title: "Sword Art Online Vol. 1",
            author: "Reki Kawahara",
            image: "https://images-na.ssl-images-amazon.com/images/I/51UVCfCXmzL._SX331_BO1,204,203,200_.jpg",
            coverType: "Paperback",
            price: 12.99,
        },
        {
            title: "Sword Art Online Vol. 1",
            author: "Reki Kawahara",
            image: "https://images-na.ssl-images-amazon.com/images/I/51UVCfCXmzL._SX331_BO1,204,203,200_.jpg",
            coverType: "Paperback",
            price: 12.99,
        },
        {
            title: "Sword Art Online Vol. 1",
            author: "Reki Kawahara",
            image: "https://images-na.ssl-images-amazon.com/images/I/51UVCfCXmzL._SX331_BO1,204,203,200_.jpg",
            coverType: "Paperback",
            price: 12.99,
        },
        {
            title: "Sword Art Online Vol. 1",
            author: "Reki Kawahara",
            image: "https://images-na.ssl-images-amazon.com/images/I/51UVCfCXmzL._SX331_BO1,204,203,200_.jpg",
            coverType: "Paperback",
            price: 12.99,
        },
    ]
    const genres = [
        {
            icon: <ActionIcon />,
            text: "Action",
        },
        {
            icon: <MysteryIcon />,
            text: "Mystery",
        },
        {
            icon: <ScifiIcon />,
            text: "Sci-Fi",
        },
        {
            icon: <ComedyIcon />,
            text: "Comedy",
        },
        {
            icon: <ThrillerIcon />,
            text: "Thriller",
        },
        {
            icon: <RomanceIcon />,
            text: "Romance",
        },
    ]

    const listGenres = genres.map((genre) => (
        <div className={carousel.carouselItem}>
            <IconTextCard
              icon={genre.icon}
              text={genre.text}
            />
        </div>
    ))

    const listCards = cards.map((card) => (
            <div className={carousel.carouselItem}>
                <BookCard
                    title={card.title}
                    author={card.author}
                    image={card.image}
                    coverType={"Paperback"}
                    price={card.price}
                />
            </div>
    ))

    return (
        <>
            <Hero />
            <div className={styles.bottomLanding}>
                <section className={styles.books}>
                    <h3 className={styles.subtitle}>Book Selection</h3>
                    <Carousel count={4} children={listCards}/>
                </section>
                <section className={styles.genre}>
                    <h3 className={styles.subtitle}>Genres</h3>
                    <Carousel count={5} children={listGenres}/>
                </section>
            </div>
        </>
    )
}

export default Home
