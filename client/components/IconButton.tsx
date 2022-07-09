import cx from "classnames"
import styles from "scss/components/IconButton.module.scss"

interface Props {
    icon: React.ReactNode
    color: "primary" | "secondary"
}

export const IconButton = ({icon, color}: Props) => {
    return (
        <div className={cx(styles.circle, {
            [styles.primary]: color === "primary",
            [styles.secondary]: color === "secondary",
        })}>
            {icon}
        </div>
    )
}
