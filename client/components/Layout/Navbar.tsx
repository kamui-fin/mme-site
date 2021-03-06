import Button from "components/Button"
import Link from "next/link"
import styles from "scss/components/Navbar.module.scss"
import Image from 'next/image'
import NavbarItem from "./NavbarItem"
import { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import CartDrawer from "components/CartDrawer"

const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    const [cartToggle, setCartToggle] = useState(false)
    const dynamicRoute = useRouter().asPath;

    useEffect(() => setToggle(false), [dynamicRoute]);
    return (
    <>
    <div className={styles.navbar}>
        <div className={styles.navlinks}>
            <div className={styles.navlogo}>
            <Link href={"/"}><Image src="/logo.png" width={398} height={52}/></Link>
            </div>
            <div className={styles.navitem}>
                <NavbarItem text="Inicio" url="/"/>
                <NavbarItem text="Tienda" url="/products"/>
                <NavbarItem text="Acerca de" url="/about"/>
                <NavbarItem text="Blog" url="/blog"/>
                <NavbarItem text="Contacto" url="/contact"/>
            </div>
            <div className={styles.navitem} style={{justifyContent: "center"}}>
            {/* <Button onDone={() => setCartToggle(!cartToggle)} className={styles.navbuttons} btnType="primary" children={<>View Cart</>}/> */}
                {/* <Link href={"/login"}><a href="/login"><Button className={styles.navbuttons} btnType="secondary" children={<>Login</>}/></a></Link> */}
            </div>
            <div className={styles.navhamburger}>
                <button onClick={() => setToggle(!toggle)}><Image src={toggle ? "/close.png" : "/hamburger.png"} width={48} height={48}/></button>
            </div>
        </div>
    </div>
    <CartDrawer setCartToggle={setCartToggle} cartToggle={cartToggle}/>
    <div className={styles.drawer} style={{display: toggle ? "flex" : "none"}}>
        <div className={styles.drawerContainer} style={{display: toggle ? "flex" : "none"}}>
            <div >
                <NavbarItem text="Inicio" url="/"/>
                <NavbarItem text="Tienda" url="/products"/>
                <NavbarItem text="Acerca de" url="/about"/>
                <NavbarItem text="Blog" url="/blog"/>
                <NavbarItem text="Contacto" url="/contact"/>
            </div>
            {/* <Button onDone={() => setCartToggle(!cartToggle)} className={styles.navbuttons} btnType="primary" children={<>View Cart</>}/> */}
            {/* <Link href={"/login"}><a href="/login"><Button className={styles.navbuttons} btnType="secondary" children={<>Login</>}/></a></Link> */}
        </div>
    </div>
    </>
    )
}

export default Navbar