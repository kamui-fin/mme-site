import BreadCrumbs from "components/BreadCrumbs"
import Button from "components/Button"
import type { NextPage } from "next"
import BookLover from "assets/book-lover.svg"
import styles from "scss/layouts/about.module.scss"
import Link from "next/link"

const About: NextPage = () => {
    return (
        <div className={styles.aboutContainer}>
            <BreadCrumbs className={styles.crumbs} path={[{name: "Home", href: "/"}, {name: "About", href: "/about"}]}/>
            <h1 className={styles.title}>About Us</h1>
            <h3 className={styles.subtitle}>Our mission</h3>
            <p className={styles.para}>We are a team of various people who have sought to bridge the gap between languages and cultures and bring awesome new titles, too often neglected by other publishing companies in Spain. Our task is to improve the catalogue of books avaiable in Spanish and to provide a service where there's a demand for it.</p>
            <Link href="/contact"><a><Button className={styles.contactBtn} btnType="primary">Get in touch</Button></a></Link>
            <div className={styles.img}>
                <BookLover />
            </div>
        </div>
    )
}

export default About
