import BreadCrumbs from 'components/BreadCrumbs'
import type { NextPage } from 'next'

const Product: NextPage = () => {
    return (
    <div>
        <BreadCrumbs path={[{name: "Home", href: "/"}, {name: "Store", href: "/products"}]}/>
        Product Page
    </div>
    )
}

export default Product