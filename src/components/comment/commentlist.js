import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDateDiff } from '../../utils/utils'
import {
  List,
  Avatar,
  Tag
} from 'antd'
@connect(
  state => state.blog
)
class CommentList extends Component {
  render() {
    return (
      <div className="comment-list">
        {
          this.props.desc.comment ?
          <List
            size="small"
            itemLayout="horizontal"
            dataSource={this.props.desc.comment}
            renderItem={item => (
              <List.Item actions={[
                <Tag style={{marginRight: 0}}>{getDateDiff(+new Date(item.created_at))}</Tag>
              ]}>
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