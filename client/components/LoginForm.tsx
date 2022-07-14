import cx from "classnames"
import { http } from "lib/express-api"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import styles from "scss/components/LoginRegisterForm.module.scss"
import Alert from "./Alert"
import Button from "./Button"
import { Input } from "./Input"

interface Props {
    className?: string
}

export const LoginForm = ({ className }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const router = useRouter()
    const [error, setError] = useState("")

    const onSubmit = async (data) => {
        try {
            const res = await http.post("login", data)
            window.localStorage.setItem("token", res.data.token)
            router.push("/")
        } catch (err) {
            setError(err.response.status === 400 ? "Invalid credentials" : "Unable to login")
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cx(styles.form, className)}>
            <div className={styles.textContainer}>
                <h3>Log in</h3>
                <p>
                    Don't have an account?{" "}
                    <Link href="/register">
                        <a className="text-blue">Register</a>
                    </Link>
                </p>
            </div>
            {error && <Alert type="error">{error}</Alert>}
            <Input
                className={styles.input}
                placeholder="Email"
                type="email"
                register={register("email", { required: true })}
            />
            <Input
                className={styles.input}
                placeholder="Password"
                type="password"
                register={register("password", { required: true })}
            />
            <Button className={styles.submit} type="submit" btnType="primary">
                Log in
            </Button>
        </form>
    )
}
