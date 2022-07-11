import cx from "classnames"
import styles from "scss/components/ArticleCard.module.scss"
import ClockIcon from "../assets/clock.svg"
import Moment from "react-moment"
import moment from "moment"
import { getStrapiMedia } from "lib/api-strapi/api"
import { truncate } from "lib/utils"

interface Props {
    className?: string
    title: string
    image: string
    date: Date
    duration: number
}

export const ArticleCard = ({ title, image, date, duration, className }: Props) => {
    return (
        <div className={cx(styles.card, className)}>
            <img className={styles.image} src={getStrapiMedia(image)} />
            <div className={styles.textPart}>
                <h3 className={styles.title}>{truncate(title)}</h3>
                <div className={styles.meta}>
                    <div className={styles.duration}>
                        <ClockIcon className={styles.icon} />
                        <span>{moment.duration(duration).humanize()}</span>
                    </div>
                    <Moment format="MMM Do YYYY">{date}</Moment>
                </div>
            </div>
        </div>
    )
}
