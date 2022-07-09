import { BookCard } from "components/BookCard"
import type { NextPage } from "next"

const Home: NextPage = () => {
    return (
        <div>
            <BookCard title="Sword Art Online Vol. 1" author="Reki Kawahara" image="/sao.png" coverType="Paperback" price={12}/>
        </div>
    )
}

export default Home
