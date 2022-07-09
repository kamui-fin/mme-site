import Button from "components/Button"
import React from "react"
import styles from "scss/components/Navbar.module.scss"
import Logo from "../../assets/logo.svg"
import NavbarItem from "./NavbarItem"


const Navbar = () => {
    return (
    <div className={styles.navbar}>
        <div className={styles.navitem}>
            <Logo/>
        </div>
        <div className={styles.navlinks}>
            <NavbarItem text="Home" url="/"/>
            <NavbarItem text="Store" url="/products"/>
            <NavbarItem text="About" url="/about"/>
            <NavbarItem text="Blog" url="/blog"/>
            <NavbarItem text="Contact" url="/contact"/>
        </div>
        <div className={styles.navitem}>
            <Button className={styles.navbuttons} btnType="primary" children={<>View Cart</>}/>
            <div style={{paddingLeft: "10px"}}/>
            <Button className={styles.navbuttons} btnType="secondary" children={<>Login</>}/>
        </div>
    </div>
    )
}

export default Navbar