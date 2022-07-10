import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"

interface Props {
    className?: string
    count: number
    children: React.ReactNode
}


export const Carousel = ({ className, count, children }: Props) => {
    return (<>
            <Slider
                className={className}     
                dots={true}
                infinite= {true}
                speed= {500}
                slidesToShow= {count}
                slidesToScroll={1}
                arrows={true}
                
            >
                {children}
            </Slider>
            </>)
}
