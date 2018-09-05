import React, { Component } from 'react'
import { FormGroup, Label, Input, Form, Button } from 'reactstrap';
import '../styles/styles.css'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DappTokenSale from '../contracts/DappTokenSale.json'
import Web3 from 'web3';



class AdminBalance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      getMetaMask: true,
      waitForMining: false,
      sendTransaction: true
    }
    if (typeof this.web3 !== 'undefined') {
      this.web3Provider = this.web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider(
        'https://ropsten.infura.io/99efdc0bd45147cebbdfd88e5eff1d75')
    }
    this.web3 = window.web3
  }
  componentWillMount() {
    if (window.web3) {
      var saleTokenContract = this.web3.eth.contract(DappTokenSale.abi)
      this.saleToken = saleTokenContract.at('0x1a1a0294f26da590fdfe9c78b8193d73ca791e2a')
      this.web3.eth.getBalance(window.web3.eth.accounts[0], (err, balance) => {
        this.setState({ balance: this.web3.fromWei(balance.toNumber(), 'ether') })
      })
    } else {
      this.setState({ getMetaMask: false })
    }
  }
  handleWithdraw = (e) => {
    e.preventDefault()
    if (window.web3.eth.accounts[0] && window.web3.eth.accounts[0] ===
      '0xcb000a6bd06efed410b8438100c46c98f685c616') {
      this.saleToken.withdrawEth((err, txHash) => {
        if (err) {
          this.setState({ sendTransaction: false })
          setInterval(() => {
            this.setState({ sendTransaction: true })
          }, 2000)
          return
        }
        this.setState({ waitForMining: true })
        var filter = this.web3.eth.filter('lastest')
        filter.watch((err, rs) => {
          this.web3.eth.getTransactionReceipt(txHash, (err, block) => {
            if (block && block.transactionHash === txHash) {
              this.web3.eth.getBalance(window.web3.eth.accounts[0], (err, balance) => {
                this.setState({
                  balance: this.web3.fromWei(balance.toNumber(), 'ether'),
                  waitForMining: false
                })
              })
            }
          })
        })
      })
    } else {
      alert('Only admin can withdraw the money')
    }
  }
  render() {
    const { getMetaMask, waitForMining, sendTransaction } = this.state
    return (
      <Form>
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
        <FormGroup className="text-center pt-3">
          <Label for="exampleAddress">Wallet Address</Label>
          <Input type="text" value={window.web3.eth.accounts[0]} name="wallet" id="exampleAddress" disabled placeholder="" style={{ width: '50%', marginLeft: '26%' }} />
        </FormGroup>
        <FormGroup className="text-center">
          <Label for="exampleBalance">Balance (in ETH)</Label>
          <Input type="text" value={this.state.balance} name="balance" id="exampleBalance" disabled placeholder="" style={{ width: '50%', marginLeft: '26%' }} />
        </FormGroup>
        {
          waitForMining ? (
            <p className="alert alert-info text-center mt-5">Please wait for transaction to be confirmed, be patient</p>
          ) : (
              <Button color="primary" onClick={this.handleWithdraw} type="submit"
                style={{ marginLeft: '40%' }}>Withdraw ETH from contract</Button>
            )
        }
      </Form>
    )
  }
}
export default AdminBalance