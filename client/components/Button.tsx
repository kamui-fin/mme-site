import React, { ButtonHTMLAttributes } from "react"
import cx from "classnames"
import styles from "scss/components/Button.module.scss"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    btnType?: "primary" | "secondary"
    children: React.ReactNode
    onDone?: () => void
    className?: string
}

const Button = ({ btnType = "primary", className, children, onDone, ...rest }: Props) => {
    return (
        <button
            className={cx(styles.btn, className, {
                [styles.primary]: btnType === "primary",
                [styles.secondary]: btnType === "secondary",
            })}
            onClick={onDone}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button
