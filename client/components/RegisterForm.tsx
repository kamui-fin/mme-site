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

export const RegisterForm = ({ className }: Props) => {
    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const router = useRouter()
    const [error, setError] = useState("")

    const onSubmit = async (data) => {
        try {
            const res = await http.post("register", data)
            window.localStorage.setItem("token", res.data.token)
            router.push("/")
        } catch (err) {
            setError("Unable to register")
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cx(styles.form, className)}>
            <div className={styles.textContainer}>
                <h3>Sign up</h3>
                <p>
                    Already have an account?{" "}
                    <Link href="/login">
                        <a className="text-blue">Login</a>
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
                placeholder="Username"
                register={register("username", { required: true, minLength: 3, maxLength: 20 })}
            />
            {errors.username && <span className={styles.error}>Must be between 3 and 20 chars</span>}
            <Input
                className={styles.input}
                placeholder="Password"
                type="password"
                register={register("password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ })}
            />
            {errors.password && (
                <span className={styles.error}>Minimum length of 8 chars & atleast 1 uppercase, lowercase, and number</span>
            )}
            <Input
                className={styles.input}
                placeholder="Confirm password"
                type="password"
                register={register("confirmPassword", {
                    required: true,
                    validate: (value) => {
                        const { password } = getValues()
                        return password === value || "Passwords should match"
                    },
                })}
            />
            {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword.message}</span>}
            <Button className={styles.submit} type="submit" btnType="primary">
                Sign up
            </Button>
        </form>
    )
}
