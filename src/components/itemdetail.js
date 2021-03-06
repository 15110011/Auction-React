import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactImageZoom from 'react-image-zoom';
import '../styles/styles.css'
import Comments from './Comments'
import RatingList from './RatingList'
import dateFns from 'date-fns'
import BidInput from './BidInput'
import NumberFormat from 'react-number-format';
import Pagination from './Pagination'
import Web3 from 'web3';

import AuctionBid from '../contracts/AuctionBid.json';
import DappToken from '../contracts/DappToken.json'
import RecommendItems from './RecommendItems';


class ItemDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      currentBidding: 0,
      currentBiddingStr: '1.000',
      step: 5,
      itemDetail: null,
      images: [],
      timeLeft: 0,
      bidders: [],
      loading: true,
      isApproved: null,
      currentPrice: 0,
      getMetaMask: true,
      sendTransaction: true,
      waitForMining: false,
      deployContract: true,
      startBidding: false,
      ended: false,
      pageBid: 1,
      renderedBids: [],
      bidPerPage: 10,
      totalMoney: 0,
      owner: ''
    }
    // if (typeof this.web3 !== 'undefined') {
    //   this.web3Provider = this.web3.currentProvider
    // } else {
    //   this.web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/99efdc0bd45147cebbdfd88e5eff1d75')
    //   // this.web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545")
    // }
    this.web3 = window.web3

    this.onSubmitBid = this.onSubmitBid.bind(this)
    this.onReceiveRoomMessage = this.onReceiveRoomMessage.bind(this)
    this.onBeginAuction = this.onBeginAuction.bind(this)
    this.setCountDown = this.setCountDown.bind(this)


  }

  componentDidMount() {
    this.mounted = true
    
    fetch(`${root}/api/v1/items/${this.props.match.params.id}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(item => {
        if (!this.mounted) return
        this.setState({ loading: false })
        if (!item.error) {
          this.setState({ currentPrice: item.findItem.currentPrice })
          let nextStep = item.findItem.bids.length > 0 ?
            item.findItem.bids[0].currentPrice * 0.5 :
            item.findItem.currentPrice * 0.5
          let initBid = item.findItem.bids.length > 0 ? item.findItem.bids[0].currentPrice : item.findItem.currentPrice
          this.props.io.socket.get('/socket/items/' + item.findItem.id, (body, JWR) => {
          })
          this.props.io.socket.on('room' + item.findItem.id, this.onReceiveRoomMessage)
          this.setState({
            images: item.findImg,
            itemDetail: item.findItem,
            step: nextStep,
            currentBidding: initBid + nextStep,
            isApproved: item.isApproved
          }, () => {
            this.setCountDown()
          })
        }
        else {
          if (!this.mounted) return
          this.setState({ itemDetail: null })
        }
      })
    if (!window.web3) {
      this.setState({ getMetaMask: false })
      return
    }
    var tokenContract = this.web3.eth.contract(DappToken.abi)
    this.blcToken = tokenContract.at('0x0ef72c129aed97e869bddedfb4a3ea628e9a7eb4')
    fetch(`${root}/api/v1/contracts/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(res => {
        if (!this.mounted) return
        if (res.success) {
          if (!window.web3) {
            this.setState({ getMetaMask: false })
            return
          }

          this.setState({ deployContract: false, startBidding: true })
          var auctionContract = this.web3.eth.contract(AuctionBid.abi)
          this.contract = auctionContract.at((res.contractAddress.contractAddress).toString())
          this.watchEventBid()
          if (!window.web3.eth.accounts[0]) {
            this.setState({ getMetaMask: false })
            return
          }
          this.contract.owner((err,owner)=>{
            if(err) {
              alert('Something went wrong')
              return
            }
            console.log(owner)
            this.setState({ owner })
          })
          this.blcToken.allowance(window.web3.eth.accounts[0], this.contract.address.toString(),
            (err, allowance) => {
              if (allowance.toNumber() === 0) {

                this.blcToken.approve((this.contract.address).toString(),
                  1157920892373161954235709850086879
                  ,
                  { from: window.web3.eth.accounts[0], gas: 100000 }
                  ,

                  (err, txHash) => {
                    if (err) {
                      this.setState({ sendTransaction: false })
                      setInterval(() => {
                        this.setState({ sendTransaction: true })
                      }, 2000)
                      return
                    }
                    this.setState({ waitForMining: true })
                    var filter = this.web3.eth.filter('latest')
                    filter.watch((err, rs) => {
                      this.web3.eth.getTransactionReceipt(txHash, (err, block) => {
                        if (block && block.transactionHash === txHash) {
                          this.setState({
                            deployContract: false,
                            waitForMining: false
                          })
                        }
                      })
                    })
                  })
              }
            })
          this.contractEnded = res.contractAddress.ended
          this.contract.highestBidder((err, rs) => {
            this.setState({ rs })
          })
          // this.getBidder()
        }
      })
    // this.props.io.socket.get(`${root}/hello`, function serverResponded(body, JWR) {
    // });


  }
  onReceiveRoomMessage(newBid) {
    let { itemDetail } = this.state
    let bid = newBid.newBid
    if (itemDetail) {
      itemDetail.bids.unshift(bid)
      itemDetail.currentPrice = itemDetail.bids[0].currentPrice

      let nextStep = itemDetail.currentPrice * 0.5
      this.setState({ itemDetail, step: nextStep, currentBidding: bid.currentPrice + nextStep }, () => {
        this.handleBidPageChange(1)
      })
    }
  }
  getBidder = () => {
    if (this.contract) {
      this.contract.getBidLength((err, bidLength) => {
        let promises = []
        for (let i = 0; i < bidLength; i++) {
          promises.push(new Promise((resolve, reject) => {
            this.contract.bids(i, (err, address) => {
              resolve({ address: address[0], value: address[1].toNumber(), time: address[2].toNumber() })
            })
          }))
        }
        Promise.all(promises).then((e) => {
          console.log(e)
          this.setState({ bidders: e.reverse() }, () => {
            this.handleBidPageChange(1)
          })
        })
      })
    }

  }
  setCurrentItem(current) {
    this.setState({ current })
  }

  setCountDown() {
    if (this.state.itemDetail && this.state.itemDetail.startedAt !== 0) {
      let endTime = dateFns.getTime(dateFns.addHours(this.state.itemDetail.startedAt, this.state.itemDetail.period))
      let currTime = dateFns.getTime(new Date())
      let timeLeft = endTime + this.state.itemDetail.additionalTime - currTime
      clearInterval(this.countDownInterval)
      this.countDownInterval = setInterval(() => {
        let remainTime = this.state.timeLeft - 1000
        if (remainTime <= 0) {
          clearInterval(this.countDownInterval)
          if (!window.web3) {
            this.setState({ getMetaMask: false })
            return
          }
          this.contract.owner((err, owner) => {
            if (window.web3.eth.accounts[0] === owner && !this.contractEnded) {
              this.contract.auctionEnd((err, success) => {
                if (err) {
                  return console.log(err)
                } else {
                  fetch(`${root}/api/v1/contracts/${this.props.match.params.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ ended: true })
                  })
                  this.watchEventEnd()
                }
                this.setState({ ended: true })
              })
            }
          })
        }
        else {
          this.setState({ timeLeft: remainTime })
        }
      }, 1000)
      this.setState({ timeLeft: timeLeft })
    }
  }
  watchEventEnd = () => {
    this.contract.AuctionEnded({}, {
      fromBlock: 0,
      toBlock: 'lastest'
    }).watch((error, event) => {
      if (!error) {
      }
    })
  }
  watchEventBid = () => {
    this.contract.HighestBidIncrease({}, {
      fromBlock: 0,
      toBlock: 'lastest'
    }).watch((error, event) => {
      if (error) console.log(error)
      let newBidders = [].concat(this.state.bidders)
      newBidders.unshift({
        address: event.args.player, time: event.args.time.c[0], value:
          this.web3.fromWei(((event.args.value).toNumber()), 'ether')
      })
      if (window.web3.eth.accounts[0] === event.args.player) {
        let oldTotalMoney = this.state.totalMoney
        let newTotalMoney = oldTotalMoney + +this.web3.fromWei(((event.args.value).toNumber()), 'ether')
        this.setState({ totalMoney: newTotalMoney })
      }

      this.setState({ rs: event.args.player, bidders: newBidders }, () => {
        this.handleBidPageChange(1)
      })
    })
  }
  onSubmitBid(e) {
    e.preventDefault()
    if (!window.web3) {
      this.setState({ getMetaMask: false })
      return
    }
    if (!window.web3.eth.accounts[0]) {
      this.setState({ getMetaMask: false })
      setInterval(() => {
        this.setState({ getMetaMask: true })
      }, 2000)
    }
    else {
      this.blcToken.balanceOf(window.web3.eth.accounts[0], (err, amount) => {
        console.log(amount.toNumber())
        if (amount.toNumber() < this.web3.toWei(this.state.currentBidding, 'ether')) {
          alert('You dont have enough money')
          return
        } else {
          this.contract.bid(new Date().getTime(),
            this.web3.toWei(this.state.currentBidding, 'ether'),
            {
              from: window.web3.eth.accounts[0],
            }, (err, txHash) => {
              if (typeof txHash === 'undefined') {
                this.setState({ sendTransaction: false })
                setInterval(() => {
                  this.setState({ sendTransaction: true })
                }, 2000)
              } else {
                this.setState({ waitForMining: true })
                // this.watchEventBid()
                var filter = this.web3.eth.filter('latest')
                filter.watch((error, result) => {
                  this.web3.eth.getTransactionReceipt(txHash, (err, block) => {
                    if (err) {
                      console.log(err)
                    }
                    if (block && block.transactionHash === txHash) {
                      this.setState({ waitForMining: false })
                      filter.stopWatching()
                      this.props.io.socket.post(`${root}/api/v1/bid/${this.state.itemDetail.id}`, {
                        currentPrice: this.state.currentBidding,
                        userId: this.props.userId,
                        isLastFiveSec: this.state.timeLeft <= 5000
                      }, res => {

                        if (!res.error) {
                          let { itemDetail } = this.state
                          if (itemDetail) {
                            itemDetail.bids.unshift(res.newBid)
                            itemDetail.currentPrice = itemDetail.bids[0].currentPrice
                            let nextStep = itemDetail.bids[0].currentPrice * 0.5
                            if (res.newAdditionalTime) {
                              let modifyDetail = this.state.itemDetail
                              modifyDetail.additionalTime = res.newAdditionalTime
                              this.setState({
                                itemDetail: modifyDetail
                              }, () => {
                                this.setCountDown()
                              })
                            }
                            this.setState({ itemDetail, step: nextStep, currentBidding: res.newBid.currentPrice + nextStep })
                          }
                        }
                        else {
                          alert(`Cannot bid under the price ${this.state.currentBidding}`)
                        }
                      })
                    } else {
                      this.setState({ waitForMining: true })
                    }
                  })

                })
              }
            })
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

  componentWillUnmount() {
    this.mounted = false
    clearInterval(this.countDownInterval)
    // this.contract.HighestBidIncrease({}, {
    //     fromBlock: 0,
    //     toBlock: 'lastest'
    // }).stopWatching()
    if (this.state.itemDetail && this.state.itemDetail.id) {
      this.props.io.socket.get(`${root}/leave/items/${this.state.itemDetail.id}`, (body, JWR) => {
      })
    }
  }
  onWithdraw = () => {
    this.contract.withdraw({}, (err, txHash) => {
      if (err) {
        this.setState({ sendTransaction: false })
        setTimeout(() => {
          this.setState({ sendTransaction: true })
        }, 2000)
        return
      }
      this.setState({ totalMoney: 0 })
    })
  }
  onBeginAuction() {
    if (!window.web3) {
      this.setState({ getMetaMask: false })
      return
    }
    if (!window.web3.eth.accounts[0]) {
      this.setState({ getMetaMask: false })
      setInterval(() => {
        this.setState({ getMetaMask: true })
      }, 2000)
    } else {
      var AuctionContract = this.web3.eth.contract(AuctionBid.abi)
      AuctionContract.new({
        from: window.web3.eth.accounts[0],
        data: AuctionBid.bytecode
      }, (error, contract) => {
        if (error) {
          this.setState({ sendTransaction: false })
          setInterval(() => {
            this.setState({ sendTransaction: true })
          }, 2000)
          return
        }

        this.setState({ waitForMining: true })
        if (contract.address) {
          this.contract = contract
          var address = this.contract.address
          fetch(`${root}/api/v1/contracts/${this.props.match.params.id}`, {
            method: 'POST',
            body: JSON.stringify({ address: address, ended: false })
          })
            .then(res => res.json())
            .then(res => {
              if (res.success) {

                this.blcToken.approve((this.contract.address).toString(),
                  1157920892373161954235709850086879
                  ,
                  { from: window.web3.eth.accounts[0], gas: 100000 }
                  ,

                  (err, txHash) => {
                    if (err) {
                      this.setState({ sendTransaction: false })
                      setInterval(() => {
                        this.setState({ sendTransaction: true })
                      }, 2000)
                      return
                    }
                    this.setState({ waitForMining: true })
                    var filter = this.web3.eth.filter('latest')
                    filter.watch((err, rs) => {
                      this.web3.eth.getTransactionReceipt(txHash, (err, block) => {
                        if (block && block.transactionHash === txHash) {
                          this.setState({
                            deployContract: false,
                            waitForMining: false,
                            startBidding: true
                          })
                        }
                      })
                    })
                  })
              }
            })
        }
      }
      )
    }
  }
  startBidding = (e) => {
    e.preventDefault()
    if (!window.web3) {
      this.setState({ getMetaMask: false })
      return
    }
    if (!window.web3.eth.accounts[0]) {
      this.setState({ getMetaMask: false })
      setInterval(() => {
        this.setState({ getMetaMask: true })
      }, 2000)
      return
    }
    this.contract.startBidding(this.web3.toWei((this.state.currentPrice), 'ether'),
      { from: window.web3.eth.accounts[0], gas: 100000 }, (err, txHash) => {
        if (err) {
          this.setState({ sendTransaction: false })
          setInterval(() => {
            this.setState({ sendTransaction: true })
          }, 2000)
          return
        }
        this.setState({ waitForMining: true })
        var filter = this.web3.eth.filter('latest')
        filter.watch((error, result) => {
          this.web3.eth.getTransactionReceipt(txHash, (err, blockHash) => {
            if (err) {
              console.log(err)
            }
            if (blockHash && blockHash.transactionHash === txHash) {
              this.setState({ waitForMining: false })
              txHash = this.beginAuction
              filter.stopWatching()
              this.setState({ startBidding: false })
              let startTime = new Date().getTime()
              fetch(`${root}/api/v1/items/${this.props.match.params.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                  startedAt: startTime
                })
              })
                .then((res) => res.json())
                .then((res) => {
                  if (!res.error) {
                    let modifyDetail = this.state.itemDetail
                    modifyDetail.startedAt = startTime
                    this.setState({ itemDetail: modifyDetail }, function () {
                      this.setCountDown()
                    })
                  }
                  else {
                    alert(res.msg)
                  }
                })
            }
          })
        })
      })
  }

  handleBidPageChange = (page) => {
    const renderedBids = this.state.bidders.slice((page - 1) * this.state.bidPerPage,
      (page - 1) * this.state.bidPerPage + this.state.bidPerPage)
    this.setState({ pageBid: page, renderedBids })
  }

  render() {
    const { current, itemDetail, images, loading, isApproved, getMetaMask,
      sendTransaction, waitForMining, bidPerPage, pageBid, bidders, owner } = this.state
    if (loading) {
      return (
        <div role="alert" style={{ marginTop: '75px' }}>
          <p className="alert alert-info text-center light-word">LOADING......</p>
        </div>
      )
    }
    if (itemDetail && (this.props.userId !== itemDetail.userId && !isApproved)) {
      return (
        <div role="alert" style={{ marginTop: '75px' }}>
          <p className="alert alert-danger text-center light-word">You dont have permission to visit this page, get out</p>
        </div>
      )
    }

    else if (!itemDetail)
      return (
        <div role="alert" style={{ marginTop: '75px' }}>
          <p className="alert alert-warning text-center light-word">Item not found</p>
        </div>
      )
    const canBegin = itemDetail.startedAt === 0 && this.props.userId === itemDetail.userId && isApproved && isApproved.isAccept

    return (
      <div className="itemDetail-content" style={{ position: 'relative', zIndex: '1000' }}>
        <div className="container">
          {(isApproved && !isApproved.isAccept) && (
            <p className="alert alert-danger text-center mt-5">This item is rejected by Admin</p>
          )}
          {
            !getMetaMask && (
              <p className="alert alert-danger  text-center mt-5">
                Due to security reasons, please <strong >install</strong> and <strong>login</strong> to Meta Mask</p>
            )
          }
          {
            !sendTransaction && (
              <p className="alert alert-danger text-center mt-5">You declined transaction or did't provide enough gas</p>
            )
          }
          {
            waitForMining && (
              <p className="alert alert-info text-center mt-5">Please wait for transaction to be confirmed, be patient</p>
            )
          }
          <div className="row">
            <div className="col-md-9">
              <br />
              <Link to='/'><i className="fas fa-backward"><span className="light-word"> Back To Homepage</span></i></Link>
              <div className="items-info">
                <div className="container pt-3 ">
                  <h3 className="d-flex">{itemDetail.name} {(canBegin && waitForMining === false && this.state.deployContract === true)
                    && <button className="btn btn-primary ml-auto" onClick={this.onBeginAuction}>Deploy an auction contract</button>}
                    {
                      this.state.startBidding === true && (

                        (this.state.deployContract === false && waitForMining === false && canBegin)
                        && <button className="btn btn-primary ml-auto" onClick={this.startBidding}>Start An Auction</button>
                      )
                    }
                    {/**/}
                  </h3>
                </div>
                <hr />
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 item-image">
                      {images.length > 0 ?
                        <div>
                          <div className="zoom-image" style={{ border: '1px solid darkgrey' }}>

                            <ReactImageZoom id={'abc'} width={379} height={400} zoomWidth={410} left="100%" img={`${root}/uploads/` + images[current].link} />
                          </div>
                          <div className="row thumbnail mt-2 d-flex justify-content-center">
                            {images.map((img, i) => (
                              <div className="col-sm-3 thumbnail-border" key={i} style={{ paddingRight: '5px', paddingLeft: '5px' }}>
                                <img className="img-fluid " src={`${root}/uploads/${img.link}`} alt="img" style={{ height: '68px' }} onClick={e => this.setCurrentItem(i)} />
                              </div>
                            ))}
                          </div>
                        </div> : <img className="img-fluid" src={`http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png`} alt="" />
                      }
                    </div>
                    <div className="col-md-6" style={{ padding: '0 15px 0 30px' }}>
                      <div className="row">
                        <div className="col-md-6">
                          <div>
                            {this.state.itemDetail.startedAt === 0 && <h4>Duration: {this.state.itemDetail.period} hour(s)</h4>}
                            {(this.state.itemDetail.startedAt !== 0 && this.state.timeLeft > 0) &&
                              <h5>Time left: {
                                this.fromMillisecondsToFormattedString(this.state.timeLeft)}
                              </h5>
                            }
                            {(this.state.itemDetail.startedAt !== 0 && this.state.timeLeft < 0) &&
                              <h5>
                                Ended {dateFns.distanceInWordsToNow(
                                  new Date(itemDetail.startedAt + itemDetail.period * 3600 * 1000 + itemDetail.additionalTime))} ago
                                                            </h5>
                            }
                          </div>
                        </div>
                        <div className="col-md-6" style={{ wordWrap: 'break-word' }}>
                          <h5> Current price: <NumberFormat displayType={'text'} value={this.state.itemDetail.bids.length > 0 ? this.state.itemDetail.bids[0].currentPrice : this.state.itemDetail.currentPrice} thousandSeparator={true} suffix={' BLC'} />
                          </h5>
                          {/* <h4>Current price: ${this.state.itemDetail.bids.length > 0 ? this.state.itemDetail.bids[0].currentPrice : this.state.itemDetail.currentPrice}</h4> */}
                        </div>
                        <div className="col-md-6">
                        </div>
                        <div className="col-md-6" style={{ wordWrap: 'break-word' }}>
                          <h5> Current step: <NumberFormat displayType={'text'} value={this.state.step} thousandSeparator={true} suffix={' BLC'} />
                          </h5>
                          {/* <h4>Current step: ${this.state.step}</h4> */}
                        </div>
                      </div>
                      <br />
                      <div className="bid-form">
                        <form className="form-inline" onSubmit={this.onSubmitBid}>
                          <BidInput className="form-control pr-5"
                            value={this.state.currentBidding}
                            onChange={(e) => {
                              if (!/[A-z]/.test(e.target.value)) {
                                this.setState({ currentBidding: +e.target.value })
                              }
                            }}
                            onClickDecrease={e => {
                              e.preventDefault()

                              if (this.state.currentBidding >= this.state.step) {
                                this.setState({ currentBidding: (this.state.currentBidding - this.state.step) })
                              }
                            }}
                            onClickIncrease={e => {
                              e.preventDefault()
                              this.setState({ currentBidding: (this.state.currentBidding + this.state.step) })
                            }}
                          ></BidInput>
                          {(this.state.itemDetail.startedAt !== 0
                            && this.state.timeLeft > 0
                            && waitForMining === false
                            && owner !== '' 
                            && owner !== window.web3.eth.accounts[0]
                          )
                            &&
                            <button style={{ marginLeft: '30px', marginTop: '10px' }} className="btn btn-primary mb-2" type="submit"><i className="fas fa-gavel"> Bid now</i></button>}
                          {(this.state.itemDetail.startedAt !== 0 
                            && this.state.timeLeft <= 0
                            && owner !== '' 
                            && owner !== window.web3.eth.accounts[0]
                            ) 
                            && 
                          <button className="btn btn-primary mb-2" onClick={this.onWithdraw} style={{ marginLeft: '22px', marginTop: '10px' }}>Withdraw BLC</button>}

                        </form>
                        {this.state.itemDetail.bids.length > 0 ? <p style={{ wordWrap: 'break-word', marginRight: '10px' }} className="alert alert-info light-word mt-2">
                          {/* Last bid by : {this.state.itemDetail.bids[0].userName} */}
                          Last bid by : {this.state.rs}
                        </p> : ''}
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="container">
                  <table id="placebid-border" className="table table-striped mt-4">
                    <thead>
                      <tr>
                        <th>Wallet Address</th>
                        <th>Bid Amount</th>
                        <th>Bidding Time</th>
                      </tr>
                    </thead>
                    <tbody className="light-word">
                      {
                        this.state.renderedBids.map((bid, i) => {
                          return (
                            <tr key={i}>
                              <td>{bid.address}</td>
                              <td>
                                {<NumberFormat displayType={'text'} value={bid.value} thousandSeparator={true} suffix={' BLC'} />}
                              </td>
                              <td>{dateFns.format(bid.time, 'HH:mm:ss MM/DD/YYYY')}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-center">
                    {bidders.length > 0 && <Pagination
                      margin={2}
                      page={pageBid}
                      count={Math.ceil(bidders.length / bidPerPage)}
                      onPageChange={this.handleBidPageChange}
                    />}
                  </div>
                </div>
                <hr />
                <div className="container">
                  <h3>Item description</h3>
                </div>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: itemDetail.details }} className="container">
                </div>
              </div>
              <div className="col-md-12 items-info mt-2">
                {(this.props.userId !== '' && itemDetail) && <RatingList userId={this.props.userId} itemDetail={itemDetail} itemId={this.props.match.params.id} isApproved={isApproved}></RatingList>}
              </div>
              <div className="col-md-12 items-info mt-2">
                <Comments itemId={this.props.match.params.id} userId={this.props.userId} startedAt={this.state.itemDetail.startedAt} io={this.props.io}></Comments>
              </div>
            </div>
            <div className="col-sm-3">
              {this.props.userId !== '' && <RecommendItems userId={this.props.userId} itemId={this.props.match.params.id}></RecommendItems>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ItemDetail
