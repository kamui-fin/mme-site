import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"

interface Props {
    className?: string
    count: number
    width: string
    children: React.ReactNode
}


export const Carousel = ({ className, count, width, children }: Props) => {
    return (<div style={{width: width, margin: "0px auto"}}>
            <Slider
                className={className}     
                dots={true}
                centerPadding={"10px"}
                infinite= {true}
                speed= {500}
                slidesToShow= {count}
                slidesToScroll={1}
                arrows={true}
            >
                {children}
            </Slider>
            </div>)
}
