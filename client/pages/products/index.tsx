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
import { fetchAPI } from "lib/strapi"
import { useEffect, useRef, useState } from "react"
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
    const [width, setWidth] = useState(0)
    const componentRef = useRef(null)

    useEffect(() => {
        setWidth(componentRef.current.getBoundingClientRect().width)
    })

    const searchSort = () => {
        let res = items
        if (query !== "") {
            res = res.filter((item) => item.attributes.title.toLowerCase().includes(query))
        }
        if (sorting !== "") {
            switch (sorting) {
                case "Nombre A-Z":
                    res = res.sort((a, b) => a.attributes.title.localeCompare(b.attributes.title))
                    break
                case "Nombre Z-A":
                    res = res.sort((a, b) => b.attributes.title.localeCompare(a.attributes.title))
                    break
                case "Precios":
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
                newItems = newItems.filter((item) =>
                    item.attributes.genre.data.map((genre) => genreFilter.includes(genre.data.attributes.name)).some()
                )
            }
            if (coverFilter !== "") {
                newItems = newItems.filter((item) => item.attributes.coverType === coverFilter.toLowerCase())
            }
            if (availFilter) newItems = newItems.filter((item) => item.attributes.availability === availFilter.toLowerCase())
            setItems(newItems)
        }
    }

    const filterColumn = () => {
        return (
            <div className={styles.filterCol}>
                <aside className={styles.filterBar} style={{ display: width < 1300 ? (toggle ? "grid" : "none") : "" }}>
                    {toggle ? (
                        <button className={styles.close} onClick={() => applyFilters()}>
                            <Image src="/close.png" width={48} height={48} />
                        </button>
                    ) : null}
                    <div>
                        <h3>Precio €</h3>
                        <RangeInput
                            onDone={(min, max) => {
                                setPricingRange({ min, max })
                            }}
                        />
                    </div>
                    <div className={styles.checkGroup}>
                        <h3>Tapa Del Libro</h3>
                        {["Libro de bolsillo", "De tapa dura", "Digital"].map((cv) => (
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
                        <h3>Disponibilidad</h3>
                        {["Agotado", "En stock"].map((av) => (
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
                    <div className={styles.checkGroup}>
                        <h3>Género</h3>
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
                    {!toggle ? (
                        <Button btnType="secondary" onDone={applyFilters}>
                            Aplicar Filtro
                        </Button>
                    ) : null}
                </aside>
            </div>
        )
    }
    return (
        <div className={styles.store} ref={componentRef}>
            {filterColumn()}
            <section className={styles.mainContainer}>
                <h1 className={styles.catalogTitle}>Catalogar</h1>
                <div className={styles.searchSort}>
                    <Input icon={<SearchIcon />} placeholder="Búsqueda" onDone={(text) => setQuery(text)} />
                    <Select
                        icon={<SortIcon />}
                        items={["Nombre A-Z", "Nombre Z-A", "Precios"]}
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
