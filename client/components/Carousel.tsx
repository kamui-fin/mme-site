import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper"
import cx from "classnames"
import "swiper/css"
import style from "scss/components/Carousel.module.scss"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

interface Props {
    className?: string
    count: number
    children: React.ReactNode
}

export const Carousel = ({ className, count, children }: Props) => {
    return (
        <>
            <Swiper
                className={cx(style.swiper, className)}
                slidesPerView={count | 3}
                slidesPerGroup={1}
                loop={true}
                navigation
                centeredSlides={true}
                loopFillGroupWithBlank={true}
                pagination={{
                    enabled: false,
                }}
                modules={[Pagination, Navigation]}
            >
                {children}
            </Swiper>
        </>
    )
}
