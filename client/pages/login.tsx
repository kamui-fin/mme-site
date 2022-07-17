import { LoginForm } from "components/LoginForm"
import styles from "scss/layouts/login-register.module.scss"
import type { NextPage } from "next"

const Login: NextPage = () => {
    return <LoginForm className={styles.loginForm} />
}

export default Login
