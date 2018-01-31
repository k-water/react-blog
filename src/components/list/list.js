import React, { Component } from 'react'
import { connect } from 'react-redux'
import { timetrans, color } from '../../utils/utils'
import { 
  List,
  Icon,
  Tag
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
      })
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
              <IconText type="message" text={item.commentSize} />,
              <IconText type="tags-o" text={
                item.tags.split(',').map(v => (
                  <Tag
                    key={item.id + Math.random()}
                    color={color[Math.floor(Math.random()*color.length)]}
                    onClick={()=>{}}
                  >
                    {v}
                  </Tag>
               ))
              } />
            ]}
            extra={[
              timetrans(item.createTime)
            ]}
          >
            <List.Item.Meta
              className="list-item"
              title={item.title}
              description={item.summary}
              onClick={()=>console.log(item.id)}
            />
          </List.Item>
        )}
      />
    )
  }
}

export default BlogList