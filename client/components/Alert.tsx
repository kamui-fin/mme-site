import React from "react"
import cx from "classnames"
import styles from "scss/components/Alert.module.scss"

interface Props {
    type: "error" | "success"
    className?: string
    children: React.ReactNode
}

const Alert = ({ type = "error", className, children }: Props) => {
    return (
        <div className={cx(styles.alert, className, { [styles.green]: type === "success", [styles.red]: type === "error" })}>
            <p>{children}</p>
        </div>
    )
}

export default Alert
