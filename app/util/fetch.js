import fetch from 'cross-fetch'
// window.Cookies = require('js-cookie')

export const post = async ({ url, body, success, failure, dispatch }) => {
  // const aspenJwt = window.Cookies.get('aspen-jwt')
  try {
    const res = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // 'jwt': aspenJwt || ''
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (dispatch) dispatch({ type: success, data })
    return data
  } catch (e) {
    if (dispatch) dispatch({ type: failure })
  }
}

export const get = async ({ url, success, failure, dispatch }) => {
  // const aspenJwt = window.Cookies.get('aspen-jwt')
  try {
    const res = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // 'jwt': aspenJwt || ''
      },
    })
    const data = await res.json()
    if (dispatch) dispatch({ type: success, data })
    return data
  } catch (e) {
    if (dispatch) dispatch({ type: failure })
  }
}
