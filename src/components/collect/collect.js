import React, { Component } from 'react';
import {
  Row,
  Col,
  message,
  List
} from 'antd'
import axios from 'axios'
import SiderCustom from '../sider/siderCustom'
import './collect.css'
class Collect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: '',
      currentPage: 1,
      totalElements: 0
    }
    this.getCollectList = this.getCollectList.bind(this)
  }

  componentDidMount() {
    this.getCollectList()
  }
  getCollectList(pageIndex = 0, pageSize = 10) {
    axios.get('/u/star', {
      params: {
        pageIndex: pageIndex,
        pageSize: pageSize
      }
    })
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        this.setState({
          data: res.data.body.data.content,
          totalElements: res.data.body.data.totalElements
        })
      } else {
        message.error(res.data.message)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  render() {
    const pagination = {
      pageSize: 10,
      current: this.state.currentPage,
      total: this.state.totalElements,
      onChange: ((page, pageSize) => {
        this.setState({
          currentPage: page
        })
        this.getCollectList(page - 1)
      }),
    }
    return (
      <Row>
        <Col
          lg={{ span: 15, offset: 1 }}
          md={{ span: 15, offset: 1 }}
          xs={{ span: 24 }}
        >
          <List
            className="collect-list"
            header={<div className="collect-header">文章收藏</div>}
            itemLayout="vertical"
            size="small"
            pagination={pagination}
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item
                key={item.title}
                extra={item.date}
              >
                <List.Item.Meta
                  title={<a href={item.link}>{item.title}</a>}
                  description={item.author}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col
          lg={{ span: 6, offset: 1 }}
          md={{ span: 6, offset: 1 }}
          xs={{ span: 0 }}
        >
          <SiderCustom />
        </Col>
      </Row>
    )
  }
}

export default Collect