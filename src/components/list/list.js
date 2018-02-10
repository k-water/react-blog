import React, { Component } from 'react'
import { connect } from 'react-redux'
import { timetrans, color } from '../../utils/utils'
import { 
  List,
  Icon,
  Tag,
  Row,
  Col
} from 'antd'
import SiderCustom from '../sider/siderCustom'
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
      currentPage: 1
    }
  }
  componentDidMount() {
    document.title = 'Water Blog'
    const tags = this.props.match.params.tags
    const catalog = this.props.match.params.catalog
    let params = {
      order: '',
      catalogId: catalog ? catalog : '',
      keyword: tags ? tags : '',
      pageIndex: 0,
      pageSize: 5
    }
    this.props.getBlogList(params)
  }
  render() {
    const pagination = {
      pageSize: 5,
      current: this.state.currentPage,
      total: this.props.totalElements,
      onChange: ((page, pageSize) => {
        this.setState({
          currentPage: page
        })
        let params = {
          order: '',
          catalogId: '',
          keyword: '',
          pageIndex: page - 1,
          pageSize: pageSize
        }
        this.props.getBlogList(params)
      })
    }
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    )
    return (
      <div>
        <Row>
          <Col
            lg={{ span: 15, offset: 1 }}
            md={{ span: 15, offset: 1 }}
            xs={{ span: 24 }}
            className="list-wrapper"
          >
            <List
              itemLayout="vertical"
              size="large"
              pagination={pagination}
              dataSource={this.props.content}
              renderItem={item => (
                <List.Item
                  key={item.title}
                  actions={
                  [ 
                    <IconText type="message" text={item.commentSize} />,
                    <IconText type="tags-o" text={
                      item.tags.split(',').map(v => (
                        <Tag
                          key={item.id + Math.random()}
                          color={color[Math.floor(Math.random()*color.length)]}
                          onClick={()=>this.props.history.push(`/app/tags/${v}`)}
                        >
                          {v}
                        </Tag>
                    ))
                    } />,
                    item.catalog ?
                    <IconText type="folder" text={
                      <Tag
                        color="orange"
                        key={item.catalog.id}
                        onClick={()=>this.props.history.push(`/app/catalog/${item.catalog.id}`)}
                      >
                        {item.catalog.name}
                      </Tag>
                    }/> : null
                  ]}
                  extra={[
                    timetrans(item.createTime)
                  ]}
                >
                  <List.Item.Meta
                    className="list-item"
                    title={item.title}
                    description={item.summary}
                    onClick={()=>this.props.history.push(`/app/blog/desc/${item.id}`)}
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

export default BlogList