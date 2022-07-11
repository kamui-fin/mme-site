import cx from "classnames"
import styles from "scss/components/Checkbox.module.scss"

interface Props {
    checked?: boolean
    defaultChecked?: boolean
    className?: string
    onDone?: (checked: boolean) => void
}

const Checkbox = ({ checked, className, onDone }: Props) => {
    return <input type={"checkbox"} onChange={(ev) => {onDone && onDone(ev.target.checked)}} checked={checked} className={cx(styles.checkbox, className)} />
}

export default Checkbox
