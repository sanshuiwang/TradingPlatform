import {INCREMENT, DECREMENT, RESET,
CALL_API_TEST_REQUEST, CALL_API_TEST_SUCCESS, CALL_API_TEST_FAIL
} from './action';

/*
* 初始化state
 */

const initState = {
    count: 0
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + 1
            };
        case DECREMENT:
            return {
                count: state.count - 2
            };
        case RESET:
            return {count: 0};
        case CALL_API_TEST_REQUEST:
            return state
        case CALL_API_TEST_SUCCESS:
            return {count: action.result.data.count}
        case CALL_API_TEST_FAIL:
            return state
        default:
            return state
    }
}
