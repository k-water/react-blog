import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
// import { getBlogList } from '../../redux/blog.redux'
import {
  Card
} from 'antd'
import './sider.css'
@withRouter
// @connect(
//   state => state.blog,
//   { getBlogList }
// )
class SiderCustom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      msg: ''
    }
    this.getBlogList = this.getBlogList.bind(this)
  }
  componentDidMount() {
    this.getBlogList()
  }
  getBlogList(
    order = '',
    catalogId = '',
    keyword = '',
    pageIndex = 0,
    pageSize = 10
  ) {
      axios.get('/u/admin/blogs', {
        params: {
          pageIndex: pageIndex
        }
      })
        .then(res => {
          if (res.status === 200 && res.data.code === 0) {
            this.setState({
              content: res.data.body.data.content,
              msg: res.data.message
            })
          } else {
          }
        })
        .catch(err => {
          console.log(err)
        })
  }
  render() {
    if(!this.state.content) {
      return null
    }
    return (
      <div className="sider-container">
        <Card title="最近文章" bordered={false}>
          <ul className="recent-list">
            {
              this.state.content.map(v => (
                  <li key={v.id} onClick={() => this.props.history.push(`/app/blog/desc/${v.id}`)}>
                    {v.title}
                  </li>
              ))
            }
          </ul>
        </Card>
      </div>
    )
  }
}

export default SiderCustom