import { BookCard } from "components/BookCard"
import BreadCrumbs from "components/BreadCrumbs"
import { Carousel } from "components/Carousel"
import { ProductDetail } from "components/ProductDetail"
import type { GetServerSideProps, GetStaticProps, NextPage } from "next"
import styles from "scss/layouts/product.module.scss"
import { fetchAPI } from "lib/api-strapi/api"

const Product: NextPage = ({ book, related }) => {
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
                <BreadCrumbs
                    className={styles.breadcrumbs}
                    path={[
                        { name: "Home", href: "/" },
                        { name: "Store", href: "/products" },
                    ]}
                />
                <ProductDetail {...book.attributes} />
            </div>
            <div className={styles.related}>
                <h1>You may also like</h1>
                <Carousel width={"80%"} count={4} children={listCards} />
            </div>
        </div>
    )
}

export default Product

export const getServerSideProps = async (context): GetServerSideProps => {
    const { id } = context.params
    const book = await fetchAPI(`/products/${id}`, { populate: ["image", "genre"] })
    const related = await fetchAPI("/products", {
        populate: ["image", "genre"],
        filters: {
            $or: [
                {
                    author: {
                        $eq: book.data.attributes.author,
                    },
                },
                {
                    genre: {
                        name: {
                            $eq: book.data.attributes.genre.data.attributes.name,
                        },
                    },
                },
            ],
            id: {
                $ne: id,
            },
        },
    })
    return {
        props: {
            book: book.data,
            related: related.data,
        },
    }
}
