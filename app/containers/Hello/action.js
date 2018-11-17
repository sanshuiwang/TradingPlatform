export const INCREMENT = "counter/INCREMENT"
export const DECREMENT = "counter/DECREMENT"
export const RESET = "counter/RESET"
export const CALL_API_TEST_REQUEST = 'CALL_API_TEST_REQUEST'
export const CALL_API_TEST_SUCCESS = 'CALL_API_TEST_SUCCESS'
export const CALL_API_TEST_FAIL = 'CALL_API_TEST_FAIL'

import history from '../../router/history'

export function increment() {
    history.push('/Test')
    return {type: INCREMENT}
}

export function decrement() {
    return {type: DECREMENT}
}

export function reset() {
    return {type: RESET}
}

export const callApiTest = () => {
  return {
    types: [CALL_API_TEST_REQUEST, CALL_API_TEST_SUCCESS, CALL_API_TEST_FAIL],
    promise: client => client.get('http://localhost:3004/callAPiTest')
  }
}
