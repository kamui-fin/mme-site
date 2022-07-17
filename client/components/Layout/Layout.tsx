import React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { store } from "redux/store"
import { Provider } from "react-redux"

interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <Provider store={store}>
            <main className="app">
                <Navbar />
                {children}
                <Footer />
            </main>
        </Provider>
    )
}

export default Layout
