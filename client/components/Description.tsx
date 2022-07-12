import cx from "classnames"
import { useState } from "react"
import styles from "scss/components/Description.module.scss"

interface Props {
    desc: string
}

export const Description = ({ desc }: Props) => {
    const tooBig = desc.length > 650
    const [collapsed, setCollapsed] = useState(true)
    if (tooBig)
        return (
            <>
                <div className={cx(styles.container, { [styles.collapsed]: collapsed })}>
                    <span className={styles.description}>{desc}</span>
                </div>
                {tooBig && (
                    <p className={styles.readMore} onClick={() => setCollapsed(!collapsed)}>
                        {collapsed ? "Read more" : "Read less"}
                    </p>
                )}
            </>
        )
    else return <span className={styles.description}>{desc}</span>
}
