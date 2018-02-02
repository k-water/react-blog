import axios from 'axios'

/**
 * action type
 */
const LIST = 'LIST'
const DESC = 'DESC'
const ERROR = 'ERROR'
/**
 * state
 */
const initState = {
  content: '',
  msg: '',
  tags: '',
  desc: ''
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
        content: action.payload.body.data.content,
        msg: action.payload.message,
        desc: '',
        ...action.payload.body.data
      }
    case DESC:
      return {
        ...state,
        tags: action.payload.body.data.tags,
        desc: action.payload.body.data,
        msg: action.payload.message
      }
    case ERROR:
      return {
        ...state,
        content: '',
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