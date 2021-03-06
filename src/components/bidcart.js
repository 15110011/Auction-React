import React, { Component } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import '../styles/styles.css'
import classnames from 'classnames';
import { Link } from 'react-router-dom'
import dateFns from 'date-fns'
import NumberFormat from 'react-number-format';
import { GUEST_STATUS } from '../config';




class Bidcart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      activeTab: '1',
      timeLeft: 0,
      bidding: false,
      won: false,
      lost: false,
      wonItems: [],
      lostItems: []
    }
    this.toggle = this.toggle.bind(this);
    this.setCountDown = this.setCountDown.bind(this)
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  setCountDown() {
    if (this.state.items && this.state.items.startedAt !== 0) {
      console.log(this.state.items)
      let endTime = dateFns.getTime(dateFns.addHours(this.state.items.startedAt, this.state.items.period))
      let currTime = dateFns.getTime(new Date())
      let timeLeft = endTime + this.state.items.additionalTime - currTime

      clearInterval(this.countDownInterval)
      this.countDownInterval = setInterval(() => {
        let remainTime = this.state.timeLeft - 1000
        if (remainTime <= 0) {
          clearInterval(this.countDownInterval)
        }
        else {
          this.setState({ timeLeft: remainTime })
        }
      })
      this.setState({ timeLeft: timeLeft })
    }
  }
  componentDidMount() {
    this.countDownInterval = []
    if (this.props.userId) {
      fetch(`${root}/api/v1/bidding/${this.props.userId}`)
        .then(item => item.json())
        .then(item => {
          var biddingItems = item.biddingItems
          biddingItems.map((item, i) => {
            let index = i
            let endTime = dateFns.getTime(dateFns.addHours(item.startedAt, item.period))
            let curTime = dateFns.getTime(new Date())
            let timeLeft = endTime + item.additionalTime - curTime
            item.timeLeft = timeLeft
            if (this.countDownInterval) {
              clearInterval(this.countDownInterval[index])
            }
            if (item && item.startedAt !== 0) {
              this.countDownInterval[index] = setInterval(() => {
                let remainTime = item.timeLeft - 1000
                if (remainTime <= 0) {
                  clearInterval(this.countDownInterval[index])
                }
                else {
                  item.timeLeft = remainTime
                  this.setState({ remainTime })
                }
              }, 1000)
            }
            return item
          })
          this.setState({ items: biddingItems, bidding: true })
        })
      fetch(`${root}/api/v1/won/${this.props.userId}`)
        .then(res => res.json())
        .then(res => {
          if (res.wonItems.length > 0) {
            this.setState({ wonItems: res.wonItems, won: true })
          }
        })
      fetch(`${root}/api/v1/lost/${this.props.userId}`)
        .then(res => res.json())
        .then(res => {
          if (res.lostItems.length > 0) {
            this.setState({ lostItems: res.lostItems, lost: true })
          }
        })
    }
  }
  fromMillisecondsToFormattedString(ms) {
    let h = Math.floor(ms / (3600 * 1000))
    let m = Math.floor((ms - (3600 * 1000 * h)) / (60 * 1000))
    let s = Math.floor((ms - (3600 * 1000 * h) - (60 * 1000 * m)) / (1000))
    return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
  }
  render() {
    if (this.props.loggedIn === GUEST_STATUS) {
      return (
        <div className="container">
          <p className="alert alert-danger" id="expired" style={{ marginTop: '75px' }}>Please log in</p>
        </div>
      )
    }

    return (
      <div style={{ position: 'relative', zIndex: '1000', minHeight: '100vh', marginTop: '130px' }}>
        <div className="container bidcartpanel" style={{ paddingTop: '70px' }}>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Bidding Items
                            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Winning Items
                            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
              >
                Losing Items
                            </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab} id="admin-panel" style={{ minHeight: '300px' }}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Current Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Category</th>
                        <th scope="col">Time left</th>
                        <th scope="col">Detail</th>
                      </tr>
                    </thead>
                    {
                      this.state.bidding ? (
                        <tbody>
                          {
                            this.state.items.map((item, i) => {
                              return (
                                <tr key={i} className="fixprop">
                                  <td>
                                    {i+1}
                                  </td>
                                  <td>{item.itemName}</td>

                                  <td>
                                    <NumberFormat displayType={'text'} value={item.curPrice} thousandSeparator={true} suffix={' BLC'} />
                                  </td>
                                  <td>{item.quantity}</td>
                                  <td>{item.categoryName}</td>
                                  <td>{this.fromMillisecondsToFormattedString(item.timeLeft)}</td>
                                  <td>
                                    <div className="edit-del">
                                      <Link className="btn btn-info" style={{ color: '#1d93c1' }} to={`/items/${item.itemId}`}><i className="fas fa-eye"></i></Link>
                                    </div>
                                  </td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      ) : (
                          <tbody>
                            <tr className="info-bidcart" role="alert">
                              <td>
                                <p className="alert alert-warning light-word">No bidding item</p>
                              </td>
                            </tr>
                          </tbody>
                        )
                    }
                  </table>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Winning Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Category</th>
                        <th scope="col">Detail</th>
                      </tr>
                    </thead>
                    {
                      !this.state.won ? (
                        <tbody>
                          <tr className="info-bidcart" role="alert">
                            <td>
                              <p className="alert alert-warning light-word">Start bidding to win items now</p>
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                          <tbody>
                            {
                              this.state.wonItems.map((item, i) => {
                                return (
                                  <tr key={i} className="fixprop">
                                    <td>
                                      {i+1}
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.winPrice} BLC</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.catName}</td>
                                    <td>
                                      <div className="edit-del">
                                        <Link to={`/items/${item.itemId}`}><button className="btn btn-info" style={{ color: '#1d93c1' }}><i className="fas fa-eye"></i></button></Link>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        )
                    }

                  </table>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Category</th>
                        <th scope="col">Owner</th>
                        <th scope="col">Detail</th>
                      </tr>
                    </thead>
                    {
                      !this.state.lost ? (
                        <tbody>
                          <tr className="info-bidcart" role="alert">
                            <td>
                              <p className="alert alert-warning light-word">You haven't lost any battle yet</p>
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                          <tbody>
                            {
                              this.state.lostItems.map((item, i) => {
                                return (
                                  <tr key={i} className="fixprop">
                                    <td>
                                      {item.id}
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.currentPrice} BLC</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.categoriesId}</td>
                                    <td>{item.userId}</td>
                                    <td>
                                      <div className="edit-del">
                                        <button className="btn btn-info" style={{ color: '#1d93c1' }}><i className="fas fa-eye"></i></button>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        )
                    }

                  </table>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>

    )
  }
}
export default Bidcart