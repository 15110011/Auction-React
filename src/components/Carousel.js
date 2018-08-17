import React, { Component } from 'react';
import Slider from "react-slick";
import '../styles/styles.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class Carousel extends Component {
    render() {
        var settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000
        };
        return (
            <Slider {...settings}>
                <div>
                    <img className="d-block w-100" src="./images/banner1.png" alt="First slide" />
                </div>
                <div>
                    <img className="d-block w-100" src="./images/banner2.png" alt="Second slide" />
                </div>
                <div>
                    <img className="d-block w-100" src="./images/banner3.png" alt="Third slide" />
                </div>
                <div>
                    <img className="d-block w-100" src="./images/banner4.png" alt="Fourth slide" />
                </div>
            </Slider>
        )
    }
}