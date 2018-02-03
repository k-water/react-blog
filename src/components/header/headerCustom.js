import React, { Component } from 'react'
import { 
  Layout,
  Row,
  Col,
  Button,
  Menu,
  Dropdown,
  Avatar
} from 'antd'
import { connect } from 'react-redux'
import Login from '../../containers/login/login'
import { logout } from '../../redux/user.redux'
import './header.css'
const { Header } = Layout
@connect(
  state => state.user,
  { logout }
)
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
    const menu = (
      <Menu>
        <Menu.Item>
          <span 
            className="user-logout"
            onClick={this.props.logout}
          >
            退出登录
          </span>
        </Menu.Item>
      </Menu>
    )
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
            <div 
              className="nav-auth"
              style={{display: this.props.user ? 'none' : 'block'}}
            >
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

            <div 
              className="user-info"
              style={{display: this.props.user ? 'block' : 'none'}}
            >
              <Dropdown
                placement="bottomCenter"
                overlay={menu}
              >
                <Avatar
                  className="user-avatar"
                  shape="square" 
                  size="large" 
                  icon="user"
                  style={{backgroundColor: '#87d068'}}
                />
              </Dropdown>
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