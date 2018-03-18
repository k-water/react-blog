import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import avatar from '../../assets/avatar.jpg'
import axios from 'axios'
import {
  Card,
  Tag
} from 'antd'
import './sider.css'
import { color } from '../../utils/utils'
@withRouter
@connect(
  state => state.blog,
  {}
)
class SiderCustom extends Component {
  constructor() {
    super()
    this.state = {
      tags: []
    }
    this.getTags = this.getTags.bind(this)
  }
  componentDidMount() {
    this.getTags()
  }
  getTags() {
    axios.get('/api/tags')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            tags: res.data.tags
          })
        }
      })
      .catch(err => {
        throw(err)
      })
  }
  render() {
    return (
      <div className="sider-container">
        <div className="admin-info">
          <header>
            <img src={avatar} alt="avatar"/>
          </header>
          <p className="admin-name">
            Water
          </p>
          <p className="admin-desc">
            二次元，业余摄影，前端打杂人员，略微代码洁癖
          </p>
        </div>
        <div className="recent-article">
          <Card title="最近文章" bordered={false}>
            {
              this.props.content ? <ul className="recent-list">
                {
                  this.props.content.map(v => (
                      <li key={v.id} onClick={() => this.props.history.push(`/app/blog/desc/${v.id}`)}>
                        {v.title}
                      </li>
                  ))
                }
              </ul>
              : null
            }
          </Card>
        </div>
        <div className="tags-wrapper">
          <Card title="标签" bordered={false}>
            <div className="tags-content">
              {
                this.state.tags ?
                  this.state.tags.map(v => (
                    <Tag
                      key = {v}
                      color={color[Math.floor(Math.random()*color.length)]}
                      onClick={()=>this.props.history.push(`/app/tags/${v}`)}
                    >
                      {v}
                    </Tag>
                  ))
                : null
              }
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default SiderCustom