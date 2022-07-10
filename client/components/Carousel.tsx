import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import { useState, useCallback } from 'react'

interface Props {
    className?: string
    count: number
    width: string
    children: React.ReactNode
}

export const Carousel = ({ className, count, width, children }: Props) => {
    const [dragging, setDragging] = useState(false)

    const handleBeforeChange = useCallback(() => {
        console.log('handleBeforeChange')
        setDragging(true)
    }, [setDragging])

    const handleAfterChange = useCallback(() => {
        console.log('handleAfterChange')
        setDragging(false)
    }, [setDragging])

    const handleOnItemClick = useCallback(
        e => {
            console.log('handleOnItemClick')
            if (dragging) e.stopPropagation()
        },
        [dragging]
    ) 

    return (<div style={{width: width, margin: "0px auto"}}>
        <Slider
            beforeChange={handleBeforeChange}
            afterChange={handleAfterChange}
            responsive={[{
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            },
            ]}
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
