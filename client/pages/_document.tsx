import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html lang="es">
            <Head>
                <link rel="icon" href="/logo-image.svg" />

                <meta charSet="UTF-8" />
                <meta name="keywords" content="spanish book translation, monogatari media editorial" />
                <meta
                    name="description"
                    content="Somos un equipo de varias personas que han buscado cerrar la brecha entre idiomas y culturas y traer nuevos títulos increíbles, muchas veces descuidados por otras editoriales en España."
                />
                <meta name="subject" content="Spanish Book Translation and Publishing" />
                <meta name="language" content="ES" />
                <meta name="theme-color" content="#ff95b5" />

                <meta name="og:title" content="Monogatari Media Editorial" />
                <meta name="og:type" content="website" />
                <meta name="og:image" content="https://gatari.shop/logo-image.png" />
                <meta name="og:site_name" content="Monogatari Media Editorial" />
                <meta
                    name="og:description"
                    content="Somos un equipo de varias personas que han buscado cerrar la brecha entre idiomas y culturas y traer nuevos títulos increíbles, muchas veces descuidados por otras editoriales en España."
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
