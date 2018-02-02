import React, { Component } from 'react'

class Navigation extends Component {
  constructor() {
    super()
    this.state = {
      menuList: []
    }
    this.getMenuList = this.getMenuList.bind(this)
  }
  componentDidMount() {
    this.getMenuList(this.props.content)
  }
  getMenuList(content) {
    const issues = content
    const menu = []
    const patt = /(#+)\s+?(.+)/g
    let result = null
    while ((result = patt.exec(issues))) {
      menu.push({ level: result[1].length, title: result[2] })
    }
    const menuObj = []
    let level2Temp = {
      id: '',
      level: '',
      title: '',
      children: []
    }
    let level3Temp = null
    let level4Temp = null
    for (let i = 0; i < menu.length; i ++) {
      if (menu[i].level === 2) {
        level2Temp = {
          id: i,
          level: 2,
          title: menu[i].title,
          children: [],
        }
      } else if (menu[i].level === 3) {
        level3Temp = {
          id: i,
          level: 3,
          title: menu[i].title,
          children: [],
        }
        if(menuObj.length === 0) menuObj.push(level2Temp)
        level2Temp.children.push(level3Temp)
      } else if (menu[i].level === 4) {
        level4Temp = {
          id: i,
          level: 4,
          title: menu[i].title,
        }
        level3Temp.children.push(level4Temp)
      }
    }
    this.setState({
      menuList: menuObj
    })
  }

  render() {
    return (
      <div className="article-navigation-content">
        <ul>
          {this.state.menuList.map(level2 => (
            <li key={level2.id}
              style={{
                  listStyleType: level2.title ? 'disc' : 'none' , 
                  marginLeft: level2.title ? '10': '0'}}
            >
              {level2.title ? level2.title : ''}
              <ul>
                {
                  level2.children.map(
                    level3 => (
                    <li key={level3.id}>
                      {level3.title}
                      <ul>
                        {
                          level3.children.map(level4 => (
                          <li key={level4.id}>
                            {level4.title}
                          </li>))
                        }
                      </ul>
                    </li>))
                  }
              </ul>
            </li>))
          }
        </ul>
      </div>
    )
  }
}

export default Navigation