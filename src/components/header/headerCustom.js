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
import Register from '../../containers/register/register'
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
      login: false,
      register: false
    }
    this.showLoginModal = this.showLoginModal.bind(this)
    this.showRegisterModal = this.showRegisterModal.bind(this)
    this.handleLoginCancel = this.handleLoginCancel.bind(this)
    this.handleRegisterCancel = this.handleRegisterCancel.bind(this)
  }
  showLoginModal() {
    this.setState({
      login: true
    })
  }
  showRegisterModal() {
    this.setState({
      register: true
    })
  }
  handleLoginCancel() {
    this.setState({
      login: false
    })
  }
  handleRegisterCancel() {
    this.setState({
      register: false
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
          <Col 
            lg={{span: 4}}
            md={{span: 4}}
            xs={{span: 10}}
          >
            <div className="logo" />
          </Col>
          <Col 
            lg={{span: 14}}
            md={{span: 14}}
            xs={{span: 0}}
          >
            {/* <h1>Navigation</h1> */}
          </Col>
          <Col 
            lg={{span: 6}}
            md={{span: 6}}
            xs={{span: 14}}
          >
            <div 
              className="nav-auth"
              style={{display: this.props.user ? 'none' : 'block'}}
            >
              <Button 
                ghost 
                type="primary" 
                size="small" 
                style={{marginRight: 20}}
                onClick={this.showLoginModal}
              >
                登录
              </Button>
              <Button 
                ghost 
                type="danger" 
                size="small"
                onClick={this.showRegisterModal}
              >
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
          visible={this.state.login}
          handleCancel={this.handleLoginCancel}
        />
        <Register
          visible={this.state.register}
          handleCancel={this.handleRegisterCancel}
        />
      </Header>
    )
  }
}

export default HeaderCustom