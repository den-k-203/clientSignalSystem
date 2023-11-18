import React from "react"
import { Carousel } from "react-bootstrap"
import './style/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../../Footer/Footer";

const CarouselMenu: React.FC = () => {
    return (
        <>
          <div className="carousel-menu">
            <Carousel data-bs-theme="dark" className="carousel-dark">
                <Carousel.Item>
                    <img
                        className="d-block w-100 image"
                        src="images/carousel_2.jpg"
                        alt="First slide"
                    />
                    </Carousel.Item>
                    <Carousel.Item>
                    <img
                        className="d-block w-100 image"
                        src="images/carousel_1.jpg"
                        alt="Second slide"
                    />
                    </Carousel.Item>
                    <Carousel.Item>
                    <img
                        className="d-block w-100 image"
                        src="images/carousel_3.jpg"
                        alt="Third slide"
                    />
                    </Carousel.Item>
                    <Carousel.Item>
                    <img
                        className="d-block w-100 image"
                        src="images/carousel_4.jpg"
                        alt="Fourth slide"
                    />
                    </Carousel.Item>
                </Carousel>
            </div>
            <Footer/>
        </>
    )
}

export default CarouselMenu