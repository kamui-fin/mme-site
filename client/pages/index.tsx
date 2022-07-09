import ScifiIcon from "../assets/scifi.svg"
import { IconTextCard } from "components/IconTextCard"
import type { NextPage } from "next"
import { ArticleCard } from "components/ArticleCard"
import IslandImage from "assets/island.png"

const Home: NextPage = () => {
    return (
        <div>
            <ArticleCard title="Cracking The Coding Interview" duration={134} date={new Date()} image="/island.png"/>
        </div>
    )
}

export default Home
