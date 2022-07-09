import { Input } from "components/Input"
import SortIcon from "assets/sort.svg"
import type { NextPage } from "next"
import { Select } from "components/Select"

const Home: NextPage = () => {
    return (
        <div>
            <Select icon={<SortIcon />} items={["Popular", "Trending", "Best"]} defaultIndex={1} onDone={(txt) => console.log(txt)}/>
        </div>
    )
}

export default Home
