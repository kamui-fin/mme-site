import { Input } from "components/Input"
import SearchIcon from "assets/search.svg"
import type { NextPage } from "next"

const Home: NextPage = () => {
    return (
        <div>
            <Input placeholder="Search" icon={<SearchIcon />} />
        </div>
    )
}

export default Home
