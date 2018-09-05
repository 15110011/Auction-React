import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../styles/styles.css'
import dateFns from 'date-fns'


export default class Notification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            seen: 1
        }
        this.handleNoti = this.handleNoti.bind(this)

    }
    handleNoti(e) {
        e.preventDefault()
        this.props.io.socket.patch(`${root}/api/v1/notifications`, {
            seen: this.state.seen,
            userId: this.props.userId
        }, (res) => {
            let seenNoti = res.seenNoti.reduce((cur, i) => {
                if (i.seen !== true) {
                    cur.push(i.seen)
                }
                return cur
            }
                , [])
            this.setState({ seenNoti })
            // var rsNoti = _.find(seenNoti, { seen: this.state.seen})
        })
    }
    componentDidMount() {
        this.props.io.socket.on('user' + this.props.userId, (owner) => {
            this.props.io.socket.post(`${root}/api/v1/notifications`, {
                id: owner.id,
                isAccept: owner.isAccept,
                itemName: owner.itemName,
                ownerId: owner.ownerId,
            }, (res) => {
                console.log(res)
                if (!res.error) {
                    this.props.io.socket.get(`${root}/api/v1/notifications`, (body) => {
                        let getNoti = body.noti
                        let seenNoti = body.noti.reduce((cur, i) => {
                            if (i.seen !== true) {
                                cur.push(i.seen)
                            }
                            return cur
                        }
                            , [])
                        this.setState({ getNoti, seenNoti })
                    })
                }
            })
        })
        fetch(`${root}/api/v1/notifications`)
            .then(res => res.json())
            .then(res => {
                if (res.noti) {
                    let seenNoti = res.noti.reduce((cur, i) => {
                        if (i.seen !== true) {
                            cur.push(i.seen)
                        }
                        return cur
                    }
                        , [])
                    this.setState({ getNoti: res.noti, seenNoti })
                }

            })
    }
    render() {
        const { getNoti, seenNoti } = this.state
        return (
            <div onClick={this.handleNoti} className="nav-item dropdown">

                <Link style={{ color: 'white' }} className="nav-link" to="/notification" id="header-account-menu-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="far fa-bell"></i>
                    {
                        getNoti && (
                            seenNoti.length !== 0 ? (
                                <span style={{ position: 'absolute', top: '5px', borderRadius: '10px' }} className="badge badge-danger">{seenNoti.length} </span>

                            ) : (
                                    <span style={{ position: 'absolute', top: '5px', borderRadius: '10px' }} className="badge badge-danger"></span>
                                )
                        )
                    }
                </Link>
                <div id="a-color" className="dropdown-menu account-menu notification-panel"  aria-labelledby="header-account-menu-link">
                    <div className="container row">
                        <div className="col-md-6">
                            <p>Notifications</p>
                        </div>
                        <div className="col-md-6">
                            <Link to="#" style={{ float: 'right', marginRight: '-30px' }}>Mark all as read</Link>
                        </div>
                    </div>
                    <hr style={{ marginTop: '-10px' }} />
                    <ul className="notification" style={{ maxHeight: '500px', overflow: 'scroll' }} >
                        {
                            getNoti ? (
                                getNoti.map((info, i) => {
                                    return (
                                        <Link key={i} to={`/items/${info.itemId}`} style={{ textDecoration: 'none' }} className="notification-item">
                                            <li className="notification">
                                                <div className="media" style={{ borderBottom: '1px solid #F1F1F1', minHeight: '55px' }}>
                                                    <div className="avatar-noti pb-2">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/160px-Anonymous_emblem.svg.png" alt="img" />
                                                    </div>
                                                    <div className="container content-noti">
                                                        {info.isAccept ? (
                                                            <strong className="notification-title">Admin accepted your item <object><Link to={`/items/${info.itemId}`}>{info.itemName}</Link></object></strong>

                                                        ) : (
                                                                <strong className="notification-title">Admin rejected your item <object><Link to={`/items/${info.itemId}`}>{info.itemName}</Link></object></strong>
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
                    <hr style={{ marginTop: '-17px' }} />
                    <center id="see-all" style={{ marginTop: '-10px' }}><Link to="#">See All</Link></center>
                </div>
            </div>
        )
    }
}
