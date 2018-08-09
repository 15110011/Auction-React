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
        