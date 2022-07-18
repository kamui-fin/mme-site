import { BookCard } from "components/BookCard"
import BreadCrumbs from "components/BreadCrumbs"
import { Carousel } from "components/Carousel"
import { ProductDetail } from "components/ProductDetail"
import type { GetServerSideProps, GetStaticProps, NextPage } from "next"
import styles from "scss/layouts/product.module.scss"
import carousel from "scss/components/Carousel.module.scss"
import { fetchAPI } from "lib/strapi"

const Product: NextPage = ({ book, related }) => {
    const listCards = related.map((card) => (
        <div className={carousel.carouselItem}>
            <BookCard
                id={card.id}
                title={card.attributes.title}
                author={card.attributes.author}
                image={card.attributes.image}
                coverType={book.attributes.coverType}
                price={card.attributes.price}
            />
        </div>
    ))
    return (
        <div>
            <div className={styles.detailContainer}>
                <BreadCrumbs
                    className={styles.breadcrumbs}
                    path={[
                        { name: "Hogar", href: "/" },
                        { name: "Tienda", href: "/products" },
                    ]}
                />
                <ProductDetail {...book.attributes} />
            </div>
            {related.length !== 0 && (
                <div className={styles.related}>
                    <h1>También te puede gustar</h1>
                    <Carousel width={"80%"} count={related.length >= 4 ? 4 : related.length} children={listCards} />
                </div>
            )}
        </div>
    )
}

export default Product

export const getServerSideProps = async (context): GetServerSideProps => {
    const { id } = context.params
    const book = await fetchAPI(`/products/${id}`, { populate: ["image", "genre"] })
    const genreNames = await book.data.attributes.genre.data.map(genre => genre.attributes.name)
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
                            $in: genreNames
                        }
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
