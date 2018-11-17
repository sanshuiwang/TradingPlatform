#中间件的逻辑

请求前dispatch REQUEST请求。

成功后dispatch SUCCESS请求，如果定义了afterSuccess()函数，调用它。

失败后dispatch FAIL请求。

#调用方式(axios)
export function getUserInfo() {
    return {
        types: [GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL],
        promise: client => client.get(`http://localhost:8080/api/user.json`)
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        otherData:otherData
    }
}
