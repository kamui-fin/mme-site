import cx from "classnames"
import styles from "scss/components/IconButton.module.scss"

interface Props {
    icon: React.ReactNode
    color?: "primary" | "secondary" | "active"
    shape?: "circle" | "square"
    className?: string
    onClick?: any
    active?: boolean
}

export const IconButton = ({active, onClick, icon, shape = "circle", color = "primary", className}: Props) => {
    active ? color = "active" : null
    return (
        <button className={className + " " + cx(styles.iconBtn, {
            [styles.circle]: shape === "circle", 
            [styles.primary]: color === "primary",
            [styles.secondary]: color === "secondary",
            [styles.active]: color === "active"
        })}
            onClick={onClick}
        >
            {icon}
        </button>
    )
}
