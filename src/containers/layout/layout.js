import React, { Component } from 'react'
import { 
  Layout
} from 'antd'
import {
  Route
} from 'react-router-dom'
import { routes } from '../../constants/routes'
import HeaderCustom from '../../components/header/headerCustom'
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
            </Content>
          </Layout>
          <Footer
            style={{textAlign: 'center'}}
          >
            Copyright © Water 2018
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Index