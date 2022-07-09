import cx from "classnames"
import styles from "scss/components/ArticleCard.module.scss"
import ClockIcon from "../assets/clock.svg"
import { Image } from "components/Image"
import Moment from "react-moment"
import moment from "moment"

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
            <Image image={image} />
            <div className={styles.textPart}>
                <h3 className={styles.title}>{title}</h3>
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
