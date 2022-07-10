import React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"

interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <React.Fragment>
            <Navbar />
            {children}
            <Footer/>
        </React.Fragment>
    )
}

export default Layout
