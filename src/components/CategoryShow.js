<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/styles.css'


const CategoryShow = (props) => {
    return (
        <div>
            <div className="navigation" style={{left: props.show?"-250px":"0"}}>
                <ul>
                    <li className="has-sub"> <Link to="#">Car</Link>
                        <ul>
                            <li className="has-sub"> <Link to="#">Submenu 1.1</Link>
                                <ul>
                                    <li><Link to="#">Submenu 1.1.1</Link></li>
                                    <li><Link to="#">Submenu 1.1.2</Link></li>
                                </ul>
                            </li>
                            <li><Link to="#">Submenu 1.2</Link></li>
                        </ul>
                    </li>
                    <li className="has-sub"> <Link to="#">Car</Link>
                        <ul>
                            <li className="has-sub"> <Link to="#">Submenu 1.1</Link>
                                <ul>
                                    <li><Link to="#">Submenu 1.1.1</Link></li>
                                    <li><Link to="#">Submenu 1.1.2</Link></li>
                                </ul>
                            </li>
                            <li><Link to="#">Submenu 1.2</Link></li>
                        </ul>
                    </li>
                    <li className="has-sub"> <Link to="#">Car</Link>
                        <ul>
                            <li className="has-sub"> <Link to="#">Submenu 1.1</Link>
                                <ul>
                                    <li><Link to="#">Submenu 1.1.1</Link></li>
                                    <li><Link to="#">Submenu 1.1.2</Link></li>
                                </ul>
                            </li>
                            <li><Link to="#">Submenu 1.2</Link></li>
                        </ul>
                    </li>
                    <li className="has-sub"> <Link to="#">Car</Link>
                        <ul>
                            <li className="has-sub"> <Link to="#">Submenu 1.1</Link>
                                <ul>
                                    <li><Link to="#">Submenu 1.1.1</Link></li>
                                    <li><Link to="#">Submenu 1.1.2</Link></li>
                                </ul>
                            </li>
                            <li><Link to="#">Submenu 1.2</Link></li>
                        </ul>
                    </li>
                    <li className="has-sub"> <Link to="#">Car</Link>
                        <ul>
                            <li className="has-sub"> <Link to="#">Submenu 1.1</Link>
                                <ul>
                                    <li><Link to="#">Submenu 1.1.1</Link></li>
                                    <li><Link to="#">Submenu 1.1.2</Link></li>
                                </ul>
                            </li>
                            <li><Link to="#">Submenu 1.2</Link></li>
                        </ul>
                    </li>
                    <li className="has-sub"> <Link to="#">Car</Link>
                        <ul>
                            <li className="has-sub"> <Link to="#">Submenu 1.1</Link>
                                <ul>
                                    <li><Link to="#">Submenu 1.1.1</Link></li>
                                    <li><Link to="#">Submenu 1.1.2</Link></li>
                                </ul>
                            </li>
                            <li><Link to="#">Submenu 1.2</Link></li>
                        </ul>
                    </li>
                    <li className="has-sub"> <Link to="#">Car</Link>
                        <ul>
                            <li className="has-sub"> <Link to="#">Submenu 1.1</Link>
                                <ul>
                                    <li><Link to="#">Submenu 1.1.1</Link></li>
                                    <li><Link to="#">Submenu 1.1.2</Link></li>
                                </ul>
                            </li>
                            <li><Link to="#">Submenu 1.2</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CategoryShow;
=======
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
            <div className="navigation" style={{left: props.show?"-250px":"0"}}>
                <ul>
                    <li className="has-sub"> <a href="#">Car</a>
                        <ul>
                            <li className="has-sub"> <a href="#">Submenu 1.1</a>
                                <ul>
                                    <li><a href="#">Submenu 1.1.1</a></li>
                                    <li><a href="#">Submenu 1.1.2</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Submenu 1.2</a></li>
                        </ul>
                    </li>
                    <li className="has-sub"> <a href="#">Car</a>
                        <ul>
                            <li className="has-sub"> <a href="#">Submenu 1.1</a>
                                <ul>
                                    <li><a href="#">Submenu 1.1.1</a></li>
                                    <li><a href="#">Submenu 1.1.2</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Submenu 1.2</a></li>
                        </ul>
                    </li>
                    <li className="has-sub"> <a href="#">Car</a>
                        <ul>
                            <li className="has-sub"> <a href="#">Submenu 1.1</a>
                                <ul>
                                    <li><a href="#">Submenu 1.1.1</a></li>
                                    <li><a href="#">Submenu 1.1.2</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Submenu 1.2</a></li>
                        </ul>
                    </li>
                    <li className="has-sub"> <a href="#">Car</a>
                        <ul>
                            <li className="has-sub"> <a href="#">Submenu 1.1</a>
                                <ul>
                                    <li><a href="#">Submenu 1.1.1</a></li>
                                    <li><a href="#">Submenu 1.1.2</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Submenu 1.2</a></li>
                        </ul>
                    </li>
                    <li className="has-sub"> <a href="#">Car</a>
                        <ul>
                            <li className="has-sub"> <a href="#">Submenu 1.1</a>
                                <ul>
                                    <li><a href="#">Submenu 1.1.1</a></li>
                                    <li><a href="#">Submenu 1.1.2</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Submenu 1.2</a></li>
                        </ul>
                    </li>
                    <li className="has-sub"> <a href="#">Car</a>
                        <ul>
                            <li className="has-sub"> <a href="#">Submenu 1.1</a>
                                <ul>
                                    <li><a href="#">Submenu 1.1.1</a></li>
                                    <li><a href="#">Submenu 1.1.2</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Submenu 1.2</a></li>
                        </ul>
                    </li>
                    <li className="has-sub"> <a href="#">Car</a>
                        <ul>
                            <li className="has-sub"> <a href="#">Submenu 1.1</a>
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
>>>>>>> 8f05927cb850d97a115099fa2e41722568751d88
        