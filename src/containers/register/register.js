import React, { Component } from 'react'
import axios from 'axios'
import {
  Modal,
  Input,
  Icon,
  message,
  Button
} from 'antd'
import { connect } from 'react-redux'
import { registerSuccess, registerFailue } from '../../redux/user.redux'
@connect(
  state => state.user,
  { registerSuccess, registerFailue }
)
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.register = this.register.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  register({username, password}) {
    axios.post('/api/users', {
      username,
      password
    })
    .then(res => {
      if (res.status === 201 && res.data.code === 0) {
        this.props.registerSuccess(res.data)
        this.props.handleCancel()
        message.success('注册成功, 请登录~', 1)
        this.setState({
          username: '',
          password: ''
        })
      } else {
        this.props.registerFailue(res.data.msg)
        message.error(res.data.msg, 1)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  handleOk() {
    if(!this.state.username) {
      message.warn('用户名不能为空')
    } else if(!this.state.password){
      message.warn('密码不能为空')      
    } else {
      this.register(this.state)
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
        onCancel={this.props.handleCancel}
        width={320}
        footer={null}
      >
        <div className="register-input">
          <Input
            style={{marginBottom: 20}}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            name="username"
            placeholder="请输入用户名"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <Input
            style={{marginBottom: 20}}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            type="password"
            name="password"
            placeholder="请输入密码"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <div
          className="register-submit"
        >
          <Button
            style={{width: '100%'}}
            type="primary"
            onClick={this.handleOk}
          >
            注册
          </Button>
        </div>
      </Modal>
    )
  }
}

export default Register