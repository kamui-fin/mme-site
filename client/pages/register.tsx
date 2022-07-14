import { RegisterForm } from "components/RegisterForm"
import styles from "scss/layouts/login-register.module.scss"
import type { NextPage } from "next"

const Login: NextPage = () => {
    return (
        <div>
            <RegisterForm className={styles.loginForm}/>
        </div>
    )
}

export default Login
