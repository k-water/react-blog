import React, { Component } from 'react'
import {
  Modal,
  Input,
  Icon,
  message,
  Button
} from 'antd'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
@connect(
  state => state.user,
  { login }
)
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleOk = this.handleOk.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleOk() {
    if(!this.state.username) {
      message.warn('用户名不能为空')
    } else if(!this.state.password){
      message.warn('密码不能为空')      
    } else {
      this.props.login(this.state)
      setTimeout(() => {
        if (this.props.msg !== 'success') {
          message.error(this.props.msg, 1)
        } else {
          this.props.handleCancel()
          this.setState({
            username: '',
            password: ''
          })
        }
      }, 500)
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    return (
      <Modal 
        title="登录"
        visible={this.props.visible}
        onCancel={this.props.handleCancel}
        width={320}
        footer={null}
      >
        <div className="login-input">
          <Input
            style={{marginBottom: 20}}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <Input
            style={{marginBottom: 20}}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <div
          className="login-submit"
        >
          <Button
            style={{width: '100%'}}
            type="primary"
            onClick={this.handleOk}
          >
            登录
          </Button>
        </div>
      </Modal>
    )
  }
}

export default Login