import BreadCrumbs from 'components/BreadCrumbs'
import { Input } from 'components/Input'
import type { NextPage } from 'next'
import SearchIcon from "assets/search.svg"
import SortIcon from "assets/sort.svg"
import { Select } from 'components/Select'
import { BookCard } from 'components/BookCard'
import styles from "scss/layouts/store.module.scss"
import Button from 'components/Button'
import RangeInput from 'components/RangeInput'
import Checkbox from 'components/Checkbox'
import { fetchAPI } from 'lib/api-strapi/api'

const Store: NextPage = ({ books }) => {
    // temp
    // const book = {
    //     title: "Sword Art Online Vol. 1",
    //     desc: "In the near future, a Virtual Reality Massive Multiplayer Online Role-Playing Game (VRMMORPG) called Sword Art Online has been released where players control their avatars with their bodies using a piece of technology called Nerve Gear. One day, players discover they cannot log out, as the game creator is holding them captive unless they reach the 100th floor of the game's tower and defeat the final boss. An anime television series produced by A-1 Pictures, known simply as Sword Art Online, aired in Japan between July and December 2012, with a television film Sword Art Online: Extra Edition airing on December 31, 2013, and a second season, titled Sword Art Online II, airing between July and December 2014. An animated film titled Sword Art Online The Movie: Ordinal Scale, featuring an original story by Kawahara, premiered in Japan and Southeast Asia on February 18, 2017, and was released in the United States on March 9, 2017. A spin-off anime series titled Sword Art Online Alternative Gun Gale Online premiered in April 2018, while a third season titled Sword Art Online: Alicization aired from October 2018 to September 2020.",
    //     author: "Reki Kawahara",
    //     image: "/sao.png",
    //     coverType: "Paperback",
    //     price: 12.99,
    // }
    // const books = [...Array(8).keys()].map(() => book)
    return (
        <div className={styles.store}>
            <aside className={styles.filterBar}>
                <div>
                    <h3>Price €</h3>
                    <RangeInput />
                </div>
                <div className={styles.checkGroup}>
                    <h3>Genre</h3>
                    <div>
                        <Checkbox />
                        <label>Action</label>
                    </div>
                    <div>
                        <Checkbox />
                        <label>Comedy</label>
                    </div>
                    <div>
                        <Checkbox />
                        <label>Fantasy</label>
                    </div>
                    <div>
                        <Checkbox />
                        <label>Sci-Fi</label>
                    </div>
                </div>
                <div>
                <div className={styles.checkGroup}>
                    <h3>Cover</h3>
                        <div>
                            <Checkbox />
                            <label>Paperback</label>
                        </div>
                        <div>
                            <Checkbox />
                            <label>Hardcover</label>
                        </div>
                        <div>
                            <Checkbox />
                            <label>Digital</label>
                        </div>
                    </div>
                </div>
                <div className={styles.checkGroup}>
                    <h3>Availability</h3>
                    <div>
                        <Checkbox />
                        <label>Paperback</label>
                    </div>
                    <div>
                        <Checkbox />
                        <label>Hardcover</label>
                    </div>
                    <div>
                        <Checkbox />
                        <label>Digital</label>
                    </div>
                </div>
                <Button btnType="secondary">Apply Filter</Button>
            </aside>
            <section className={styles.mainContainer}>
                <BreadCrumbs path={[{name: "Home", href: "/"}, {name: "Store", href: "/products"}]}/>
                <h1>Catalog</h1>
                <div className={styles.searchSort}>
                    <Input icon={<SearchIcon />} placeholder="Search"/>
                    <Select icon={<SortIcon />} items={["Popular"]} />
                </div>
                <div className={styles.bookGrid}>
                    {books.map(book => (
                        <BookCard
                            className={styles.bookCard}
                            title={book.attributes.title}
                            author={book.attributes.author}
                            image={book.attributes.image}
                            coverType={book.attributes.coverType}
                            price={book.attributes.price}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Store

export const getStaticProps = async () => {
    const booksRes = await fetchAPI("/products", { populate: ["image", "genre"] })

    return {
        props: {
            books: booksRes.data,
        },
        revalidate: 1,
    }
}
