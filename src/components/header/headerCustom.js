import React, { Component } from 'react'
import { 
  Layout,
  Row,
  Col,
  Button
} from 'antd'
import Login from '../../containers/login/login'
import './header.css'
const { Header } = Layout
class HeaderCustom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.showModal = this.showModal.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  showModal() {
    this.setState({
      visible: true
    })
  }
  handleCancel() {
    this.setState({
      visible: false
    })
  }
  render() {
    return (
      <Header className="header-container">
        <Row>
          <Col lg={{span: 4}}>
            <div className="logo" />
          </Col>
          <Col lg={{span: 14}} xs={{span: 0}}>
            {/* <h1>Navigation</h1> */}
          </Col>
          <Col lg={{span: 6}}>
            <div className="nav-auth">
              <Button 
                ghost 
                type="primary" 
                size="small" 
                style={{marginRight: 20}}
                onClick={this.showModal}
              >
                登录
              </Button>
              <Button ghost type="danger" size="small">
                注册
              </Button>
            </div>
          </Col>
        </Row>
        <Login
          visible={this.state.visible}
          handleCancel={this.handleCancel}
        />
      </Header>
    )
  }
}

export default HeaderCustom