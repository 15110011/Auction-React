import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import ReactImageZoom from 'react-image-zoom';
import NumericInput from 'react-numeric-input';
import '../styles/styles.css'
import Header from './header';
import Footer from './footer';


class ItemDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current: 0,
            items: [
                {
                    id: 'thumbnail',
                    title: 'gallery',
                    description: 'gallery',
                    altText: 'picture',
                    src: '/images/car.jpg',
                    thumbSrc: '/images/thumbnails/car.jpg',
                },
                {
                    id: 'thumbnail',
                    title: 'gallery',
                    description: 'gallery',
                    altText: 'picture',
                    src: '/images/cigar.jpg',
                    thumbSrc: '/images/thumbnails/cigar.jpg',
                },
                {
                    id: 'thumbnail',
                    title: 'gallery',
                    description: 'gallery',
                    altText: 'picture',
                    src: '/images/coin.jpg',
                    thumbSrc: '/images/thumbnails/coin.jpg',
                }
            ]
        }
    }

    setCurrentItem(current) {
        this.setState({ current })
    }

    render() {
        const { current, items } = this.state
        function myFormat(num) {
            return num + '$';
        }
        return (
            <div className="itemDetail-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <br />
                            <Link to='/'><i class="fas fa-backward"> Back to bid</i></Link>
                            <div className="items-info">
                                <div className="container">
                                    <h3>Item's name</h3>
                                </div>
                                <hr />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-5 item-image">
                                            <ReactImageZoom width={340} height={300} zoomWidth={450} img={items[current].src} />
                                            <div className="row thumbnail">
                                                {items.map((item, i) => (
                                                    <div className="col-md-4 thumbnail-border">
                                                        <img className="img-fluid" src={item.thumbSrc} alt="car" style={{ height: '100px' }} onClick={e => this.setCurrentItem(i)} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div>
                                                        <h4>Time left: 00:00:00</h4>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <h4>Current price: $300</h4>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="bid-form">
                                                <form className="form-inline"  >
                                                    <NumericInput min={1} max={100} value={50} mobile={true} format={myFormat} className="form-control pr-5" />
                                                    <button className="btn btn-primary ml-3"><i class="fas fa-gavel"> Bid now</i></button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="container">
                                    <h3>Item description</h3>
                                </div>
                                <hr />
                                <div className="container">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="itemborder" style={{ marginTop: '50px' }}>
                                <div className="item-image">
                                    <Link className="detail" to="/itemdetail"><img src="/images/car.jpg" alt="item" /></Link>
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <div className="itemborder" style={{ marginTop: '25px' }}>
                                <div className="item-image">
                                    <Link className="detail" to="/itemdetail"><img src="/images/car.jpg" alt="item" /></Link>
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                            <div className="itemborder" style={{ marginTop: '25px' }}>
                                <div className="item-image">
                                    <Link className="detail" to="/itemdetail"><img src="/images/car.jpg" alt="item" /></Link>
                                </div>
                                <div className="time-price">
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-md-6">00:00:00</div>
                                        <div className="col-md-6" id="price">$200</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ItemDetail
