import React from 'react';
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import '../styles/styles.css'
import Header from './header'
import Features from './hotfeatures';
import Footer from './footer';
import Items from './items';

const CategoryShow = (props) => {
    return (
        <div>
            <div class="navigation" style={{left: props.show?"-250px":"0"}}>
                <ul>
                    <li class="has-sub"> <a href="#">Car</a>
                        <ul>
                            <li class="has-sub"> <a href="#">Submenu 1.1</a>
                                <ul>
                                    <li><a href="#">Submenu 1.1.1</a></li>
                                    <li><a href="#">Submenu 1.1.2</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Submenu 1.2</a></li>
                        </ul>
                    </li>
                    <li class="has-sub"> <a href="#">Car</a>
                        <ul>
                            <li class="has-sub"> <a href="#">Submenu 1.1</a>
                                <ul>
                                    <li><a href="#">Submenu 1.1.1</a></li>
                                    <li><a href="#">Submenu 1.1.2</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Submenu 1.2</a></li>
                        </ul>
                    </li>
                    <li class="has-sub"> <a href="#">Car</a>
                        <ul>
                            <li class="has-sub"> <a href="#">Submenu 1.1</a>
                                <ul>
                                    <li><a href="#">Submenu 1.1.1</a></li>
                                    <li><a href="#">Submenu 1.1.2</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Submenu 1.2</a></li>
                        </ul>
                    </li>
                    <li class="has-sub"> <a href="#">Car</a>
                        <ul>
                            <li class="has-sub"> <a href="#">Submenu 1.1</a>
                                <ul>
                                    <li><a href="#">Submenu 1.1.1</a></li>
                                    <li><a href="#">Submenu 1.1.2</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Submenu 1.2</a></li>
                        </ul>
                    </li>
                    <li class="has-sub"> <a href="#">Car</a>
                        <ul>
                            <li class="has-sub"> <a href="#">Submenu 1.1</a>
                                <ul>
                                    <li><a href="#">Submenu 1.1.1</a></li>
                                    <li><a href="#">Submenu 1.1.2</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Submenu 1.2</a></li>
                        </ul>
                    </li>
                    <li class="has-sub"> <a href="#">Car</a>
                        <ul>
                            <li class="has-sub"> <a href="#">Submenu 1.1</a>
                                <ul>
                                    <li><a href="#">Submenu 1.1.1</a></li>
                                    <li><a href="#">Submenu 1.1.2</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Submenu 1.2</a></li>
                        </ul>
                    </li>
                    <li class="has-sub"> <a href="#">Car</a>
                        <ul>
                            <li class="has-sub"> <a href="#">Submenu 1.1</a>
                                <ul>
                                    <li><a href="#">Submenu 1.1.1</a></li>
                                    <li><a href="#">Submenu 1.1.2</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Submenu 1.2</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CategoryShow;
        