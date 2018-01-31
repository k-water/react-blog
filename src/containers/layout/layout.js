import React, { Component } from 'react'
import { 
  Layout,
  Row,
  Col
} from 'antd'
import {
  Route
} from 'react-router-dom'
import { routes } from '../../constants/routes'
import HeaderCustom from '../../components/header/headerCustom'
import SiderCustom from '../../components/sider/siderCustom'
import './layout.css'
const { Content, Footer } = Layout
class Index extends Component {
  render() {
    const contentHeight = document.body.clientHeight - 64 -62
    return (
      <Layout className="wrapper">
        <HeaderCustom></HeaderCustom>
        <Layout className="wrapper-container">
          <Layout className="wrapper-content">
            <Content
              style={{ padding: 24, margin: 0, minHeight: contentHeight, height: '100%', overflow: 'initial'}}
            >
              <Row gutter={20}>
                <Col
                  lg={{ span: 14, offset: 3 }}
                  md={{ span: 14, offset: 1 }}
                  xs={{ span: 22, offset: 1 }}
                >
                  {
                    routes.map(({ path, key, component, ...props }) => (
                      <Route key={key}
                        exact
                        path={path}
                        component={component}
                        {...props}
                      />
                    ))
                  }
                </Col>
                <Col
                  lg={{ span: 6 }}
                  md={{ span: 6 }}
                  xs={{ span: 0 }}
                >
                  <SiderCustom />
                </Col>
              </Row>
            </Content>
          </Layout>
          <Footer
            style={{textAlign: 'center'}}
          >
            Blog website ©2018 Created by Water
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Index