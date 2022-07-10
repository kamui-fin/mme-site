import cx from "classnames"
import styles from "scss/components/IconButton.module.scss"

interface Props {
    icon: React.ReactNode
    color?: "primary" | "secondary"
    shape?: "circle" | "square"
    className?: string
}

export const IconButton = ({icon, shape = "circle", color = "primary", className}: Props) => {
    return (
        <div className={className + " " + cx(styles.iconBtn, {
            [styles.circle]: shape === "circle", 
            [styles.primary]: color === "primary",
            [styles.secondary]: color === "secondary",
        })}>
            {icon}
        </div>
    )
}
