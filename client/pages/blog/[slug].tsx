import Moment from "react-moment"
import moment from "moment"
import ReactMarkdown from "react-markdown"
import { fetchAPI, getStrapiMedia } from "lib/api-strapi/api"
import BookOutline from "assets/book-outline.svg"
import ClockOutline from "assets/clock-outline.svg"
import styles from "scss/layouts/article.module.scss"

const Article = ({ article }) => {
    const imageUrl = getStrapiMedia(article.attributes.image)

    return (
        <div className={styles.container}>
            <div className={styles.meta}>
                <img className={styles.articleImage} src={imageUrl} />
                <h1 className={styles.title}>{article.attributes.title}</h1>
                {/* <p>By {article.attributes.author.data.attributes.name}</p> */}
                <span className={styles.iconText} style={{ marginRight: "1.4rem" }}>
                    <ClockOutline />
                    <Moment format="MMM Do YYYY">{article.attributes.published_at}</Moment>
                </span>
                <span className={styles.iconText}>
                    <BookOutline />
                    <span>{moment.duration(article.attributes.duration).humanize()}</span>
                </span>
            </div>
            <ReactMarkdown children={article.attributes.content} />
        </div>
    )
}

export async function getStaticPaths() {
    const articlesRes = await fetchAPI("/articles", { fields: ["slug"] })

    return {
        paths: articlesRes.data.map((article) => ({
            params: {
                slug: article.attributes.slug,
            },
        })),
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const articlesRes = await fetchAPI("/articles", {
        filters: {
            slug: params.slug,
        },
        populate: ["image"],
    })
    return {
        props: { article: articlesRes.data[0] },
        revalidate: 1,
    }
}

export default Article
