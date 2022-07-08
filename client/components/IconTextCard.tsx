import cx from "classnames"
import styles from "scss/components/IconTextCard.module.scss"

interface Props {
    icon?: React.ReactNode
    text: string
    className?: string
}

export const IconTextCard = ({ icon, text, className }: Props) => {
    return (
        <div className={cx(className, styles.iconTextCard)}>
            {icon}
            <h4>{text}</h4>
        </div>
    )
}
