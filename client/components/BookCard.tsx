import cx from "classnames"
import styles from "scss/components/BookCard.module.scss"
import Heart from "../assets/heart-filled.svg"
import Cart from "../assets/cart-filled.svg"
import { IconButton } from "./IconButton"
import { getStrapiMedia } from "lib/api-strapi/api"
import Link from "next/link"

interface Props {
    className?: string
    title: string
    author: string
    url: string | object
    image: string
    coverType: "Paperback" | "Hardcover"
    price: number
}

export const BookCard = ({ title, author, image, coverType, price, url, className }: Props) => {
    return (
    <Link href={url || ""}>
        <div className={cx(styles.card, className)}>
            <img
                className={styles.image}
                src={getStrapiMedia(image)}
            />
            <div className={styles.textPart}>
                <h3 className={styles.title}>{title}</h3>
                <h5 className={styles.author}>{author}</h5>
                <p className={styles.coverType}>{coverType}</p>
                <div className={styles.bottom}>
                    <h3 className={styles.price}>${price}</h3>
                    <div className={styles.btns}>
                        <IconButton icon={<Heart />} color="primary" />
                        <IconButton icon={<Cart />} color="secondary" />
                    </div>
                </div>
            </div>
        </div>
    </Link>
    )
}
