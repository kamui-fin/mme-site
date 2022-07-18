import cx from "classnames"
import styles from "scss/components/ProductDetail.module.scss"
import Heart from "../assets/heart-filled.svg"
import { IconButton } from "./IconButton"
import { Description } from "./Description"
import Button from "./Button"
import { getStrapiMedia } from "lib/strapi"
import { useState } from "react"
import Link from "next/link"

interface Props {
    className?: string
    title: string
    author: string
    description: string
    image: string
    coverType: string
    price: number
    availability: string
    preorderDate: string
    purchaseLink: string
    promoCodeText: string
}

export const ProductDetail = ({
    availability,
    preorderDate,
    promoCodeText,
    purchaseLink,
    title,
    author,
    image,
    coverType,
    price,
    description,
    className,
}: Props) => {
    const [toggle, setToggle] = useState(false)
    return (
        <div className={cx(styles.container, className)}>
            <img className={styles.image} src={getStrapiMedia(image)} />
            <div className={styles.textPart}>
                <h3 className={styles.title}>{title}</h3>
                <h5 className={styles.author}>{author}</h5>
                <p className={styles.preOrderDate}>
                    {availability === "agotado" ? `Preorder Date: ${preorderDate}` : "En Stock"}
                </p>
                <p className={styles.coverType}>{coverType}</p>
                <h3 className={styles.price}>€{price}</h3>
                <div className={styles.btns}>
                    <Link href={purchaseLink ? purchaseLink : "/404"} passHref={true}>
                        <a>
                            <Button btnType="secondary">Comprar Libro</Button>
                        </a>
                    </Link>
                </div>
                {promoCodeText !== null && <h3 className={styles.promoCode}>{promoCodeText}</h3>}
                <h3 className={styles.descTitle}>Descripción</h3>
                <Description desc={description} />
            </div>
        </div>
    )
}
