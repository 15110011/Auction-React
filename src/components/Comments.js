import React, { Component } from 'react'
import { render } from 'react-dom'

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
        e.preventDefault()
        console.log("submit")
        this.props.io.socket.post(`/api/v1/items/${this.props.itemId}/comments`, {
            content: e.target.content.value,
            user: this.props.userId
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
                <ul>
                    {this.state.comments.map(cmt => {
                        return (
                            <li key={cmt.id}>
                                {cmt.content}
                            </li>
                        )
                    })}
                </ul>
                <form onSubmit={this.onSubmitComment}>
                    <textarea name="content" id="" cols="30" rows="10" onChange={e => {
                        this.setState({ newCommentContent: e.target.value })
                    }}>{this.state.newCommentContent}</textarea>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        )
    }
}


export default Comments