import React, { Component } from 'react'
import {
  Card,
  Input,
  Button
} from 'antd'
import './comment.css'
const { TextArea } = Input
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
    this.props.createComment(this.state)
    this.setState({
      commentContent: ''
    })
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