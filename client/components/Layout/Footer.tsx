import React from "react"
import styles from "scss/components/Footer.module.scss"
import NavbarItem from "./NavbarItem"


const Footer = () => {
    return (
    <footer className={styles.footer}>
        <p>Copyright © 2022 <span>Monogatari Media Editorial</span>, All Rights Reserved</p>
        <NavbarItem text="Terms" url="/terms"/>
        <NavbarItem text="Privacy" url="/privacy"/>
    </footer>
    )
}

export default Footer