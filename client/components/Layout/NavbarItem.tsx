import React from "react"
import Link from 'next/link'
import styles from "scss/components/Navbar.module.scss"

interface Props {
    url: string,
    text: string
}

const NavbarItem = ({url, text}: Props) => {
    return (
    <Link href={url}>
        <p className={styles.link}>{text}</p>
    </Link>
    )
}

export default NavbarItem;