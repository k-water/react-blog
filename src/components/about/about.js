import React, { Component } from 'react'
import {
  Row,
  Col,
  Card,
  Icon
} from 'antd'
import './about.css'
import SiderCustom from '../sider/siderCustom'
class About extends Component {
  render() {
    return (
      <Row>
       <Col
          lg={{ span: 15, offset: 1 }}
          md={{ span: 15, offset: 1 }}
          xs={{ span: 24 }}
          className="about-wrapper"
        >
          <Card
            title="关于我"
            style={{marginBottom: 20}}
          >
            <div className="content">
              <p>
                嘿！你好，我是博客的博主！该博客主要是用来记录我的一些技术点滴，
                和一些其他方面的随笔，感悟，生活等。
              </p>
              <p style={{marginTop: 20}}>
                作为一个前端打杂人员，一直想要弄一个自己的博客，在刚学前端不久的时候，
                用工具hexo搭建了一个博客，比较简单。到后来，也就是现在，学的东西慢慢多了，
                就想自己动手写一个，也算是对自己编码能力的一种试验吧，于是有了这个网站。
              </p>
              <p style={{marginTop: 20}}>
                目前就读于<a href="http://www.scau.edu.cn" target="_blank" rel="noopener noreferrer">华南农业大学</a>，还有一年就毕业了，希望自己在前端的路上越走越偏~(︿(￣︶￣)︿)
              </p>
            </div>
          </Card>
          <Card
            title="联系我"
          >
            <div className="content">
              <p>
                <Icon type="mail" /> 邮箱：625592890@qq.com
              </p>
              <p style={{marginTop: 20}}>
                <Icon type="github" /> Github：<a href="https://github.com/k-water" target="_blank" rel="noopener noreferrer">k-water</a>
              </p>
            </div>
          </Card>
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

export default About