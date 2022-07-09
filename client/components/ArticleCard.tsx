import cx from "classnames"
import styles from "scss/components/ArticleCard.module.scss"
import moment from "moment"
import ClockIcon from "../assets/clock.svg"

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
            <img className={styles.image} src={image} />
            <div className={styles.textPart}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.meta}>
                <div className={styles.duration}>
                    <ClockIcon className={styles.icon}/>
                    <span>
                        {moment.duration(duration).humanize()}
                    </span>
                </div>
                <span className={styles.date}>
                    {moment(date).format('DD/MM/YYYY')}
                </span>
            </div>
            </div>
        </div>
    )
}
