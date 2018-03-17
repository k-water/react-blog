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
  Tag,
  Row,
  Col,
  BackTop
} from 'antd'
import Comment from '../comment/comment'
import Navigation from './navigation'
import './desc.css'
@connect(
  state => state.blog,
  { getBlogDesc }
)
class Desc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      loading: true
    }
  }
  componentWillMount() {
    marked.setOptions({
      highlight: code => hljs.highlightAuto(code).value
    })
  }
  componentDidMount() {
    this.props.getBlogDesc(this.state.id)
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
    if (this.props.desc.title) {
      document.title = this.props.desc.title
    }
    return (
      <Row>
        <BackTop visibilityHeight={300}/>
        <Col
          lg={{ span: 15, offset: 1 }}
          md={{ span: 15, offset: 1 }}
          xs={{ span: 24 }}
        >
          <Card
            className="article-wrapper"
            loading={this.state.loading}
            title={this.props.desc.title}
            extra={[
              <Tag color="red" key="author">
                作者：admin
              </Tag>,
              <span style={{marginTop: 10}} key="time">
                {
                  this.props.desc.created_at
                  ? timetrans(this.props.desc.created_at)
                  : null
                }
              </span>
            ]}
          >
            <div className="article-tags">
              <span>{this.props.desc.readSize} 次浏览</span>
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
              dangerouslySetInnerHTML={{ __html: this.props.desc.content ? marked(this.props.desc.content) : null }} 
            />
          </Card>
          <Comment />
        </Col>
        <Col
          lg={{ span: 6, offset: 1 }}
          md={{ span: 6, offset: 1 }}
          xs={{ span: 0 }}
        >
          {
            this.props.desc.content ?
            <Card title="目录" className="catalog">
              <Navigation 
                content={this.props.desc.content}
              />
            </Card>
            : null
          }
        </Col>
      </Row>
    )
  }
}

export default Desc