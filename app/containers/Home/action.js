export const COIN_LIST_REQUEST = 'COIN_LIST_REQUEST'
export const COIN_LIST_SUCCESS = 'COIN_LIST_SUCCESS'
export const COIN_LIST_FAIL = 'COIN_LIST_FAIL'

export const getCoinList = () => {
    return {
      types: [COIN_LIST_REQUEST, COIN_LIST_SUCCESS, COIN_LIST_FAIL],
      promise: client => client.get('/exchange/public/product')
    }
}