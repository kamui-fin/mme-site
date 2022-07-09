import cx from "classnames"
import styles from "scss/components/Input.module.scss"

interface Props {
    icon?: React.ReactNode
    onDone?: (text: string) => void
    placeholder?: string
}

export const Input = ({ icon, onDone, placeholder }: Props) => {
    return (
        <div className={styles.container}>
            {icon && <div className={styles.iconBox}>{icon}</div>}
            <input
                className={cx(styles.input, { [styles.withIcon]: !!icon })}
                placeholder={placeholder}
                onChange={(ev) => {
                    onDone && onDone(ev.target.value)
                }}
            />
        </div>
    )
}
