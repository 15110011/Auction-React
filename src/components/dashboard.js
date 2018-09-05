import React, { Component } from 'react'
import '../styles/styles.css'
import { GUEST_STATUS } from '../config';
import EditItem from './editItem'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import _ from 'lodash'
import { Link, Route } from 'react-router-dom'
import { convertFromHTML, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
    Modal, ModalHeader, ModalBody,
    Button, Input, Form, FormGroup, Label, ButtonGroup,
    Row, Container
} from 'reactstrap';
import Pagination from './Pagination'
import NumberFormat from 'react-number-format';


class DashBoard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userID: '',
            loadingItem: true,
            name: '',
            currentPrice: '',
            quantity: '',
            details: '',
            categoriesId: '',
            categories: [],
            items: [],
            value: '',
            isAdded: false,
            isDeleted: false,
            isEditing: false,
            itemId: '',
            isEdited: false,
            isAdding: true,
            contentState: {},
            editorState: EditorState.createEmpty(),
            modal: false,
            checkValidInput: true,
            images: [],
            count: 0,
            period: 1,
            total: 0,
            page: 1,
            renderedItems: [],
            itemPerPage: 10,
            search: '',
            filteredItems: [],
            sort: {}
        }
        this.handleAddItem = this.handleAddItem.bind(this)
        this.getItem = this.getItem.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.editSuccess = this.editSuccess.bind(this)
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
        this.toggle = this.toggle.bind(this)
        this.onInputFileChange = this.onInputFileChange.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
        this.uploadImage = React.createRef();
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    componentDidMount() {
        this.mounted = true
        // FB.api('/me', data => {
        //     if (!data.error) {
        //         this.setState({ userID: data.id, loadingItem: false }, () => {
        //             this.getItem()
        //         })
        //     }
        // })
        fetch(`${root}/api/v1/categories`).then(res => res.json()).then(res => {
            let cloneCat = this.state.categories.slice()
            res.cats.map(cat => {
                cloneCat[cat.id] = cat.name
                return true
            })

            // let initCat =[]
            // initCat.push(...res.cats)
            if (!this.mounted) { return }
            this.setState({ categories: cloneCat })


        })
    }
    componentWillUnmount() {
        this.mounted = false
    }
    onSort = (e) => {
        let sortKey = e.currentTarget.name
        let { sort, items, filteredItems } = this.state
        let lastStatus = sort[sortKey]
        
        sort = {}
        sort[sortKey] = !lastStatus
    
        this.setState({
            sort
        }, () => {
            let sortCriteria = []
            sortCriteria.push(sortKey)

            let cloneItems = [].concat(filteredItems.length > 0 ? filteredItems : items)
            if (sortCriteria.indexOf('name') !== -1) {
                cloneItems = _.sortBy(cloneItems, [o => o.name.toLowerCase()])
            }
            else {
                cloneItems = _.sortBy(cloneItems, sortCriteria)
            }
            if(lastStatus===true)
            {
                cloneItems = cloneItems.reverse()
            }
            this.setState({ filteredItems: cloneItems, total: cloneItems.length }, () => {
                this.handlePageChange(1)
            })
        })
    }
    handleDelete(e) {
        let value = e.currentTarget.value
        fetch(`${root}/api/v1/items/${value}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then((rs) => {
                if (rs.deleteItem) {
                    this.setState({ isDeleted: true })
                    setTimeout(() => {
                        this.setState({ isDeleted: false })
                    }, 1000)
                    var items = this.state.items.slice()
                    items = items.filter((item) => {
                        return item.id !== +value
                    })
                    const renderedItems = items.slice((this.state.page - 1) * this.state.itemPerPage, (this.state.page - 1) * this.state.itemPerPage + this.state.itemPerPage)
                    this.setState({ items, renderedItems })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
    };
    onInputFileChange(e) {
        console.log(e.target)

        if (e.target.files.length > 3) {
            this.setState({ checkValidInput: false })
        } else {
            console.log(e.target.files)
            this.setState({ checkValidInput: true, images: e.target.files, count: e.target.files.length })
        }
    }
    handleAddItem(e) {

        e.preventDefault()
        const inputImages = this.state.images
        const form = new FormData(e.target)
        // const form = new FormData()
        // console.log(inputImages[0])
        form.append('details', draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
        for (var i = 0; i < 3; i++) {
            console.log(inputImages[i])
            form.append('files', inputImages[i])
        }
        fetch(`${root}/api/v1/items`, {
            method: 'POST',
            body: form,
            credentials: 'include'
        })
            .then(res => res.json())
            .then((res) => {
                if (res.item) {

                    this.setState({ isAdded: true, name: '', quantity: '', currentPrice: '', details: '', count: 0, editorState: '' })
                    this.getItem()
                    setTimeout(() => {
                        this.setState({ isAdded: false })
                        this.props.history.push("/dashboard")
                    }, 1000)
                }
            })
    }
    editSuccess(target) {
        var items = this.state.items.slice()
        let curItem = _.findIndex(items, { id: this.state.itemId })
        if (curItem > -1) {

            items[curItem].name = target.name.value
            items[curItem].currentPrice = target.currentPrice.value
            items[curItem].quantity = target.quantity.value

            items[curItem].details = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
            items[curItem].categoriesId = target.categories.value
            items[curItem].period = target.period.value
            this.setState({
                items,
                isEditing: false,
                isEdited: true,
                isAdding: true,
                name: '',
                currentPrice: '',
                quantity: '',
                editorState: '',
                count: 0,
                period: ''
            })
            setTimeout(() => {
                this.setState({ isEdited: false })
            }, 1000)
        }

    }
    handleEdit(e) {
        e.preventDefault()
        let value = e.currentTarget.value
        let item = this.state.items.filter((info) => {
            return info.id === +value
        })
        const content = item[0].details
        const blocksFromHTML = convertFromHTML(content)
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
        console.log(content)
        this.setState({
            isEditing: true,
            isAdding: false,
            name: item[0].name,
            currentPrice: item[0].currentPrice,
            quantity: item[0].quantity,
            // details: item[0].details,
            editorState: EditorState.createWithContent(state),
            categoriesId: item[0].categoriesId,
            itemId: item[0].id,
            period: item[0].period
        })


    }

    handleCancel(e) {
        e.preventDefault()
        this.setState({
            isEditing: false,
            isEdited: false,
            isAdding: true,
            name: '', quantity: '', currentPrice: '', details: '', editorState: ''
        })
    }

    getItem() {
        fetch(`${root}/api/v1/users/${this.props.userId}/items`, {
            credentials: 'include'
        })
            .then(items => {
                return items.json()
            })
            .then(items => {

                this.setState({ items: items.findItem, renderedItems: items.findItem.slice(0, this.state.itemPerPage), total: items.findItem.length, page: 1, loadingItem: false })
            })

    }
    handlePageChange(page) {
        const { filteredItems } = this.state
        let renderedItems
        if (filteredItems.length === 0) {
            renderedItems = this.state.items.slice((page - 1) * this.state.itemPerPage, (page - 1) * this.state.itemPerPage + this.state.itemPerPage)
        }
        else {
            renderedItems = filteredItems.slice((page - 1) * this.state.itemPerPage, (page - 1) * this.state.itemPerPage + this.state.itemPerPage)
        }
        this.setState({ page, renderedItems })

    }
    handleChange(e) {
        this.setState({ categoriesId: e.target.value })
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.userId && this.state.loadingItem) {
            this.getItem()
        }
        return true
    }
    handleSearch = (e) => {

        e.preventDefault()

        const { items, categories } = this.state
        let cloneItems = [].concat(items)
        cloneItems = cloneItems.filter((cur) => {
            let temp = {}
            Object.assign(temp, cur)
            if (temp.isAccept === 1) {
                temp.isAccept = 'Accepted'
            }
            else if (temp.isAccept === 0) {
                temp.isAccept = 'Rejected'
            }
            else temp.isAccept = 'Pending'
            temp.categoriesId = categories[temp.categoriesId]
            return JSON.stringify(Object.values(temp)).toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        })
        this.setState({ filteredItems: cloneItems, total: cloneItems.length }, () => {
            this.handlePageChange(1)
        })
    }

    onPressDefault = () => {
        const { items } = this.state

        this.setState({ filteredItems: [], total: items.length }, () => {
            this.handlePageChange(1)
        })
    }

    render() {
        const { page, total, renderedItems, itemPerPage, sort } = this.state

        if (this.props.loggedIn === GUEST_STATUS) {
            return (
                <div className="container">
                    <p className="alert alert-danger" id="expired" style={{ marginTop: '75px' }}>Please log in</p>
                </div>
            )
        }

        return (
            <div className="container" style={{ position: 'relative', zIndex: '1000', marginTop: '120px' }}>
                <div className="dashboard">
                    {
                        this.state.expire === true && (
                            <p className="errorsInput" id="expired">Please logged in</p>
                        )
                    }
                    <div className="intro-dashboard">
                        <center>
                            <h2 className="light-word text-uppercase" style={{ fontWeight: '600' }}>Add your items below</h2>
                            <br />
                        </center>
                    </div>
                    <input type="file" name="files" ref={this.uploadImage} id="inputFile" accept="image/*" style={{ opacity: '0' }} multiple onChange={this.onInputFileChange} />
                    <EditItem
                        {...this.state}
                        handleEdit={this.handleEdit}
                        handleCancel={this.handleCancel}
                        editClick={this.editClick}
                        handleChange={this.handleChange}
                        editSuccess={this.editSuccess}
                        onEditorStateChange={this.onEditorStateChange}
                        onContentStateChange={this.onContentStateChange}
                    />
                    <Route path="/dashboard/add" render={() => (
                        <Modal isOpen={true} size="lg" >
                            <ModalHeader style={{ width: '100%' }}>Add new item <Link className='btn text-dark' to="/dashboard">X</Link> </ModalHeader>
                            <ModalBody>
                                <Container>
                                    <Row>
                                        {
                                            !this.state.checkValidInput ? (
                                                <p className="errorsInput" id="validFile">Only 3 images allowed!!</p>

                                            ) : ''
                                        }
                                        {
                                            this.state.isAdded === true && (
                                                <div className="alert alert-warning" role="alert">
                                                    <strong>Item added</strong>
                                                </div>

                                            )
                                        }
                                        <Form onSubmit={this.handleAddItem} encType="multipart/form-data">
                                            <input
                                                type="hidden"
                                                name="userId"
                                                value={this.props.userId}
                                            />
                                            <input
                                                type="hidden"
                                                name="itemId"
                                                value={this.state.itemId}
                                            />
                                            <div className="info">
                                                <div className="row light-word">
                                                    <h3 style={{ marginTop: '5px', paddingLeft: '5px', fontWeight: '600' }}>Infomation</h3>
                                                </div>
                                                <Row>
                                                    <div className="col-md-6 col-xs-12">
                                                        <FormGroup>
                                                            <Label for="exampleName">Name <span title="Nhập cmn vào" id="force">(*)</span></Label>
                                                            <Input type="text" name="name" id="exampleName" placeholder="Car..."
                                                                value={this.state.name}
                                                                onChange={e => this.setState({ name: e.target.value })}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-md-6 col-xs-12">
                                                        <FormGroup>
                                                            <Label for="exampleEmail">Price (BLC) <span id="force">(*)</span></Label>
                                                            <Input type="number" name="currentPrice" title="Price in BLC" id="examplePrice" min="0"
                                                                value={this.state.currentPrice}
                                                                onChange={e => this.setState({ currentPrice: e.target.value })}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-md-6 col-xs-12">
                                                        <FormGroup>
                                                            <Label for="example">Quantity <span title="Nhập cmn vào" id="force">(*)</span></Label>
                                                            <Input type="number" name="quantity" id="exampleQuantity" min="0"
                                                                value={this.state.quantity}
                                                                onChange={e => this.setState({ quantity: e.target.value })}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-md-6 col-xs-12">
                                                        <FormGroup>
                                                            <Label for="example">Category <span title="Nhập cmn vào" id="force">(*)</span></Label>
                                                            <Input type="select" name="categories" id="exampleSelect" onChange={this.handleChange}>
                                                                <option defaultValue></option>
                                                                {this.state.categories.map((cat, index) => {
                                                                    return (<option value={index} key={index}>{cat}</option>)
                                                                })}
                                                            </Input>
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-md-6 col-xs-12">
                                                        <FormGroup>
                                                            <Label for="example">Duration (hours) <span title="Nhập cmn vào" id="force">(*)</span></Label>
                                                            <Input type="select" name="period" onChange={e => this.setState({ period: e.target.value })}>
                                                                <option value="1" defaultValue>1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="5">5</option>
                                                            </Input>
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-md-6 col-xs-12">
                                                        <FormGroup>
                                                            <Label>Images</Label>
                                                            <div>
                                                                <Button style={{ width: '150px' }} type="button" color="success" onClick={() => {
                                                                    this.uploadImage.current.click()
                                                                }}>Choose ({this.state.count})</Button>
                                                            </div>

                                                        </FormGroup>

                                                    </div>
                                                </Row>
                                            </div>
                                            <div className="detail mt-2">
                                                <div className="detail-form mt-2">
                                                    <div className="row detai-intro mb-1 light-word" >
                                                        <h3 style={{ marginTop: '5px', paddingLeft: '5px', fontWeight: '600' }}>Details</h3>
                                                    </div>
                                                    <div className="row detail-field">
                                                        <p className="col alert alert-success light-word">Describe about your item, for example: type, materials, etc...</p>
                                                        <div className="editor" style={{ marginTop: '-12px' }}>
                                                            <Editor placeholder="Detail about your item..."
                                                                editorState={this.state.editorState}
                                                                onEditorStateChange={this.onEditorStateChange}

                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ButtonGroup className="d-flex justify-content-center pb-3" style={{ marginTop: '80px' }}>
                                                <Button style={{ width: '150px' }} type="submit" color="primary">Submit</Button>
                                            </ButtonGroup>

                                            {
                                                this.state.isDeleted === true && (
                                                    <div className="alert alert-warning" role="alert">
                                                        <strong>Item deleted</strong>
                                                    </div>

                                                )
                                            }
                                            {
                                                this.state.isEdited === true && (
                                                    <div className="alert alert-warning" role="alert">
                                                        <strong>Item edited</strong>
                                                    </div>
                                                )
                                            }
                                        </Form>
                                    </Row>
                                </Container>
                            </ModalBody>
                        </Modal>
                    )} />
                    <div className="d-flex justify-content-between">

                        <div className="input-group" style={{ width: '30%' }}>
                            <Form inline onSubmit={this.handleSearch}>
                                <Input className='form-control' type="search" value={this.state.search} onChange={(e) => {
                                    this.setState({ search: e.target.value })
                                }} placeholder="Search ...">
                                </Input>
                                <div className="input-group-append">
                                    <Button color="primary" type="submit" onClick={this.handleSearch}>
                                        <i className='fas fa-search'></i>
                                    </Button>
                                    <Button color="secondary" onClick={(e) => {
                                        this.setState({ search: '' },
                                            () => {
                                                this.onPressDefault(e)
                                            }
                                        )
                                    }}>
                                        <i className='fas fa-sync'></i>
                                    </Button>
                                </div>
                            </Form>
                        </div>



                        <Link className="btn btn-primary" to="/dashboard/add">Add</Link>
                    </div>
                    <div className="mt-3 pt-3" id="adddel-form">
                        {this.state.loadingItem ? <div style={{ textAlign: 'center', zIndex: '900', position: 'relative' }}><img src="./images/loading.gif" alt="img" style={{ maxHeight: '400px', maxWidth: '400px' }} /></div> :
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ paddingBottom: '20px' }}>
                                            #
                                        </th>
                                        <th scope="col">
                                            Name
                                            <Button color="info" name='name' onClick={this.onSort} className="ml-3 text-dark">
                                                {sort.name ?
                                                    <i className="fas fa-sort-alpha-up"></i>
                                                    :
                                                    <i className="fas fa-sort-alpha-down"></i>
                                                }
                                            </Button>
                                        </th>
                                        <th scope="col">
                                            Price (BLC)
                                            <Button color="info" name='currentPrice' onClick={this.onSort} className="ml-3 text-dark">
                                                {sort.currentPrice ?
                                                    <i className="fas fa-sort-alpha-up"></i>
                                                    :
                                                    <i className="fas fa-sort-alpha-down"></i>
                                                }
                                            </Button>
                                        </th>
                                        <th scope="col">
                                            Quantity
                                            <Button color="info" name='quantity' onClick={this.onSort} className="ml-3 text-dark">
                                                {sort.quantity ?
                                                    <i className="fas fa-sort-alpha-up"></i>
                                                    :
                                                    <i className="fas fa-sort-alpha-down"></i>
                                                }
                                            </Button>
                                        </th>
                                        <th scope="col">
                                            Category
                                            <Button color="info" className="ml-3 text-dark" name='categoriesId' onClick={this.onSort}>
                                                {sort.categoriesId ?
                                                    <i className="fas fa-sort-alpha-up"></i>
                                                    :
                                                    <i className="fas fa-sort-alpha-down"></i>
                                                }
                                            </Button>
                                        </th>
                                        <th scope="col" style={{ paddingBottom: '20px' }}>
                                            Details
                                        </th>
                                        <th scope="col" style={{ paddingBottom: '20px' }}>
                                            Action
                                        </th>
                                        <th scope="col">
                                            Status
                                            <Button color="info" className="ml-3 text-dark" onClick={this.onSort} name='isAccept'>
                                                {sort.isAccept ?
                                                    <i className="fas fa-sort-alpha-up"></i>
                                                    :
                                                    <i className="fas fa-sort-alpha-down"></i>
                                                }
                                            </Button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="light-word">
                                    {
                                        renderedItems.map((item, i) => {
                                            return (
                                                <tr className="fixprop" key={item.id}>
                                                    <th scope="row"> {(page - 1) * itemPerPage + (i + 1)}</th>
                                                    <td>
                                                        <p title={item.name}>
                                                            {item.name.length >= 18 ? `${item.name.slice(0, 18)}...` : `${item.name}`}
                                                        </p>
                                                    </td>
                                                    <td><NumberFormat displayType={'text'} value={item.currentPrice} thousandSeparator={true} suffix={' BLC'} /></td>
                                                    <td>{item.quantity}</td>
                                                    <td>{this.state.categories[item.categoriesId]}</td>
                                                    <td>
                                                        <div className="edit-del">
                                                            <Link className="btn btn-info" style={{ color: '#1d93c1' }} to={`/items/${item.id}`}><i className="fas fa-eye"></i></Link>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="edit-del">
                                                            {item.isAccept !== 1 ?
                                                                <div>
                                                                    <button className="btn btn-success" onClick={this.handleEdit} value={item.id}><i className="far fa-edit"></i></button>
                                                                    <button className="btn btn-danger mx-2" onClick={this.handleDelete} value={item.id}><i className="far fa-trash-alt"></i></button>
                                                                </div> : <p className="text-info">No action</p>
                                                            }
                                                        </div>
                                                    </td>
                                                    {
                                                        item.isAccept === 1 && (
                                                            <td><span className="badge badge-pill badge-success light-word">Accepted</span></td>

                                                        )

                                                    }
                                                    {
                                                        item.isAccept === 0 && (
                                                            <td><span className="badge badge-pill badge-danger light-word">Rejected</span></td>

                                                        )

                                                    }
                                                    {
                                                        item.isAccept === null && (
                                                            <td><span className="badge badge-pill badge-secondary light-word">Pending</span></td>

                                                        )

                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>}
                        <Pagination aria-label="Page navigation example"
                            margin={2}
                            page={page}
                            count={Math.ceil(total / itemPerPage)}
                            onPageChange={this.handlePageChange}
                        />


                    </div>
                </div>
            </div>
        )
    }
}
export default DashBoard
