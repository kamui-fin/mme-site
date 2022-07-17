import type { GetServerSideProps, GetStaticProps, NextPage } from "next"
import { Hero } from "components/Hero"
import styles from "scss/layouts/index.module.scss"
import carousel from "scss/components/Carousel.module.scss"
import { Carousel } from "components/Carousel"
import { BookCard } from "components/BookCard"
import { IconTextCard } from "components/IconTextCard"
import { fetchAPI } from "lib/strapi"

const Home: NextPage = ({ books, genres }) => {
    const listGenres = genres.map((genre) => (
        <div className={carousel.carouselItem}>
            <IconTextCard text={genre.attributes.name} />
        </div>
    ))

    const listBooks = books.map((book) => (
        <div className={carousel.carouselItem}>
            <BookCard
                id={book.id}
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
            {books.length > 0 && (
                <div className={styles.bottomLanding}>
                    <section className={styles.books}>
                        <h3 className={styles.subtitle}>Book Selection</h3>
                        <Carousel width={"80%"} count={books.length >= 4 ? 4 : books.length} children={listBooks} />
                    </section>
                    <section className={styles.genre}>
                        <h3 className={styles.subtitle}>Genres</h3>
                        <Carousel width={"60%"} count={5} children={listGenres} />
                    </section>
                </div>
            )}
        </>
    )
}

export default Home

export const getServerSideProps = async (context): GetServerSideProps<> => {
    const books = await fetchAPI("/products", { populate: ["image"] })
    const randomTen = books.data.sort(() => 0.5 - Math.random()).slice(0, 10)
    const genres = await fetchAPI("/genres")
    return {
        props: {
            books: randomTen,
            genres: genres.data,
        },
    }
}
