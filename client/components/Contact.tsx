import cx from "classnames"
import { useState } from "react"
import styles from "scss/components/Description.module.scss"

interface Props {
    desc: string
}

export const Contact = ({ desc }: Props) => {
    const [collapsed, setCollapsed] = useState(true)
    return (
        <>
            <div className={cx(styles.container, { [styles.collapsed]: collapsed })}>
                <span className={styles.description}>{desc}</span>
            </div>
            <p className={styles.readMore} onClick={() => setCollapsed(!collapsed)}>
                Read more
            </p>
        </>
    )
}
