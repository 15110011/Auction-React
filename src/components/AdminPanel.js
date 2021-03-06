import React, { Component } from 'react'
import '../styles/styles.css'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import _ from 'lodash';
import { CREATED_MODE, DELETED_MODE, UPDATED_MODE } from '../config';
import AdminPendingItems from './AdminPendingItems';
import AdminCategories from './AdminCategories';
import AdminBalance from './AdminBalance'

class AdminPanel extends Component {
    constructor(props) {
        super(props)
        this.state = { activeTab: '1', categories: [] }
        this.toggle = this.toggle.bind(this);
        this.updateCategories = this.updateCategories.bind(this)
    }
    componentDidMount() {

        fetch(`${root}/api/v1/categories`).then(res => res.json()).then(cat => {
            if (!cat.error)
                this.setState({ categories: cat.cats })
        })
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    updateCategories(newCat, mode) {

        if (newCat.id) {
            let cloneCats = this.state.categories.slice()
            if (mode === CREATED_MODE) {
                newCat.items = []
                cloneCats.push(newCat)
                this.setState({ categories: cloneCats })
            }
            else if (mode === DELETED_MODE) {

                let remainCats = _.filter(cloneCats, cat => {
                    return cat.id !== +newCat.id
                })
                console.log(remainCats)
                this.setState({ categories: remainCats })
            }
            else if (mode === UPDATED_MODE) {
                let index = _.findIndex(cloneCats, cat => {
                    return cat.id === +newCat.id
                })
                if (index > -1) {
                    cloneCats[index].name = newCat.name
                    this.setState({ categories: cloneCats })
                }
            }
        }
    }
    render() {
        return (
            <div style={{ position: 'relative', zIndex: '1000', marginTop: '130px' }}>
                {this.props.isAdmin ? <div className="container adminpanel" style={{ paddingTop: '70px' }}>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                            >
                                Pending Items
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                            >
                                Category
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggle('3'); }}
                            >
                                Withdraw Money
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} id="admin-panel">
                        <TabPane tabId="1">
                            <AdminPendingItems {...this.props} categories={this.state.categories} ></AdminPendingItems>
                        </TabPane>
                        <TabPane tabId="2">
                            <AdminCategories {...this.props} categories={this.state.categories} updateCategories={this.updateCategories}></AdminCategories>
                        </TabPane>
                        <TabPane tabId="3">
                            <AdminBalance ></AdminBalance>
                        </TabPane>
                    </TabContent>
                </div> : <div className="container adminpanel" style={{ paddingTop: '30px' }}>
                        <p className="alert alert-danger text-center light-word">Only Admin Can Enter This Page</p>
                    </div>}
            </div>
        )
    }

}
export default AdminPanel