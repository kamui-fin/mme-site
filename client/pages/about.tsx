import Button from "components/Button"
import type { NextPage } from "next"
import Image from "next/image"
import styles from "scss/layouts/about.module.scss"
import Link from "next/link"
import  Head  from "next/head"

const About: NextPage = () => {
    return (
        <div className={styles.aboutContainer}>
            <Head>
                <title>MME | About</title>
            </Head>
            <h1 className={styles.title}>Sobre Nosotros</h1>
            <h3 className={styles.subtitle}>Nuestra Misión</h3>
            <p className={styles.para}>
                Somos un equipo de varias personas que han buscado cerrar la brecha entre idiomas y culturas y traer nuevos
                títulos increíbles, muchas veces descuidados por otras editoriales en España. Nuestra tarea es mejorar el
                catálogo de libros disponibles en español y brindar un servicio donde haya demanda.
            </p>
            <Link href="/contact">
                <a>
                    <Button className={styles.contactBtn} btnType="primary">
                        Contacto
                    </Button>
                </a>
            </Link>
            <div className={styles.img}>
                <Image src="/book-lover.png" width={669} height={512} />
            </div>
        </div>
    )
}

export default About
