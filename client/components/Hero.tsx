import styles from "scss/components/Hero.module.scss"
import Button from "./Button"
import LogoImage from "assets/logo-image.svg"
import Link from "next/link"

export const Hero = () => (
    <section className={styles.hero}>
        <div className={styles.textContainer}>
            <h1 className={styles.title}>Rasgar el telón entre idiomas</h1>
            <p className={styles.desc}>Somos una editorial especializada en traducir y publicar libros y otros medios escritos al español para hacerlos más accesibles al mundo.</p>
            <Link href="/products"><a href="/products"><Button btnType="secondary">Compra Ahora</Button></a></Link>
        </div>
        <LogoImage className={styles.image}/>
    </section>
)
