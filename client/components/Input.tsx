import cx from "classnames"
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form"
import styles from "scss/components/Input.module.scss"

interface Props {
    icon?: React.ReactNode
    onDone?: (text: string) => void
    placeholder?: string
    className?: string
    phoneNumber?: boolean
    type?: "input" | "textarea"
    register?: UseFormRegisterReturn
}

export const Input = ({ icon, phoneNumber = false, register, onDone, type = "input", placeholder, className }: Props) => {
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
                    type={phoneNumber ? "tel" : "text"}
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
