import { BookCard } from 'components/BookCard'
import BreadCrumbs from 'components/BreadCrumbs'
import { Carousel } from 'components/Carousel'
import { ProductDetail } from 'components/ProductDetail'
import type { GetStaticProps, NextPage } from 'next'
import styles from "scss/layouts/product.module.scss"
import { fetchAPI } from 'lib/api-strapi/api'

const Product: NextPage = ({book, related}) => {
    const listCards = related.map((card) => (
        <BookCard
            id={card.id}
            title={card.attributes.title}
            author={card.attributes.author}
            image={card.attributes.image}
            coverType={"Paperback"}
            price={card.attributes.price}
        />
    ))
    return (
        <div>
            <div className={styles.detailContainer}>
                <BreadCrumbs className={styles.breadcrumbs} path={[{name: "Home", href: "/"}, {name: "Store", href: "/products"}]}/>
                <ProductDetail {...book.attributes}/>
            </div>
            <div className={styles.related}>
                <h1>You may also like</h1>
                <Carousel count={4} className={styles.bookCarousel} children={listCards} width={"60%"} />
            </div>
        </div>
    )
}

export default Product

export const getStaticProps = async (context): GetStaticProps => {
    const {id} = context.params
    const book = await fetchAPI(`/products/${id}`, { populate: ["image"] })
    // temporary
    const related = await fetchAPI(`/products`, { populate: ["image"] })
    return {
        props: {
            book: book.data,
            related: related.data
        }
    }
}

export const getStaticPaths = async () => {
    const books = await fetchAPI(`/products`)
    const ids = books.data.map(book => book.id)
    const paths = ids.map((id: number) => {
        return {
            params: {
                id: id.toString()
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}
