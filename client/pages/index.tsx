import type { NextPage } from "next"
import { Hero } from "components/Hero"
import styles from "scss/layouts/index.module.scss"
import { Carousel } from "components/Carousel"

const Home: NextPage = () => {
    return (
        <>
            <Hero />
            <div className={styles.bottomLanding}>
                <section className={styles.books}>
                    <h3 className={styles.subtitle}>Book Selection</h3>
                    <Carousel className={styles.bookCarousel}/>
                </section>
                <section className={styles.genre}>
                    <h3 className={styles.subtitle}>Genres</h3>
                </section>
            </div>
        </>
    )
}

export default Home
