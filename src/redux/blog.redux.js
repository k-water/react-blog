import axios from 'axios'

/**
 * action type
 */
const LIST = 'LIST'
const DESC = 'DESC'
const ERROR_BLOG = 'ERROR_BLOG'
const CREATE = 'CREATE'
/**
 * state
 */
const initState = {
  content: '',
  msg: '',
  tags: '',
  desc: '',
  comment: '',
  commentSize: ''
}

/**
 * reducer
 * @param {*} state 
 * @param {*} action 
 */
export function blog(state=initState, action) {
  switch(action.type) {
    case LIST:
      return {
        ...state,
        desc: '',
        comment: '',
        commentSize: '',
        content: action.payload.body.data.content,
        msg: action.payload.message,
        ...action.payload.body.data
      }
    case DESC:
      return {
        ...state,
        tags: action.payload.body.data.tags,
        desc: action.payload.body.data,
        msg: action.payload.message,
        comment: action.payload.body.data.comments
      }
    case CREATE:
      return {
        ...state,
        commentSize: state.comment.push({
          content: action.newComment,
          user: {
            username: action.username
          }
        })
      }
    case ERROR_BLOG:
      return {
        ...state,
        msg: action.payload
      }
    default:
      return state
  }
}

/**
 * return action type
 */

function getList(data) {
  return {
    type: LIST,
    payload: data
  }
}

function getDesc(data) {
  return {
    type: DESC,
    payload: data
  }
}

function createType(data, comment, username) {
  return {
    type: CREATE,
    payload: data,
    newComment: comment,
    username: username
  }
}

function errorMsg(data) {
  return {
    type: ERROR_BLOG,
    payload: data
  }
}

/**
 * aysnc function
 */

export function getBlogList(
  order = '',
  catalogId = '',
  keyword = '',
  pageIndex = 0,
  pageSize = 10
) {
  return dispatch => {
    axios.get('/u/admin/blogs', {
      params: {
        pageIndex: pageIndex
      }
    })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(getList(res.data))
        } else {
          dispatch(errorMsg(res.data.message))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function getBlogDesc(id) {
  return dispatch => {
    axios.get(`/u/admin/blogs/edit/${id}`)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(getDesc(res.data))
        } else {
          dispatch(errorMsg(res.data.message))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function createComment({
  blogId,
  userId,
  commentContent,
  username
}) {
  return dispatch => {
    axios.post('/u/comments', {
      blogId,
      userId,
      commentContent
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
    .then(res => {
      if(res.status === 200 && res.data.code === 0) {
        console.log(commentContent)
        dispatch(createType(res.data, commentContent, username))
      } else {
        dispatch(errorMsg(res.data.message))
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}
