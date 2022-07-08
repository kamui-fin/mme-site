import Checkbox from "components/Checkbox"
import type { NextPage } from "next"

const Home: NextPage = () => {
    return (
        <div>
            <Checkbox checked={false} />
        </div>
    )
}

export default Home
