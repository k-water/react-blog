import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBlogDesc } from '../../redux/blog.redux'
import marked from 'marked'
import hljs from 'highlight.js'

import {
  Card,
  Icon
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
    return (
      <div>
        <Card
          loading={this.state.loading}
          title={this.props.content.title}
          actions={[<Icon type="like-o" />]}
        >
          <div 
            className="article-detail" 
            dangerouslySetInnerHTML={{ __html: marked(this.props.content.content) }} 
          />
        </Card>
      </div>
    )
  }
}

export default Desc