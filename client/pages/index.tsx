import type { NextPage } from "next"
import BreadCrumbs from "components/BreadCrumbs"

const Home: NextPage = () => {
    return (
        <div>
            <BreadCrumbs
                path={[
                    { name: "Home", href: "/" },
                    { name: "Store", href: "/store" },
                ]}
            />
        </div>
    )
}

export default Home
