/*global FB*/
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import '../styles/styles.css'
import { LOADING_LOGIN_STATUS, LOADED_LOGIN_STATUS, GUEST_STATUS } from '../config'
import Notifications from './Notifications'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import Web3 from 'web3';
import DappTokenSale from '../contracts/DappTokenSale.json'
import DappToken from '../contracts/DappToken.json'




class Header extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// isLoggedIn: false,
			name: '',
			loading: false,
			categories: [],
			keywords: '',
			results: [],
			found: true,
			modal: false,
			balance: 0,
			amount: ''
		}
		this.handleLogOut = this.handleLogOut.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.updateKeyWord = this.updateKeyWord.bind(this)
		this.toggle = this.toggle.bind(this);

		if (typeof this.web3 !== 'undefined') {
			this.web3Provider = this.web3.currentProvider
		} else {
			this.web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/99efdc0bd45147cebbdfd88e5eff1d75')
		}
		this.web3 = window.web3
	}
	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}
	handleLogOut(e) {
		e.preventDefault()
		this.props.logOut()
	}
	componentDidMount() {
		fetch(`${root}/api/v1/categories`).then(res => res.json()).then(res => {
			let cloneCat = this.state.categories.slice()
			res.cats.map(cat => {
				cloneCat[cat.id] = cat.name
				return true
			})
			this.setState({ categories: cloneCat })
		})
		if (window.web3) {
			var tokenContract = this.web3.eth.contract(DappToken.abi)
			this.blcToken = tokenContract.at('0x3347c9bca8040e7A5bf0E0dF1D0F4Af343e09557')
			setInterval(() => {
				this.blcToken.balanceOf(window.web3.eth.accounts[0], (err, balance) => {
					this.setState({ balance: balance.toNumber() })
				})
			}, 100)
			var saleTokenContract = this.web3.eth.contract(DappTokenSale.abi)
			this.saleToken = saleTokenContract.at('0x9015bE8db734884845698Cde0fc5020A575De76B')
		}
	}

	componentWillMount() {
		// this.props.checkStatus()
	}
	updateKeyWord(e) {
		e.preventDefault()
		this.setState({ keywords: e.target.value })
		fetch(`${root}/api/v1/search?search=${e.target.value}`)
			.then(data => data.json())
			.then(data => {
				if (data.resultItem) {
					this.setState({ results: data.resultItem })
				}
			})
	}
	handleSearch(e) {
		e.preventDefault()
		if (this.state.keywords !== '') {
			fetch(`${root}/api/v1/search?search=${this.state.keywords}`)
				.then(res => res.json())
				.then(res => {
					var itemsFound = res.resultItem
					console.log(itemsFound)
					if (itemsFound.length === 0) {
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
		this.setState({ keywords: '' })
	}
	handleLogin(e) {
		e.preventDefault()
		this.props.logIn()
	}
	handleBuyToken = (e) => {
		e.preventDefault()
		const { amount } = this.state
		console.log(typeof +amount)
		this.saleToken.buyTokens(+amount,
			{ from: window.web3.eth.accounts[0], gas: 500000, value: (+amount * 1000000000000000) },
			(err, txHash) => {
				if (err) {
					console.log(err)
				} else {
					console.log(txHash)
				}
			})
	}
	onClick(e) {
		e.preventDefault()
		FB.login(console.log)
	}
	render() {
		const { keywords } = this.state
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
										{this.props.userId !== '' ? <Notifications userId={this.props.userId} io={this.props.io} ></Notifications> : <i className="far fa-bell"></i>}
										<div className="nav-item dropdown">
											<Link style={{ color: 'white' }} className="nav-link dropdown-toggle" to="" id="header-account-menu-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-user"></i></Link>
											<div className="dropdown-menu account-menu" aria-labelledby="header-account-menu-link">
												<Link className="dropdown-item" to="#" onClick={this.toggle}>{this.props.name}</Link>
												<Modal isOpen={this.state.modal} onClosed={e => {
													this.setState({ amount: '' })
												}}
													toggle={this.toggle} className={this.props.className}>
													<ModalHeader toggle={this.toggle}>{this.props.name}</ModalHeader>
													<ModalBody>
														{
															window.web3 ? (
																<Form>
																	<FormGroup>
																		<Label for="exampleAddress">Wallet Address</Label>
																		<Input type="text" value={window.web3.eth.accounts[0]} name="wallet" id="exampleAddress" disabled placeholder="" style={{ width: '100%' }} />
																	</FormGroup>
																	<FormGroup>
																		<Label for="exampleBalance">Balance</Label>
																		<Input type="text" value={this.state.balance + ' BLC'} name="balance" id="exampleBalance" disabled placeholder="" style={{ width: '100%' }} />
																	</FormGroup>
																	<FormGroup>
																		<Label for="exampleToken">Number Of BlochaCoins (BLC)</Label>
																		<Input
																			value={this.state.amount}
																			onChange={(e) => {
																				if (/^-{0,0}[0-9]{1,}(\.{1,1}[0-9]{1,}|\.{0,0})$/.test(+e.target.value)) {
																					this.setState({ amount: e.target.value })
																				}
																			}}
																			name="token" id="exampleToken" placeholder="" style={{ width: '100%' }}
																		/>
																		{
																			this.state.amount === '' ? (
																				<p className="alert alert-danger text-center mt-4">1 BLC = 0.001 ETH</p>
																			) : (
																					<p className="alert alert-danger text-center mt-4">{this.state.amount} BLC = {this.state.amount * 0.001} ETH</p>
																				)
																		}
																	</FormGroup>
																	<Button color="primary" onClick={this.handleBuyToken} type="submit" style={{ marginLeft: '40%', width: '100px' }}>Buy</Button>{' '}
																</Form>
															) : (
																	<p className="alert alert-danger text-center">
																		Due to security reasons, please <strong >install</strong> and <strong>login</strong> to Meta Mask</p>
																)
														}
													</ModalBody>
												</Modal>
												<Link className="dropdown-item" to="/dashboard">Dashboard</Link>
												{this.props.isAdmin ? <Link className="dropdown-item" to="/admin">Admin Panel <span className="badge badge-danger" style={{ position: 'absolute', left: '120px', top: '77px', borderRadius: '10px' }} ></span></Link> : ''}
												<Link className="dropdown-item" to="/logout" onClick={this.handleLogOut}>Sign Out</Link>
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
										<button className="loginBtn loginBtn--facebook" onClick={this.handleLogin}>Login with Facebook</button>
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
			</div>
		)
	}
}
export default withRouter(Header)
