import React, { Component } from 'react'
import dateFns from 'date-fns'
import { Link } from 'react-router-dom'


class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            newCommentContent: ''

        }
        this.onSubmitComment = this.onSubmitComment.bind(this)
    }
    componentDidMount() {
        if (this.props.userId) {
            fetch(`/api/v1/items/${this.props.itemId}/comments`)
                .then(res => res.json())
                .then(comments => {
                    if (!comments.error)
                        this.setState({ comments: comments.comments })
                })
        }
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
                this.setState({ comments: cloneComments })
            }
        })

    }
    render() {
        return (
            <div>
                {(this.props.startedAt !== 0) &&
                    <div>
                        <h4 className="bolditalic-word">Leave a comment here</h4>
                        <form onSubmit={this.onSubmitComment}>
                            <textarea name="content" id="" cols="96" rows="5" style={{ resize: 'none' }} onChange={e => {
                                this.setState({ newCommentContent: e.target.value })
                            }} defaultValue={this.state.newCommentContent}></textarea>
                            <button type="submit" className="btn btn-success mb-2" style={{ marginLeft: '-78px', marginTop: '70px' }} >Submit</button>
                        </form>
                    </div>
                }

                <ul>
                    {this.state.comments.map((cmt, i) => {
                        return (
                            <div className="cmt light-word pt-2" style={{ marginLeft: '-40px' }} key={i}>
                                <div className="question italic-word">
           CategoryShow.js                         <li style={{ backgroundColor: '#F1F1F1', borderRadius: '10px', listStyleType: 'none', padding: '10px 10px' }} key={cmt.id}>
                                        {cmt.content}
                                        <div className="user-question">
                                            <small style={{ color: '#7b7171' }}>by <Link to="#">{cmt.user.userName}</Link> - {dateFns.format(cmt.createdAt, 'hh:mm DD/MM/YYYY')}</small>
                                        </div>
                                        <hr />
                                        <div className="answer italic-word">
                                            <small>Hỏi cmm - <strong>Aution Blocha team</strong></small>
                                        </div>
                                    </li>
                                </div>
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    }
}


export default Comments
