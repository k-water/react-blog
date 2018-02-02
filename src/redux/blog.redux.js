import axios from 'axios'

/**
 * action type
 */
const LIST = 'LIST'
const DESC = 'DESC'
const ERROR = 'ERROR'
const CREATE = 'CREATE'
/**
 * state
 */
const initState = {
  user: '',
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
            username: state.comment[0].user.username
          }
        })
      }
    case ERROR:
      return {
        ...state,
        user: '',
        content: '',
        tags: '',
        desc: '',
        comment: '',
        commentSize: '',
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

function createType(data, comment) {
  return {
    type: CREATE,
    payload: data,
    newComment: comment
  }
}

function errorMsg(data) {
  return {
    type: ERROR,
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
  commentContent
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
        dispatch(createType(res.data, commentContent))
      } else {
        dispatch(errorMsg(res.data.message))
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}