import { ArticleCard } from "components/ArticleCard"
import { fetchAPI } from "lib/strapi"
import cx from "classnames"
import type { NextPage } from "next"
import Link from "next/link"
import styles from "scss/layouts/blog.module.scss"
import Head from "next/head"

const Blog: NextPage = ({ articles }) => {
    const sorted = articles.sort((a, b) => new Date(b.attributes.published_at) - new Date(a.attributes.published_at))
    const latestThree = sorted.slice(0, 3)
    const rest = sorted.slice(3, sorted.length)
    const CardLink = ({ className = "", article }) =>
        article !== undefined ? (
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
        ) : (
            <></>
        )
    return (
        <div className={styles.blogContainer}>
            <Head>
                <title>MME | Blog</title>
            </Head>
            {articles.length > 0 ? (
                <>
                    <h2 className={styles.title}>Artículos Recientes</h2>
                    <div className={styles.fibGrid}>
                        <CardLink className={styles.first} article={latestThree[0]} />
                        <CardLink article={latestThree[1]} />
                        <CardLink article={latestThree[2]} />
                    </div>
                    <h2 className={styles.title}>Todos Los Artículos</h2>
                    <div className={styles.articleGrid}>
                        {rest.map((article) => (
                            <CardLink article={article} />
                        ))}
                    </div>
                </>
            ) : (
                <h2 className={styles.title}>No hay artículos de blog actualmente</h2>
            )}
        </div>
    )
}

export default Blog

export const getServerSideProps = async () => {
    const articlesRes = await fetchAPI("/articles", { populate: ["image", "category"] })

    return {
        props: {
            articles: articlesRes.data,
        },
    }
}
