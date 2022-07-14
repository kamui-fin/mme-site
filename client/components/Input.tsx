import { UseFormRegisterReturn } from "react-hook-form"
import cx from "classnames"
import styles from "scss/components/Input.module.scss"
import { InputHTMLAttributes } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode
    onDone?: (text: string) => void
    className?: string
    format?: "input" | "textarea"
    register?: UseFormRegisterReturn
}

export const Input = ({ icon, register, onDone, format = "input", className, ...rest }: Props) => {
    return (
        <div className={styles.container}>
            {icon && <div className={styles.iconBox}>{icon}</div>}
            {format === "input" ? (
                <input
                    {...register}
                    className={cx(styles.input, className, { [styles.withIcon]: !!icon })}
                    onChange={(ev) => {
                        onDone && onDone(ev.target.value)
                    }}
                    {...rest}
                />
            ) : (
                <textarea
                    {...register}
                    className={cx(styles.input, className, { [styles.withIcon]: !!icon })}
                    onChange={(ev) => {
                        onDone && onDone(ev.target.value)
                    }}
                    {...rest}
                />
            )}
        </div>
    )
}
