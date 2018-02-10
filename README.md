### 前言
在学习react的过程中，深深的被react的函数式编程的模式所吸引，一切皆组件，所有的东西都是JavaScript。React框架其实功能很单一，主要负责渲染的功能，但是社区很活跃，衍生出了很多优秀的库和工具。个人觉得，想要做好一个项目，往往需要其他库和工具的配合，例如`redux`管理数据，`react-router`管理路由等，掌握基本的`webpack配置`和`es6语法`，然后想要提高性能，还有配合react的钩子函数和`immutable.js`，什么时候组件不需要重新渲染，`next.js`服务端渲染等等...
一直有一个想法就是重构自己的博客，刚好这段时间放假，又刚好学习了react，于是就有了这个项目。


> **项目地址**：https://github.com/k-water/react-blog
 如果觉得不错的话，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

> **线上访问**： http://www.nolin.info

### 技术栈
**前端**
* react
* react-redux
* react-thunk
* react-router
* axios
* eslint
* maked
* highlight.js
* antd
* es6/7/8

**后台**
* spring boot

此项目采用前后端分离的实现，后台接口基于RESTful规范设计，只提供数据，前端负责路由跳转，权限限制，渲染数据等。PS：由于我是个前端er，所以这里主要讲的是前端。

### 实现的功能
* [x] admin增删查改博客
* [x] 博客标签
* [x] 博客内容markdown
* [x] 博客内容页展示目录
* [x] 返回顶部
* [x] markdown代码高亮
* [x] 用户登录注册
* [x] 用户评论
* [x] 响应式

### TODO
* [ ] ~~博客分类~~
* [ ] ~~点击标签搜索相关博客~~
* [ ] ~~完善归档~~
* [ ] ~~优化首页侧边栏~~
* [ ] ~~收藏页面~~
* [ ] ~~关于页面~~
* [ ] ~~部署上线~~

### 2018-02-08更新
* [x] 博客分类
* [x] 点击标签搜索相关博客
* [x] 完善归档

### 2018-02-10更新
* [x] 优化首页侧边栏
* [x] 收藏页面
* [x] 关于页面
* [x] 部署上线

### 效果预览
#### 首页
![](https://oc1gyfe6q.qnssl.com/18-2-5/20891733.jpg)

#### 内容页
![](https://oc1gyfe6q.qnssl.com/18-2-5/60787720.jpg)

#### 用户登录
![](https://oc1gyfe6q.qnssl.com/18-2-5/93902966.jpg)

#### 用户评论
![](https://oc1gyfe6q.qnssl.com/18-2-5/17032816.jpg)

#### 后台管理

![](https://oc1gyfe6q.qnssl.com/18-2-5/41492220.jpg)

![](https://oc1gyfe6q.qnssl.com/18-2-5/45917169.jpg)

![](https://oc1gyfe6q.qnssl.com/18-2-5/51225877.jpg)

### 个人总结
#### markdown渲染
在前端渲染markdown的时候遇到了一点问题，相关的包很多，但是各种包解析的结果都有差异，react周边社区推荐的是` react-markdown`,使用方法也很简单

``` javascript
import ReactMarkdown from 'react-markdown'

const input = '# This is a header\n\nAnd this is a paragraph'
ReactDOM.render(
    <ReactMarkdown source={input} />,
    document.getElementById('container')
)
```

但是发现`react-markdown`对表格的支持不太友好，最后采用了[marked](https://github.com/chjj/marked)，结合`highlight.js`对代码部分实现高亮

``` javascript
import marked from 'marked'
import hljs from 'highlight.js'
  componentWillMount() {
    marked.setOptions({
      highlight: code => hljs.highlightAuto(code).value
    })
  }
```

最后解析出来的是一个字符串，还需要将它插入`dom`中，由于安全问题，`React`不提倡将字符串直接插入`dom`中，但React保留了一个API，可以这样做：

``` html
<div className="article-detail" 
  dangerouslySetInnerHTML={{ __html: marked(output)) }} />
```

#### React组件化
react的组件由dom视图和state组成，state是数据中心，它的状态决定着视图的状态。react只负责UI的渲染，与其他框架监听数据动态改变dom不同，react采用setState来控制视图的更新。setState会自动调用render函数，触发视图的重新渲染，如果仅仅只是state数据的变化而没有调用setState，并不会触发更新。说到组件，就必须了解react组件的`生命周期`，官方的图解如下：

![](https://oc1gyfe6q.qnssl.com/18-2-5/13398466.jpg)

关于这部分的解释网上有很多，可以自行查阅。而我在开发过程用的最多的就是
* componentWillMount()
* componentDidMount()
* shouldComponentUpdate(nextProps, nextState)
这几个钩子函数了，关于性能优化，可以在`shouldComponentUpdate`上作文章，由于`shouldComponentUpdate`默认返回`true`，简单的方法可以通过比较更新前后的数据结构是否相同来判断组件是否需要重新渲染，这时候就可以采用`immutable.js`了。

#### 组件之间通信
react是单向数据流，自上而下的传递数据。解决复杂组件之间通信的方法有很多。一般父子组件通信是最简单的，父组件将一个回调函数传递给子组件，子组件通过`this.props`直接调用该函数与父组件通信。

如果组件之间嵌套很深，可以使用上下文getChildContext来传递信息，这样在不需要将函数一层层往下传，任何一层的子级都可以通过this.context直接访问，react-redux内部实现就是利用此方法。

兄弟组件之间无法直接通信，它们需要利用同一层的上级作为中转站。

#### Redux
redux不是必须的，如果不是复杂的组件通信，逻辑简单，用context就行。redux并不是react特有的，其他框架也可以使用redux。当初为了学习redux花费了不少时间，一开始并不理解redux中间的操作，看了很多前辈们写的文章才逐渐明白。简单说说redux。
**redux由三部分组成：store, reducer, action**

![](https://oc1gyfe6q.qnssl.com/18-2-5/1307277.jpg)

store是一个对象，它主要由三个方法：
**dispatch**
用于action的分发，当action传入dispatch会立即执行，有些时候我们不想它立刻触发，可以在`createStore`中使用middleware中间件对dispatch进行改造，例如redux-thunk，不过这是react-radux做的事了。
**subscribe**
顾名思义，监听器，监听state的变化，这个函数在store调用dispatch时会注册一个listener监听state变化。
**getState**
获取store中的state，当我们用action触发reducer改变了state时，需要拿到新的state里面的数据。getState在两个地方会用到，一是通过dispatch提交action后store需要拿到state里面的数据，二是利用subscribe监听到state发生变化后调用它来获取新的state数据。

说了这么多，store的核心代码其实很短：
``` javascript
/**
 * 应用观察者模式
 * @param {Object} state
 * @param {Function} reducer
 */
function createStore(reducer) {
  let state = null
  const listeners = []
  const subscribe = listener => listeners.push(listener)
  const getState = () => state
  const dispatch = action => {
    // 覆盖原对象
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }
  // 初始化state
  dispatch({})
  return {
    getState,
    dispatch,
    subscribe
  }
}
```

另一部分，`reducer`是一个纯函数(pure function)，它接收一个state和action作为参数，根据action的type返回一个新的state，如果传入的action type没有匹配到，则返回默认的state，简单实现如下：
``` javascript
function reducer(state, action) {
  if (!state) {
    return {
      title: {
        text: "water make redux",
        color: "red"
      },
      content: {
        text: "water make redux",
        color: "green"
      }
    }
  }
  switch (action.type) {
    case "UPDATE_TITLE_TEXT":
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case "UPDATE_TITLE_COLOR":
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state
  }
}
```
action比较简单，它返回一个对象，其中type属性是必须的，同时也可以传入一些其他的数据。
使用例子如下：
``` javascript
// 生成store
const store = createStore(reducer)
let oldState = store.getState()
// 监听数据变化重新渲页面
store.subscribe(() => {
  const newState = store.getState()
  renderApp(newState, oldState)
  oldState = newState
})
// 首次渲染页面
renderApp(store.getState())
store.dispatch({
  type: "UPDATE_TITLE_TEXT",
  text: "water is fighting"
})
store.dispatch({
  type: "UPDATE_TITLE_COLOR",
  color: "#f00"
})
```

#### React-redux
`react-redux`则是对redux做了封装，可以在react中直接使用，并且提供了`Provider`和`connect`。
**Provider**是一个组件，它接受store作为props，然后通过context往下传，这样react中任何组件都可以通过context获取store。
**connect**是一个函数，也是一个高阶组件(HOC)，通过传入state和dispatch返回一个新的组件，它的写法是如下：
``` javascript
connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(component)
```
也可以采用装饰器的写法，这需要babel的支持：
``` javascript
@connect(
	state,
	{ func }
)
```
具体的不多介绍，迷你实现可以看看这个项目：https://github.com/k-water/make-react-redux
