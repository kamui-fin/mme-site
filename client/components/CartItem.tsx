import React from "react"
import cx from "classnames"
import styles from "scss/components/CartItem.module.scss"
import Image from "next/image"
import { useState } from "react"

interface Props {
    className?: string
    image: string
    label: string
    price: number
    quantity: number
}

const CartItem = ({ className, image, label, price, quantity }: Props) => {
    const [toggle, setToggle] = useState(false)
    return (
        <>
        <div className={styles.item} style={{display: toggle ? "none" : "flex"}}>
        <div className={cx(styles.totalContainer, className)}>
            <div className={styles.itemInfo}>
                <div className={styles.product}>
                    <h3>{label}</h3>
                    {/* <img className={styles.image} src={getStrapiMedia(image)} /> */}
                    <img className={styles.image} src={image} />
                </div>
                <div className={styles.iconContainer}>
                <button onClick={() => setToggle(!toggle)}>
                        <Image src="/trash.png" width={25} height={25} />
                </button>
                </div>
            </div>
            <div className={styles.totals}>
                <div className={styles.totalsItem}>
                    <h3>Total</h3>
                    <p><strong>€</strong>{price ? price : "0.00"}</p>
                </div>
                <div className={styles.totalsItem}>
                    <h3>Quantity</h3>
                    <p>{quantity ? quantity : "0"}</p>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default CartItem