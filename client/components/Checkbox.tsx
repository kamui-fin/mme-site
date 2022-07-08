import cx from "classnames"
import styles from "scss/components/Checkbox.module.scss"

interface Props {
    checked?: boolean
    className?: string
}

const Checkbox = ({ checked, className }: Props) => {
    return <input type={"checkbox"} defaultChecked={checked} className={cx(styles.checkbox, className)} />
}

export default Checkbox
