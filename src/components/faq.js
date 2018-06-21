import React, { Component } from 'react';
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import Header from './header';
import Footer from './footer';

class FAQ extends Component {
    render() {
        return (
            <div>
                <div id="faq">
                    <div className="container" style={{ minHeight: '100vh', marginTop: '50px' }}>
                        <h1>FAQ</h1>
                        <div className="q-and-a">
                            <hr />
                            <div className="row">
                                <div className="col-md-4">
                                    <h4>This is "Múp"</h4>
                                    <img
                                        src="/images/mup2.jpg"
                                        alt="mup"
                                        style={{
                                            height: "300px",
                                            width: "260px"
                                        }}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <h4>This is "Quang"</h4>
                                    <img
                                        src="/images/quang.jpg"
                                        alt="mup"
                                        style={{
                                            height: "300px",
                                            width: "260px"
                                        }}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <h4>This is "Anh"</h4>
                                    <img
                                        src="/images/anh.jpg"
                                        alt="mup"
                                        style={{
                                            height: "300px",
                                            width: "260px"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default FAQ