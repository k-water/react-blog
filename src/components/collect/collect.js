import React, { Component } from 'react';
import {
  Row,
  Col,
  message,
  List,
  Tag
} from 'antd'
import axios from 'axios'
import { color } from '../../utils/utils'
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
    document.title = 'Water Blog' 
    this.getCollectList()
  }
  getCollectList(offset = 0, limit = 10) {
    axios.get('/api/collect', {
      params: {
        offset,
        limit
      }
    })
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        this.setState({
          data: res.data.data,
          totalElements: res.data.data.count
        })
      } else {
        message.error(res.data.msg)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  render() {
    const pagination = {
      pageSize: 10,
      size: 'small',
      current: this.state.currentPage,
      total: this.state.totalElements,
      onChange: ((page, pageSize) => {
        this.setState({
          currentPage: page
        })
        this.getCollectList(pageSize * (page - 1))
      }),
    }
    return (
      <div>
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
              pagination={pagination}
              dataSource={this.state.data.rows}
              renderItem={item => (
                <List.Item
                  key={item.title}
                  extra={item.date}
                >
                  <List.Item.Meta
                    description={[<a key={item.link} href={item.link}>{item.title}</a>, 
                      <Tag
                        key={item.id}
                        className="article-author"
                        color={color[Math.floor(Math.random()*color.length)]}
                      >
                        {item.author}
                      </Tag>
                    ]}
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
        <Row style={{marginTop: 20}}>
          <Col
            lg={{ span: 0 }}
            md={{ span: 0 }}
            xs={{ span: 24 }}
          >
            <SiderCustom />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Collect