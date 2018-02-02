import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  List,
  Avatar
} from 'antd'
@connect(
  state => state.blog
)
class CommentList extends Component {
  render() {
    return (
      <div className="comment-list">
        {
          this.props.desc.comments ?
          <List
            itemLayout="horizontal"
            dataSource={this.props.desc.comments}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf'}}>
                      {item.user.username[0]}
                    </Avatar>
                  }
                  title={<span>{item.user.username}</span>}
                  description={item.content}
                />
              </List.Item>
            )}
          /> : null
        }
      </div>
    )
  }
}

export default CommentList