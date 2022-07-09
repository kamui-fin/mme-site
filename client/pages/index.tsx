import type { NextPage } from "next"
import RangeInput from "components/RangeInput"

const Home: NextPage = () => {
    return (
        <div>
            <RangeInput onDone={(min, max) => console.log(min, max)}/>
        </div>
    )
}

export default Home
