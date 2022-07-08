import ScifiIcon from "../assets/scifi.svg"
import { IconTextCard } from "components/IconTextCard"
import type { NextPage } from "next"

const Home: NextPage = () => {
    return (
        <div>
            <IconTextCard text="Sci-Fi" icon={<ScifiIcon />} />
        </div>
    )
}

export default Home
