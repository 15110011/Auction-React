/*global FB*/
import React, { Component } from 'react';
import Items from './items';
import { render } from 'react-dom'
import { Link, withRouter } from 'react-router-dom'
import SearchResult from './SearchResult'
import '../styles/styles.css'
import { LOADING_LOGIN_STATUS, LOADED_LOGIN_STATUS, GUEST_STATUS } from '../config'
import dateFns from 'date-fns'


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            name: '',
            loading: false,
            categories: [],
            keywords: '',
            results: [],
            found: true,
            notifications: []
        }
        this.handleLogOut = this.handleLogOut.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.updateKeyWord = this.updateKeyWord.bind(this)
    }
    handleLogOut(e) {
        e.preventDefault()
        FB.logout(
            resp => {
                if (resp.status === 'unknown') {
                    this.setState({ isLoggedIn: false })
                }
            }
        )
    }
    componentDidMount() {
        fetch('/api/v1/categories').then(res => res.json()).then(res => {
            let cloneCat = this.state.categories.slice()
            res.cats.map(cat => {
                cloneCat[cat.id] = cat.name
                return true
            })
            this.setState({ categories: cloneCat })

        })


    }
    shouldComponentUpdate(nextProps) {
        if (this.props.userId == '' && nextProps.userId !== '') {
            let notifications = this.state.notifications.slice()
            console.log(nextProps.userId)
            this.props.io.socket.on('user' + nextProps.userId, (owner) => {
                this.props.io.socket.post('/api/v1/notifications', {
                    id: owner.id,
                    isAccept: owner.isAccept,
                    itemName: owner.itemName,
                    ownerId: owner.ownerId,
                }, (res) => {
                    console.log(res)
                    if (!res.error) {
                        var newNoti = res.newNoti
                        notifications.push({
                            newNoti
                        })
                        this.setState({ notifications })
                        console.log(this.state.notifications)
                        this.props.io.socket.get('/api/v1/notifications', (body) => {
                            let getNoti = body.noti
                            console.log(getNoti.length)

                            this.setState({ getNoti })
                        })
                    }
                })
                console.log('hihihi', owner)


            })
        }
        return true
    }
    componentWillMount() {
        this.props.checkStatus()
        fetch('/api/v1/notifications')
            .then(res => res.json())
            .then(res => {
                this.setState({ getNoti: res.noti })
            })
    }
    updateKeyWord(e) {
        e.preventDefault()
        this.setState({ keywords: e.target.value })
        fetch(`/api/v1/search?search=${e.target.value}`)
            .then(data => data.json())
            .then(data => {
                if (data.resultItem) {
                    console.log(data.resultItem)
                    this.setState({ results: data.resultItem })
                }
            })
    }
    handleSearch(e) {
        e.preventDefault()
        fetch(`/api/v1/search?search=${this.state.keywords}`)
            .then(res => res.json())
            .then(res => {
                var itemsFound = res.resultItem
                if (itemsFound.length === 0) {
                    // this.setState({ found: false })
                    // setTimeout(() => {
                    //     this.setState({ found: true })
                    // }, 800)
                    this.props.history.push({
                        pathname: '/results',
                        state: { results: itemsFound }
                    })
                }
                else {
                    this.setState({ found: true })
                    this.props.history.push({
                        pathname: '/results',
                        state: { results: itemsFound }
                    })
                }
            })

    }
    handleLogin(e) {
        e.preventDefault()
        this.props.logIn()
    }
    onClick(e) {
        e.preventDefault()
        FB.login(console.log)
    }
    render() {
        const { keywords, results, getNoti } = this.state
        let filterItem = this.state.results.filter(kw => {
            return kw.name.toLowerCase().indexOf(this.state.keywords.toLowerCase()) !== -1
        })
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
                    <Link className="navbar-brand mr-0" to="/" style={{ color: 'white' }}>AuctionBlocha</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="form-inline ml-auto">
                            <div className="collapse navbar-collapse" id="navbar1">
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <button type="button" className="btn btn-info mr-sm-2 dropdown-toggle" id="menu" data-toggle="dropdown">Category</button>
                                        <ul className="dropdown-menu">
                                            {this.state.categories.map((cat, index) => {
                                                return (
                                                    <li className="dropdown-item dropdown-submenu" key={index}>
                                                        <Link to="#">{cat}</Link>

                                                    </li>)
                                            })}

                                        </ul>
                                    </li>
                                </ul>

                            </div>
                        </form>
                        <form onSubmit={this.handleSearch} className="form-inline">
                            <input autoComplete="off" list="suggestions" className="form-control mr-sm-2" name="search" value={keywords} onChange={this.updateKeyWord} id="search-form" type="search" placeholder="Search" aria-label="Search" />

                            <datalist id="suggestions">
                                {
                                    filterItem.map((kw) => {
                                        return (
                                            <option value={kw.name} />
                                        )


                                    })
                                }
                            </datalist>
                            <button className="btn btn-info my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        {
                            (this.props.loggedIn === LOADED_LOGIN_STATUS ? (
                                <div className="ml-auto">
                                    <div className="form-inline">
                                        <Link className="nav-item nav-link ml-auto" to="/bidcart" style={{ color: 'white' }}><i className="fas fa-cart-plus"></i></Link>
                                        <div className="nav-item dropdown">

                                            <Link style={{ color: 'white' }} className="nav-link" to="/notification" id="header-account-menu-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="far fa-bell"></i>
                                                {
                                                    getNoti && (
                                                        <span style={{ position: 'absolute', top: '5px', borderRadius: '10px' }} class="badge badge-danger">{getNoti.length}</span>
                                                    )
                                                }
                                            </Link>
                                            <div id="a-color" style={{ width: '400px', marginLeft: '-300px' }} className="dropdown-menu account-menu" aria-labelledby="header-account-menu-link">
                                                <div className="container row">
                                                    <div className="col-md-6">
                                                        <p>Notifications</p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <a href="#" style={{ float: 'right' }}>Mark all as read</a>
                                                    </div>
                                                </div>
                                                <hr style={{ marginTop: '-10px' }} />
                                                <ul className="notification" style={{ marginTop: '-12px' }}>
                                                    {
                                                        getNoti ? (
                                                            getNoti.map(info => {
                                                                return (
                                                                    <Link to={`/items/${info.itemId}`} style={{ textDecoration: 'none' }} className="notification-item">
                                                                        <li className="notification">
                                                                            <div className="media" style={{ borderBottom: '1px solid #F1F1F1', minHeight: '73px' }}>
                                                                                <div className="avatar-noti pt-2">
                                                                                    <img style={{ height: '50px', width: '50px', borderRadius: '50%' }} src="./images/car.jpg" alt="img" />
                                                                                </div>
                                                                                <div className="container content-noti">
                                                                                    {info.isAccept ? (
                                                                                        <strong className="notification-title">Admin accepted your item <Link to={`/items/${info.itemId}`}>{info.itemName}</Link></strong>

                                                                                    ) : (
                                                                                            <strong className="notification-title">Admin rejected your item <Link to={`/items/${info.itemId}`}>{info.itemName}</Link></strong>
                                                                                        )
                                                                                    }
                                                                                    <div className="notification-meta">
                                                                                        <small className="timestamp"><strong>at {dateFns.format(info.createdAt, 'HH:mm MM/DD/YYYY')}</strong></small>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    </Link>
                                                                )
                                                            })
                                                        ) : (
                                                                <div role="alert">
                                                                    <p className="light-word text-center"><strong>No notifications</strong></p>
                                                                </div>
                                                            )

                                                    }
                                                </ul>
                                                <hr style={{ marginTop: '-12px' }} />
                                                <center style={{ marginTop: '-10px' }}><a href="#">See All</a></center>
                                            </div>
                                        </div>
                                        <div className="nav-item dropdown">
                                            <Link style={{ color: 'white' }} className="nav-link dropdown-toggle" to="/manager" id="header-account-menu-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-user"></i></Link>
                                            <div className="dropdown-menu account-menu" aria-labelledby="header-account-menu-link">
                                                <Link className="dropdown-item" to="">{this.props.name}</Link>
                                                <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                                {this.props.isAdmin ? <Link className="dropdown-item" to="/admin">Admin Panel <span class="badge badge-danger" style={{ position: 'absolute', left: '120px', top: '77px', borderRadius: '10px' }} >4</span></Link> : ''}
                                                <Link className="dropdown-item" to="/logout" onClick={this.handleLogOut}>Sign out</Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ) : '')}
                        {(this.props.loggedIn === GUEST_STATUS ?
                            (
                                <div className="ml-auto">
                                    <div className="form-inline">
                                        <Link className="btn btn-info" to="/faq">FAQ</Link>
                                        <button className="loginBtn loginBtn--facebook" onClick={(e) => { this.handleLogin(e) }}>Login with Facebook</button>
                                    </div>
                                </div>
                            ) : ''
                        )}
                        {(this.props.loggedIn === LOADING_LOGIN_STATUS ?
                            <div className="ml-auto">
                                <div className="form-inline">
                                    <Link className="btn btn-info" to="/faq">FAQ</Link>
                                    <div style={{ color: 'white' }}>Loading ...</div>
                                </div>
                            </div> : '')}
                    </div>
                </nav>
            </div >
        )
    }
}
export default withRouter(Header)