import cx from "classnames"
import styles from "scss/components/ProductDetail.module.scss"
import Heart from "../assets/heart-filled.svg"
import { IconButton } from "./IconButton"
import { Description } from "./Description"
import Button from "./Button"
import { getStrapiMedia } from "lib/api-strapi/api"

interface Props {
    className?: string
    title: string
    author: string
    description: string
    image: string
    coverType: "Paperback" | "Hardcover"
    price: number
}

export const ProductDetail = ({ title, author, image, coverType, price, description, className }: Props) => {
    return (
        <div className={cx(styles.container, className)}>
            <img className={styles.image}  src={getStrapiMedia(image)} />
            <div className={styles.textPart}>
                <h3 className={styles.title}>{title}</h3>
                <h5 className={styles.author}>{author}</h5>
                <p className={styles.coverType}>{coverType}</p>
                <h3 className={styles.price}>${price}</h3>
                <div className={styles.btns}>
                    <Button btnType="secondary">Add to Cart</Button>
                    <IconButton icon={<Heart />} shape="square" color="primary" />
                </div>
                <h3 className={styles.descTitle}>Description</h3>
                <Description desc={description} />
            </div>
        </div>
    )
}
