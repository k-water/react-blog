import axios from 'axios'

/**
 * action type
 */
const LIST_SUCCESS = 'LIST_SUCCESS'
const LIST_FAILURE = 'LIST_FAILURE'
const DESC_SUCCESS = 'DESC_SUCCESS'
const DESC_FAILURE = 'DESC_FAILURE'
const COMMENT_SUCCESS = 'COMMENT_SUCCESS'
const COMMENT_FAILURE = 'COMMENT_FAILURE'
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
    case LIST_SUCCESS:
      return {
        ...state,
        desc: '',
        comment: '',
        commentSize: '',
        content: action.payload.body.data.content,
        msg: action.payload.message,
        ...action.payload.body.data
      }
    case DESC_SUCCESS:
      return {
        ...state,
        tags: action.payload.body.data.tags,
        desc: action.payload.body.data,
        msg: action.payload.message,
        comment: action.payload.body.data.comments
      }
    case COMMENT_SUCCESS:
      return {
        ...state,
        commentSize: state.comment.push({
          content: action.newComment,
          createTime: +Date.now(),
          user: {
            username: action.username
          }
        })
      }
    case LIST_FAILURE:
    case DESC_FAILURE:
    case COMMENT_FAILURE:
      return {
        ...state,
        msg: action.payload
      }
    default:
      return state
  }
}

/**
 * action type
 */

function listSuccess(data) {
  return {
    type: LIST_SUCCESS,
    payload: data
  }
}

function listFailure(data) {
  return {
    type: LIST_FAILURE,
    payload: data
  }
}

function descSuccess(data) {
  return {
    type: DESC_SUCCESS,
    payload: data
  }
}

function descFailure(data) {
  return {
    type: DESC_FAILURE,
    payload: data
  }
}

function commentSuccess(data, comment, username) {
  return {
    type: COMMENT_SUCCESS,
    payload: data,
    newComment: comment,
    username: username
  }
}

function commentFailure(data) {
  return {
    type: COMMENT_FAILURE,
    payload: data
  }
}

/**
 * aysnc function
 */

export function getBlogList({
  order,
  catalogId,
  keyword,
  pageIndex,
  pageSize
}) {
  return dispatch => {
    axios.get('/u/admin/blogs', {
      params: {
        order,
        catalogId,
        keyword,
        pageIndex,
        pageSize
      }
    })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(listSuccess(res.data))
        } else {
          dispatch(listFailure(res.data.message))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function getBlogDesc(id) {
  return dispatch => {
    axios.get(`/u/admin/blogs/${id}`)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(descSuccess(res.data))
        } else {
          dispatch(descFailure(res.data.message))
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
        dispatch(commentSuccess(res.data, commentContent, username))
      } else {
        dispatch(commentFailure(res.data.message))
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}
