export const COIN_LIST_REQUEST = 'COIN_LIST_REQUEST'
export const COIN_LIST_SUCCESS = 'COIN_LIST_SUCCESS'
export const COIN_LIST_FAIL = 'COIN_LIST_FAIL'

export const getCoinList = () => {
    return {
      types: [COIN_LIST_REQUEST, COIN_LIST_SUCCESS, COIN_LIST_FAIL],
      promise: client => client.get(
        '/exchange/public/product',
        {
            headers: {
                'authority': 'www.binance.co',
                'method': 'GET',
                'path': '/exchange/public/product',
                'scheme': 'https',
                'accept': 'application/json',
                'accept-language': 'zh-CN,zh;q=0.9',
                'cache-control': 'max-age=0',
                'upgrade-insecure-requests': 1,
                'X-MBX-APIKEY': 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j',
                'API-Key': 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A',
                'signature': 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        }
      )
    }
}