import cx from "classnames"
import { UseFormRegisterReturn } from "react-hook-form"
import styles from "scss/components/Input.module.scss"

interface Props {
    icon?: React.ReactNode
    onDone?: (text: string) => void
    placeholder?: string
    className?: string
    type?: "input" | "textarea"
    register?: UseFormRegisterReturn
    valueType?: "email" | "tel" | "text"
}

export const Input = ({ icon, valueType = "text", register, onDone, type = "input", placeholder, className }: Props) => {
    return (
        <div className={styles.container}>
            {icon && <div className={styles.iconBox}>{icon}</div>}
            {type === "input" ? (
                <input
                    {...register}
                    className={cx(styles.input, className, { [styles.withIcon]: !!icon })}
                    placeholder={placeholder}
                    onChange={(ev) => {
                        onDone && onDone(ev.target.value)
                    }}
                    type={valueType}
                    pattern={valueType === "tel" && "\\+[0-9] [0-9]{3}-[0-9]{3}-[0-9]{4}"}
                />
            ) : (
                <textarea
                    {...register}
                    className={cx(styles.input, className, { [styles.withIcon]: !!icon })}
                    placeholder={placeholder}
                    onChange={(ev) => {
                        onDone && onDone(ev.target.value)
                    }}
                />
            )}
        </div>
    )
}
