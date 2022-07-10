import Button from "components/Button"
import Link from "next/link"
import React from "react"
import styles from "scss/components/Navbar.module.scss"
import Logo from "../../assets/logo.svg"
import NavbarItem from "./NavbarItem"


const Navbar = () => {
    return (
    <div className={styles.navbar}>
        <div className={styles.navitem}>
            <Link href="/"><Logo/></Link>
        </div>
        <div className={styles.navlinks}>
            <NavbarItem text="Home" url="/"/>
            <NavbarItem text="Store" url="/products"/>
            <NavbarItem text="About" url="/about"/>
            <NavbarItem text="Blog" url="/blog"/>
            <NavbarItem text="Contact" url="/contact"/>
        </div>
        <div className={styles.navitem}>
            <Link href={"/cart"}><a href="/cart"><Button className={styles.navbuttons} btnType="primary" children={<>View Cart</>}/></a></Link>
            <div style={{paddingLeft: "10px"}}/>
            <Link href={"/login"}><a href="/login"><Button className={styles.navbuttons} btnType="secondary" children={<>Login</>}/></a></Link>
        </div>
    </div>
    )
}

export default Navbar