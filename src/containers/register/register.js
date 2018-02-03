import React, { Component } from 'react'
import {
  Modal,
  Input,
  Icon,
  message
} from 'antd'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
@connect(
  state => state.user,
  { register }
)
class Register extends Component {
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
      this.props.register(this.state)
      setTimeout(() => {
        if (this.props.msg !== 'success') {
          message.error(this.props.msg, 1)
        } else {
          this.props.handleCancel()
          message.success('注册成功, 请登录~', 1)
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
        title="注册"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.props.handleCancel}
        width={320}
      >
        <div className="login-input">
          <Input
            style={{marginBottom: 20}}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            name="username"
            placeholder="请输入用户名"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <Input 
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            type="password"
            name="password"
            placeholder="请输入密码"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
      </Modal>
    )
  }
}

export default Register