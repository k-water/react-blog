import React, { Component } from 'react'
import CommentInput from './commentinput'
import CommentList from './commentlist'
import { connect } from 'react-redux'
import { createComment } from '../../redux/comment.redux'
@connect(
  state => state.comment,
  { createComment }
)
class Comment extends Component {
  render() {
    return (
      <div className="comment-wrap">
        <CommentInput 
          createComment={this.props.createComment}
        />
        <CommentList />
      </div>
    )
  }
}

export default Comment