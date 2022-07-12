import BreadCrumbs from "components/BreadCrumbs"
import { Input } from "components/Input"
import type { NextPage } from "next"
import SearchIcon from "assets/search.svg"
import SortIcon from "assets/sort.svg"
import { Select } from "components/Select"
import { BookCard } from "components/BookCard"
import styles from "scss/layouts/store.module.scss"
import Button from "components/Button"
import RangeInput from "components/RangeInput"
import Checkbox from "components/Checkbox"
import { fetchAPI } from "lib/api-strapi/api"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import button from "scss/components/Button.module.scss"
import cx from "classnames"
import Image from "next/image"

const Store: NextPage = ({ books, genres }) => {
    const [items, setItems] = useState(books)
    const [sorting, setSorting] = useState("Name A-Z")
    const [query, setQuery] = useState("")
    const [pricingRange, setPricingRange] = useState({ min: Number.MIN_VALUE, max: Number.MAX_VALUE })
    const [genreFilter, setGenreFilter] = useState([])
    const [coverFilter, setCoverFilter] = useState("")
    const [availFilter, setAvailFilter] = useState("")
    const [toggle, setToggle] = useState(false)
    const dynamicRoute = useRouter().asPath
    useEffect(() => setToggle(false), [dynamicRoute])

    const searchSort = () => {
        let res = items
        if (query !== "") {
            res = res.filter((item) => item.attributes.title.toLowerCase().includes(query))
        }
        if (sorting !== "") {
            switch (sorting) {
                case "Name A-Z":
                    res = res.sort((a, b) => a.attributes.title.localeCompare(b.attributes.title))
                    break
                case "Name Z-A":
                    res = res.sort((a, b) => b.attributes.title.localeCompare(a.attributes.title))
                    break
                case "Pricing":
                    res = res.sort((a, b) => a.attributes.price - b.attributes.price)
                    break
            }
        }
        return res
    }

    const applyFilters = () => {
        setToggle(false)
        if (pricingRange.min <= pricingRange.max) {
            let newItems = books.filter(
                (item) => item.attributes.price >= pricingRange.min && item.attributes.price <= pricingRange.max
            )
            if (genreFilter.length !== 0) {
                newItems = newItems.filter((item) => genreFilter.includes(item.attributes.genre.data.attributes.name))
            }
            if (coverFilter !== "") {
                newItems = newItems.filter((item) => item.attributes.coverType === coverFilter.toLowerCase())
            }
            if (availFilter) newItems = newItems.filter((item) => item.attributes.availability === availFilter.toLowerCase())
            setItems(newItems)
        }
    }

    const mobileColumn = () => {
        return (
            <aside className={styles.filterMobile} style={{ display: toggle ? "flex" : "none" }}>
                <button className={styles.close} onClick={() => applyFilters()}>
                    <Image src="/close.png" width={48} height={48} />
                </button>
                <div className={styles.mobileWrapper}>
                    <div>
                        <h3>Price €</h3>
                        <RangeInput
                            onDone={(min, max) => {
                                setPricingRange({ min, max })
                            }}
                        />
                    </div>
                    <div className={styles.checkGroup}>
                        <h3>Genre</h3>
                        {genres.map((genre) => (
                            <div>
                                <Checkbox
                                    onDone={(checked) => {
                                        if (!checked) {
                                            setGenreFilter(genreFilter.filter((g: string) => g !== genre))
                                        } else {
                                            setGenreFilter([...genreFilter, genre])
                                        }
                                    }}
                                />
                                <label>{genre}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.checkGroup}>
                        <h3>Cover</h3>
                        {["Paperback", "Hardcover", "Digital"].map((cv) => (
                            <div>
                                <Checkbox
                                    checked={coverFilter === cv}
                                    onDone={(checked) => {
                                        setCoverFilter(checked ? cv : "")
                                    }}
                                />
                                <label>{cv}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.checkGroup}>
                        <h3>Availability</h3>
                        {["Pre-Order", "In-Stock"].map((av) => (
                            <div>
                                <Checkbox
                                    checked={availFilter === av}
                                    onDone={(checked) => {
                                        setAvailFilter(checked ? av : "")
                                    }}
                                />
                                <label>{av}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        )
    }

    const filterColumn = () => {
        return (
            <div className={styles.filterCol}>
                <aside className={styles.filterBar}>
                    <div>
                        <h3>Price €</h3>
                        <RangeInput
                            onDone={(min, max) => {
                                setPricingRange({ min, max })
                            }}
                        />
                    </div>
                    <div className={styles.checkGroup}>
                        <h3>Genre</h3>
                        {genres.map((genre) => (
                            <div>
                                <Checkbox
                                    onDone={(checked) => {
                                        if (!checked) {
                                            setGenreFilter(genreFilter.filter((g: string) => g !== genre))
                                        } else {
                                            setGenreFilter([...genreFilter, genre])
                                        }
                                    }}
                                />
                                <label>{genre}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.checkGroup}>
                        <h3>Cover</h3>
                        {["Paperback", "Hardcover", "Digital"].map((cv) => (
                            <div>
                                <Checkbox
                                    checked={coverFilter === cv}
                                    onDone={(checked) => {
                                        setCoverFilter(checked ? cv : "")
                                    }}
                                />
                                <label>{cv}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.checkGroup}>
                        <h3>Availability</h3>
                        {["Pre-Order", "In-Stock"].map((av) => (
                            <div>
                                <Checkbox
                                    checked={availFilter === av}
                                    onDone={(checked) => {
                                        setAvailFilter(checked ? av : "")
                                    }}
                                />
                                <label>{av}</label>
                            </div>
                        ))}
                    </div>
                    <Button btnType="secondary" onDone={applyFilters}>
                        Apply Filter
                    </Button>
                </aside>
            </div>
        )
    }

    return (
        <div className={styles.store}>
            {filterColumn()}
            {mobileColumn()}
            <section className={styles.mainContainer}>
                {/* <BreadCrumbs
                    path={[
                        { name: "Home", href: "/" },
                        { name: "Store", href: "/products" },
                    ]}
                /> */}
                <h1 className={styles.catalogTitle}>Catalog</h1>
                <div className={styles.searchSort}>
                    <Input icon={<SearchIcon />} placeholder="Search" onDone={(text) => setQuery(text)} />
                    <Select
                        icon={<SortIcon />}
                        items={["Name A-Z", "Name Z-A", "Pricing"]}
                        onDone={(option) => {
                            setSorting(option)
                        }}
                    />
                    <button className={cx(button.btn, button.secondary, styles.button)} onClick={() => setToggle(!toggle)}>
                        Sort Filter
                    </button>
                </div>
                <div className={styles.bookGrid}>
                    {searchSort(items).map((book) => (
                        <BookCard
                            className={styles.bookCard}
                            id={book.id}
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

export const getServerSideProps = async () => {
    const booksRes = await fetchAPI("/products", { populate: ["image", "genre"] })
    const genres = await fetchAPI("/genres")
    const genreNames = genres.data.map((genre) => genre.attributes.name)
    return {
        props: {
            books: booksRes.data,
            genres: genreNames,
        },
    }
}
