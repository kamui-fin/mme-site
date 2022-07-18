import { useState } from "react"
import Button from "components/Button"
import { Input } from "components/Input"
import { fetchAPI } from "lib/strapi"
import type { NextPage } from "next"
import { useForm } from "react-hook-form"
import Image from "next/image"
import styles from "scss/layouts/contact.module.scss"
import Alert from "components/Alert"

const Contact: NextPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const [error, setError] = useState(false)
    const [sent, setSent] = useState(false)

    const onSubmit = async (data) => {
        setSent(false)
        try {
            await fetchAPI("/messages", {}, { method: "POST", data: { data } })
            setError(false)
        } catch {
            setError(true)
        }
        setSent(true)
        setTimeout(() => {
            setSent(false)
        }, 2000)
    }

    let alert
    if (error && sent) {
        alert = (
            <Alert className={styles.alert} type="error">
                Could not send message
            </Alert>
        )
    } else if (!error && sent) {
        alert = (
            <Alert className={styles.alert} type="success">
                Sucessfully sent message
            </Alert>
        )
    }
    return (
        <div className={styles.page}>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>Ponerse en Contacto</h2>
                <h4 className={styles.subtitle}>¡Te echaremos una mano!</h4>
                {alert}
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.name}>
                        <div className={styles.group}>
                            <label className={styles.label}>Primer nombre</label>
                            <Input
                                register={{ ...register("firstName", { required: true }) }}
                                className={styles.firstname}
                                placeholder="Primer nombre"
                            />
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Apellido</label>
                            <Input
                                register={{ ...register("lastName", { required: false }) }}
                                className={styles.lastname}
                                placeholder="Apellido"
                            />
                        </div>
                    </div>
                    <div className={styles.group}>
                        <label className={styles.label}>Email</label>
                        <Input
                            register={{ ...register("email", { required: true }) }}
                            className={styles.email}
                            placeholder="you@company.com"
                            type="email"
                        />
                    </div>
                    <div className={styles.group}>
                        <label className={styles.label}>Número de Teléfono</label>
                        <Input
                            register={{ ...register("phoneNumber", { required: false }) }}
                            className={styles.phone}
                            placeholder="+1 123-000-0000"
                            type="tel"
                        />
                    </div>
                    <div className={styles.group}>
                        <label className={styles.label}>Mensaje</label>
                        <Input
                            register={{ ...register("msg", { required: true }) }}
                            className={styles.textarea}
                            type="textarea"
                        />
                    </div>
                    <Button type="submit" className={styles.btn} btnType="secondary">
                        Enviar
                    </Button>
                </form>
            </div>
            <div className={styles.img}>
                <Image src="/contact.png" width={460} height={588} />
            </div>
        </div>
    )
}

export default Contact
