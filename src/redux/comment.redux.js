import axios from 'axios'

/**
 * type
 */
const CREATE = 'CREATE'
const ERROR = 'ERROR'

const initState = {
  user: '',
  msg: '',
  content: ''
}

/**
 * reducer
 */
export function comment(state=initState, action) {
  switch(action.type) {
    case CREATE:
      return {
        ...state,
        msg: action.payload.message
      }
    default:
      return state
  }
}

/**
 * action type
 */

function createType(data) {
  return {
    type: CREATE,
    payload: data
  }
}

function errorMsg(data) {
  return {
    type: ERROR,
    payload: data
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
        dispatch(createType(res.data))
      } else {
        dispatch(errorMsg(res.data.message))
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
}