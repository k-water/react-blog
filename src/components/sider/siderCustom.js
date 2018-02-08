import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import avatar from '../../assets/avatar.jpg'
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
      </div>
    )
  }
}

export default SiderCustom