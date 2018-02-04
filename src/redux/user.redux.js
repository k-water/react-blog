
/**
 * type
 */

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGOUT = 'LOGOUT'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAILURE = 'REGISTER_FAILURE'

/**
 * state
 */
const initState = {
  user: '',
  msg: ''
}

/**
 * reducer
 * @param {*} state 
 * @param {*} action 
 */
export function user(state=initState, action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.body,
        msg: action.payload.message
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: '',
        msg: action.payload.message
      }
    case LOGOUT:
      return {
        user: '',
        msg: ''
      }
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        user: '',
        msg: action.payload
      }
    default:
      return state
  }
}

/**
 * action type
 */

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}

export function loginFailure(data) {
  return {
    type: LOGIN_FAILURE,
    payload: data
  }
}

export function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}

export function registerFailue(data) {
  return {
    type: REGISTER_FAILURE,
    payload: data
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}
