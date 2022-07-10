import { BookCard } from 'components/BookCard'
import BreadCrumbs from 'components/BreadCrumbs'
import { Carousel } from 'components/Carousel'
import carousel from "scss/components/Carousel.module.scss"
import { ProductDetail } from 'components/ProductDetail'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SwiperSlide } from 'swiper/react'
import styles from "scss/layouts/product.module.scss"

const Product: NextPage = () => {
    const router = useRouter()
    const { pid } = router.query
    // temp data
    const book = {
        title: "Sword Art Online Vol. 1",
        desc: "In the near future, a Virtual Reality Massive Multiplayer Online Role-Playing Game (VRMMORPG) called Sword Art Online has been released where players control their avatars with their bodies using a piece of technology called Nerve Gear. One day, players discover they cannot log out, as the game creator is holding them captive unless they reach the 100th floor of the game's tower and defeat the final boss. An anime television series produced by A-1 Pictures, known simply as Sword Art Online, aired in Japan between July and December 2012, with a television film Sword Art Online: Extra Edition airing on December 31, 2013, and a second season, titled Sword Art Online II, airing between July and December 2014. An animated film titled Sword Art Online The Movie: Ordinal Scale, featuring an original story by Kawahara, premiered in Japan and Southeast Asia on February 18, 2017, and was released in the United States on March 9, 2017. A spin-off anime series titled Sword Art Online Alternative Gun Gale Online premiered in April 2018, while a third season titled Sword Art Online: Alicization aired from October 2018 to September 2020.",
        author: "Reki Kawahara",
        image: "/sao.png",
        coverType: "Paperback",
        price: 12.99,
    }
    const related = [...Array(4).keys()].map(() => book)
    const listCards = related.map((card) => (
        <SwiperSlide>
            <div className={carousel.carouselItem}>
                <BookCard
                    title={card.title}
                    author={card.author}
                    image={card.image}
                    coverType={"Paperback"}
                    price={card.price}
                />
            </div>
        </SwiperSlide>
    ))
    return (
        <div>
            <div className={styles.detailContainer}>
                <BreadCrumbs className={styles.breadcrumbs} path={[{name: "Home", href: "/"}, {name: "Store", href: "/products"}]}/>
                <ProductDetail {...book}/>
            </div>
            <div className={styles.related}>
                <h1>You may also like</h1>
                <Carousel count={4} className={styles.bookCarousel} children={listCards} />
            </div>
        </div>
    )
}

export default Product
