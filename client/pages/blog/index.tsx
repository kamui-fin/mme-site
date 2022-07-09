import { ArticleCard } from "components/ArticleCard"
import { fetchAPI } from "lib/api-strapi/api"
import cx from "classnames"
import type { NextPage } from "next"
import Link from "next/link"
import styles from "scss/layouts/blog.module.scss"

const Blog: NextPage = ({ articles }) => {
    const sorted = articles.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
    const latestThree = sorted.slice(0, 3)
    const rest = sorted.slice(3, sorted.length)
    const CardLink = ({ className = "", article }) => (
        <Link href={`/blog/${article.attributes.slug}`}>
            <a className={cx(styles.link, className)}>
                <ArticleCard
                    className={styles.card}
                    title={article.attributes.title}
                    image={article.attributes.image}
                    date={article.attributes.published_at}
                    duration={article.attributes.duration}
                />
            </a>
        </Link>
    )
    return (
        <main className={styles.main}>
            <h2>Latest Articles</h2>
            <div className={styles.fibGrid}>
                {/* First three */}
                <CardLink className={styles.first} article={latestThree[0]} />
                <div className={styles.col}>
                    <CardLink article={latestThree[1]} />
                    <CardLink article={latestThree[2]} />
                </div>
            </div>
            <h2>All Articles</h2>
            <div className={styles.articleGrid}>
                {rest.map((article) => (
                    <CardLink article={article} />
                ))}
            </div>
        </main>
    )
}

export default Blog

export const getStaticProps = async () => {
    const articlesRes = await fetchAPI("/articles", { populate: ["image", "category"] })

    return {
        props: {
            articles: articlesRes.data,
        },
        revalidate: 1,
    }
}
