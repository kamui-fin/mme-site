import Button from "components/Button"
import { Input } from "components/Input"
import { fetchAPI } from "lib/api-strapi/api"
import type { NextPage } from "next"
import { useForm } from "react-hook-form"
import Image from "next/image"
import styles from "scss/layouts/contact.module.scss"

const Contact: NextPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        await fetchAPI("/messages", {}, { method: "POST", data: { data } })
    }

    return (
        <div className={styles.page}>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>Get in touch</h2>
                <h4 className={styles.subtitle}>Our friendly team would love to hear from you!</h4>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.name}>
                        <div className={styles.group}>
                            <label className={styles.label}>First Name</label>
                            <Input
                                register={{ ...register("firstName", { required: true }) }}
                                className={styles.firstname}
                                placeholder="First Name"
                            />
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Last Name</label>
                            <Input
                                register={{ ...register("lastName", { required: false }) }}
                                className={styles.lastname}
                                placeholder="Last Name"
                            />
                        </div>
                    </div>
                    <div className={styles.group}>
                        <label className={styles.label}>Email</label>
                        <Input
                            register={{ ...register("email", { required: true }) }}
                            className={styles.email}
                            placeholder="you@company.com"
                        />
                    </div>
                    <div className={styles.group}>
                        <label className={styles.label}>Phone Number</label>
                        <Input
                            register={{ ...register("phoneNumber", { required: false }) }}
                            className={styles.phone}
                            placeholder="+1 (123) 000-0000"
                            phoneNumber
                        />
                    </div>
                    <div className={styles.group}>
                        <label className={styles.label}>Message</label>
                        <Input
                            register={{ ...register("msg", { required: true }) }}
                            className={styles.textarea}
                            type="textarea"
                        />
                    </div>
                    <Button className={styles.btn} btnType="secondary">
                        Submit
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
