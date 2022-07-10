import styles from "scss/components/Hero.module.scss"
import Button from "./Button"
import LogoImage from "assets/logo-image.svg"
import Link from "next/link"

export const Hero = () => (
    <section className={styles.hero}>
        <div className={styles.textContainer}>
            <h1 className={styles.title}>Tear the Curtain Between Languages</h1>
            <p className={styles.desc}>We are a publishing company specialized in translating and publishing books and other forms of written media to Spanish in order to make them more accessible to the world.</p>
            <Link href="/products"><a href="/store"><Button btnType="secondary">Shop Now</Button></a></Link>
        </div>
        <LogoImage />
    </section>
)
