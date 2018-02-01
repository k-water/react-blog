import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBlogDesc } from '../../redux/blog.redux'
import marked from 'marked'
import hljs from 'highlight.js'
import {
  timetrans,
  color
} from '../../utils/utils'
import {
  Card,
  Icon,
  Tag
} from 'antd'
import './desc.css'
@connect(
  state => state.blog,
  { getBlogDesc }
)
class Desc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  componentWillMount() {
    marked.setOptions({
      highlight: code => hljs.highlightAuto(code).value
    })
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getBlogDesc(id)
    this.setState({
      loading: !this.state.loading
    })
  }
  render() {
    const IconText = ({ type, text }) => (
      <span key={text}>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    )
    return (
      <Card
        className="article-wrapper"
        loading={this.state.loading}
        title={this.props.content.title}
        extra={[
          <Tag color="red" key="author">
            作者：admin
          </Tag>,
          <span style={{marginTop: 10}} key="time">{timetrans(this.props.content.createTime)}</span>
        ]}
        actions={[<Icon type="like-o" />]}
      >
        <div className="article-tags">
          <IconText type="tags-o" text={
            this.props.tags.split(',').map(v => (
              <Tag
                key={v}
                color={color[Math.floor(Math.random()*color.length)]}
                onClick={()=>{}}
              >
                {v}
              </Tag>
            ))}
          />
        </div>
        <div 
          className="article-detail" 
          dangerouslySetInnerHTML={{ __html: marked(this.props.content.content) }} 
        />
      </Card>
    )
  }
}

export default Desc