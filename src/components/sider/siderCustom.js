import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Card
} from 'antd'
import './sider.css'
@withRouter
@connect(
  state => state.blog,
  {}
)
class SiderCustom extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div className="sider-container">
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
    )
  }
}

export default SiderCustom