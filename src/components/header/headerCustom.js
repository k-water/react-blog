import React, { Component } from 'react'
import { Layout } from 'antd'
import './header.css'
const { Header } = Layout
class HeaderCustom extends Component {
  render() {
    return (
      <Header className="header-container">
        <div className="logo" />
      </Header>
    )
  }
}

export default HeaderCustom