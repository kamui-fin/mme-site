import React, { useEffect } from "react"
import cx from "classnames"
import Button from "./Button"
import styles from "scss/components/CartDrawer.module.scss"
import Image from "next/image"
import { useState } from "react"
import CartItem from "./CartItem"

interface Props {
    className?: string
    total?: number
    shippingCost?: number
    setCartToggle: any
    cartToggle: boolean
}

function CartDrawer ({ className, shippingCost, total, setCartToggle, cartToggle } : Props) {
    return (
        <>
        <div className={styles.container} style={{display: (cartToggle) ? "flex" : "none"}}>
        <div className={cx(styles.drawer, className)}>
            <div className={styles.close}>
                <button onClick={() => {
                    setCartToggle(!cartToggle)
                }}>
                    <Image src="/close.png" width={48} height={48} />
                </button>
            </div>
            <div className={styles.items}>
                {/* {books.map((book) => (
                    <CartItem
                        image={book.attributes.image}
                        label={book.attributes.label}
                        price={book.attributes.price} 
                        quantity={1}
                    />
                ))} */}
            </div>
            <div className={styles.totalContainer}>
            <div className={styles.totals}>
                <div className={styles.totalsItem}>
                    <h3>Shipping Cost</h3>
                    <h3>Total</h3>
                </div>
                <div className={styles.totalsItem}>
                    <p><strong>€</strong>{total ? total : "0.00"}</p>
                    <p><strong>€</strong>{shippingCost ? shippingCost : "0.00"}</p>
                </div>
            </div>
            </div>
            <div className={styles.buttons}>
                <Button onDone={() => setCartToggle(!cartToggle)} btnType="primary" children={<>Shop More</>}/>
                <Button btnType="secondary" children={<>Checkout</>}/>
            </div>
        </div>
        </div>
        </>
    )
}

export default CartDrawer