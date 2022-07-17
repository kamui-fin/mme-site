import cx from "classnames"
import { object, string, TypeOf } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import styles from "scss/components/LoginRegisterForm.module.scss"
import { toast } from "react-toastify"
import Button from "./Button"
import { Input } from "./Input"
import { useLoginUserMutation } from "redux/api/authApi"

interface Props {
    className?: string
}

const loginSchema = object({
    email: string(),
    password: string(),
})

export type LoginInput = TypeOf<typeof loginSchema>

export const LoginForm = ({ className }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    })
    const router = useRouter()
    const [loginUser, { isLoading, isSuccess, error, isError }] = useLoginUserMutation()

    const onSubmit: SubmitHandler<LoginInput> = async (data) => {
        loginUser(data)
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("User registered successfully")
            router.push("/")
        }

        if (isError) {
            console.log(error)
            if (Array.isArray((error as any).data.error)) {
                ;(error as any).data.error.forEach((el: any) =>
                    toast.error(el.message, {
                        position: "top-right",
                    })
                )
            } else {
                toast.error((error as any).data.message, {
                    position: "top-right",
                })
            }
        }
    }, [isLoading])

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
