import BreadCrumbs from 'components/BreadCrumbs'
import type { NextPage } from 'next'

const Store: NextPage = () => {
    return (
    <div>
        <BreadCrumbs path={[{name: "Home", href: "/"}, {name: "Store", href: "/products"}]}/>
        Store Page
    </div>
    )
}

export default Store