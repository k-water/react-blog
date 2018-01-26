import React, { Component } from 'react'
import { Layout } from 'antd'
import './sider.css'
const { Sider } = Layout
class SiderCustom extends Component {
  render() {
    return (
      <Sider
        width={280}
        className="sider-container"
      >
      </Sider>
    )
  }
}

export default SiderCustom