import React, { Component, Fragment } from 'react'
import dateFns from 'date-fns'
import { Link } from 'react-router-dom'
import Pagination from './Pagination'
import '../styles/styles.css'


class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            newCommentContent: '',
            pageComment: 1,
            renderedComments: [],
            commentPerPage: 3
        }
        this.onSubmitComment = this.onSubmitComment.bind(this)
    }
    componentDidMount() {
        if (this.props.userId) {
            fetch(`/api/v1/items/${this.props.itemId}/comments`)
                .then(res => res.json())
                .then(comments => {
                    if (!comments.error) {
                        this.setState({ comments: comments.comments })
                        const renderedComments = 
                            comments.comments.slice((this.state.pageComment - 1) * 
                            this.state.commentPerPage, (this.state.pageComment - 1) * 
                            this.state.commentPerPage + this.state.commentPerPage)
                        this.setState({ renderedComments })
                    }
                })
        }
    }
    handleCommentPageChange = (page) => {
        const renderedComments = 
            this.state.comments.slice((page - 1) 
            * this.state.commentPerPage, (page - 1) 
            * this.state.commentPerPage + this.state.commentPerPage)
        this.setState({ pageComment: page, renderedComments })
    }

    onSubmitComment(e) {
        this.setState({ newCommentContent: '' })
        e.preventDefault()
        console.log("submit")
        this.props.io.socket.post(`/api/v1/items/${this.props.itemId}/comments`, {
            content: e.target.content.value,
            userId: this.props.userId
        }, (res) => {
            if (res.error) {
                console.log(res.msg)
            } else {
                let cloneComments = this.state.comments.slice()
                cloneComments.unshift(res.newComment)
                this.setState({ comments: cloneComments }, () => {
                    this.handleCommentPageChange(1)

                })
            }
        })

    }
    render() {
        const { pageComment, commentPerPage, renderedComments, comments } = this.state
        return (
            <Fragment>
                <div className="comment-titles pt-3">
                    <h3>Comments</h3>
                </div>
                <hr style={{ width: '825px', marginLeft: '-16px' }} />
                <div className="comment-content">
                    <div className="comment-block">
                        <div>
                            {(this.props.startedAt !== 0) &&
                                <div>
                                    <h4 className="light-word">Leave a comment here:</h4>
                                    <form onSubmit={this.onSubmitComment}>
                                        <textarea name="content" id="" cols="96" rows="5" style={{ resize: 'none' }} onChange={e => {
                                            this.setState({ newCommentContent: e.target.value })
                                        }} defaultValue={this.state.newCommentContent}></textarea>
                                        <button type="submit" className="btn btn-success mb-2" style={{ marginLeft: '-78px', marginTop: '70px' }} >Submit</button>
                                    </form>
                                </div>
                            }

                            <ul>
                                {renderedComments.map((cmt, i) => {
                                    return (
                                        <div className="cmt light-word pt-2" style={{ marginLeft: '-40px' }} key={i}>
                                            <div className="question italic-word">
                                                <li style={{ backgroundColor: '#F1F1F1', borderRadius: '10px', listStyleType: 'none', padding: '10px 10px' }} key={cmt.id}>
                                                    {cmt.content}
                                                    <div className="user-question">
                                                        <small style={{ color: '#7b7171' }}>by <Link to="#">{cmt.user.userName}</Link> - {dateFns.format(cmt.createdAt, 'hh:mm DD/MM/YYYY')}</small>
                                                    </div>
                                                    <hr />
                                                    <div className="answer italic-word">
                                                        <small>Have a nice day - <strong>Aution Blocha Team</strong></small>
                                                    </div>
                                                </li>
                                            </div>
                                        </div>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    {/*pagin*/}
                    <Pagination
                        margin={2}
                        page={pageComment}
                        count={Math.ceil(comments.length / commentPerPage)}
                        onPageChange={this.handleCommentPageChange}
                    />
                </div>
            </Fragment>
        )
    }
}


export default Comments
