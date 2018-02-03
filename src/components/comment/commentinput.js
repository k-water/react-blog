import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Card,
  Input,
  Button,
  message
} from 'antd'
import './comment.css'
const { TextArea } = Input
@connect(
  state => state
)
class CommentInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blogId: 1,
      userId: 2,
      commentContent: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount () {
    this.textarea.focus()
  }
  handleChange(event) {
    this.setState({
      commentContent: event.target.value
    })
  }
  handleSubmit() {
    if(!this.state.commentContent) {
      message.error('请先输入内容', 1)
    } else if(!this.props.user.user) {
      message.error('请先登录', 1)
    } else {
      this.props.createComment(this.state)
      this.setState({
        commentContent: ''
      })
    }
  }
  render() {
    return (
      <Card title="评论" bordered={false}>
        <div className="comment-input">
          <TextArea 
            rows={4}
            autosize={{minRows: 3}}
            value={this.state.commentContent}
            ref={(textarea) => this.textarea = textarea}
            onChange={this.handleChange}
          />
        </div>
        <div className="comment-submit">
          <Button 
            ghost 
            type="primary"
            onClick={this.handleSubmit}
          >
            发布
          </Button>
        </div>
      </Card>
    )
  }
}

export default CommentInput