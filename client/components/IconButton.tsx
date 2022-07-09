import cx from "classnames"
import styles from "scss/components/IconButton.module.scss"

interface Props {
    icon: React.ReactNode
    color?: "primary" | "secondary"
    shape?: "circle" | "square"
}

export const IconButton = ({icon, shape = "circle", color = "primary"}: Props) => {
    return (
        <div className={cx(styles.iconBtn, {
            [styles.circle]: shape === "circle", 
            [styles.primary]: color === "primary",
            [styles.secondary]: color === "secondary",
        })}>
            {icon}
        </div>
    )
}
