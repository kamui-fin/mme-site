import type { GetStaticProps, NextPage } from "next"
import { Hero } from "components/Hero"
import styles from "scss/layouts/index.module.scss"
import carousel from "scss/components/Carousel.module.scss"
import { Carousel } from "components/Carousel"
import { BookCard } from "components/BookCard"
import ScifiIcon from "assets/scifi.svg"
import ActionIcon from "assets/action.svg"
import MysteryIcon from "assets/mystery.svg"
import ComedyIcon from "assets/comedy.svg"
import ThrillerIcon from "assets/thriller.svg"
import RomanceIcon from "assets/romance.svg"
import { IconTextCard } from "components/IconTextCard"
import { fetchAPI } from "lib/api-strapi/api"

const Home: NextPage = ({ books, genres }) => {
    console.log(books, genres)
    const listGenres = genres.map((genre) => (
        <div className={carousel.carouselItem}>
            <IconTextCard text={genre.attributes.name} />
        </div>
    ))

    const listBooks = books.map((book) => (
        <div className={carousel.carouselItem}>
            <BookCard
                title={book.attributes.title}
                author={book.attributes.author}
                image={book.attributes.image}
                coverType={"Paperback"}
                price={book.attributes.price}
            />
        </div>
    ))

    return (
        <>
            <Hero />
            <div className={styles.bottomLanding}>
                <section className={styles.books}>
                    <h3 className={styles.subtitle}>Book Selection</h3>
                    <Carousel width={"60%"} count={4} children={listBooks} />
                </section>
                <section className={styles.genre}>
                    <h3 className={styles.subtitle}>Genres</h3>
                    <Carousel width={"60%"} count={5} children={listGenres} />
                </section>
            </div>
        </>
    )
}

export default Home

export const getStaticProps = async (context): GetStaticProps => {
    const books = await fetchAPI("/products", { populate: ["image"] })
    const genres = await fetchAPI("/genres")
    console.log(books, genres)
    return {
        props: {
            books: books.data,
            genres: genres.data,
        },
    }
}
