import axios from 'axios'

/**
 * action type
 */
const LIST = 'LIST'
const ERROR = 'ERROR'
/**
 * state
 */
const initState = {
  content: '',
  msg: ''
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
        ...action.payload.body.data
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

function errorMsg(data) {
  return {
    type: ERROR,
    payload: data
  }
}

/**
 * aysnc function
 */

export function getBlogList(pageIndex = 0) {
  return dispatch => {
    axios.get('/u/admin/blogs',{
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