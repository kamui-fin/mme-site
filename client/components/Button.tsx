import React from "react"
import cx from "classnames"
import styles from "scss/components/Button.module.scss"

interface Props {
    btnType: "primary" | "secondary"
    children: React.ReactNode
    className?: string
}

const Button = ({ btnType = "primary", className, children, onDone }: Props) => {
    return (
        <button
            className={cx(styles.btn, className, {
                [styles.primary]: btnType === "primary",
                [styles.secondary]: btnType === "secondary",
            })}
            onClick={onDone}
        >
            {children}
        </button>
    )
}

export default Button
