import Link from "next/link"
import styles from "scss/components/BreadCrumbs.module.scss"
import ArrowIcon from "assets/arrow-right.svg"

interface PageLink {
    name: string
    href: string // from the root
}

interface Props {
    path: PageLink[]
}

const BreadCrumbs = ({ path }: Props) => {
    return (
        <div className={styles.breadcrumbs}>
            {path.map(({ name, href }, index) => {
                return (
                    <>
                        <Link href={href}>
                            <a>
                                <span className={styles.page}>{name}</span>
                            </a>
                        </Link>
                        {index < path.length - 1 && <ArrowIcon className={styles.icon} />}
                    </>
                )
            })}
        </div>
    )
}

export default BreadCrumbs
