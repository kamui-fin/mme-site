import Moment from "react-moment"
import moment from "moment"
import ReactMarkdown from "react-markdown"
import { fetchAPI, getStrapiMedia } from "lib/strapi"
import BookOutline from "assets/book-outline.svg"
import ClockOutline from "assets/clock-outline.svg"
import styles from "scss/layouts/article.module.scss"
import BreadCrumbs from "components/BreadCrumbs"

const Article = ({ article }) => {
    const imageUrl = getStrapiMedia(article.attributes.image)

    return (
        <div className={styles.container}>
            <BreadCrumbs
                className={styles.crumbs}
                path={[
                    { name: "Home", href: "/" },
                    { name: "Articles", href: "/blog" },
                ]}
            />
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
            <ReactMarkdown className={styles.markdown} children={article.attributes.content} />
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const articlesRes = await fetchAPI("/articles", {
        filters: {
            slug: params.slug,
        },
        populate: ["image"],
    })
    return {
        props: { article: articlesRes.data[0] },
    }
}

export default Article
