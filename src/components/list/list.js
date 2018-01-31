import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  List,
  Icon
} from 'antd'
import {
  getBlogList
} from '../../redux/blog.redux'
import './list.css'
@connect(
  state => state.blog,
  { getBlogList }
)
class BlogList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1
    }
  }
  componentDidMount() {
    this.props.getBlogList()
  }
  render() {
    const pagination = {
      pageSize: 10,
      current: this.state.current,
      total: this.props.totalElements,
      onChange: ((page, pageSize) => {
        this.setState({
          current: page
        })
        this.props.getBlogList(page - 1)
      }),
    }
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    )
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={pagination}
        dataSource={this.props.content}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={
              [<IconText type="like-o" text={item.voteSize} />, 
              <IconText type="message" text={item.commentSize} />
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={item.summary}
            />
          </List.Item>
        )}
      />
    )
  }
}

export default BlogList