import React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"

interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <main className="app">
            <Navbar />
            {children}
            <Footer/>
        </main>
    )
}

export default Layout
