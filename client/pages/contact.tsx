import ContactImage from "assets/contact.svg"
import Button from "components/Button"
import { Input } from "components/Input"
import type { NextPage } from "next"
import { useForm } from "react-hook-form"
import styles from "scss/layouts/contact.module.scss"

const Contact: NextPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => console.log(data)

    return (
        <div className={styles.page}>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>Get in touch</h2>
                <h4 className={styles.subtitle}>Our friendly team would love to hear from you!</h4>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.name}>
                        <div>
                            <label className={styles.label}>First Name</label>
                            <Input register={{...register("firstName", {required: true})}} className={styles.firstname} placeholder="First Name" />
                        </div>
                        <div>
                            <label className={styles.label}>Last Name</label>
                            <Input register={{...register("lastName", {required: false})}} className={styles.lastname} placeholder="Last Name" />
                        </div>
                    </div>
                    <div>
                        <label className={styles.label}>Email</label>
                        <Input register={{...register("email", {required: true})}} className={styles.email} placeholder="you@company.com" />
                    </div>
                    <div>
                        <label className={styles.label}>Phone Number</label>
                        <Input register={{...register("phone", {required: false})}} className={styles.phone} placeholder="+1 (123) 000-0000" phoneNumber/>
                    </div>
                    <div>
                        <label className={styles.label}>Message</label>
                        <Input register={{...register("message", {required: true})}} className={styles.textarea} type="textarea" />
                    </div>
                    <Button className={styles.btn} btnType="secondary">
                        Submit
                    </Button>
                </form>
            </div>
            <ContactImage className={styles.svg} />
        </div>
    )
}

export default Contact
