import { COIN_LIST_REQUEST, COIN_LIST_SUCCESS, COIN_LIST_FAIL } from "./action";

/*
 * 初始化state
 */

export const initState = {
  coinList: []
};
/*
 * reducer
 */
export default function reducer(state = initState, action) {
  switch (action.type) {
    case COIN_LIST_REQUEST:
      return state;
    case COIN_LIST_SUCCESS:
      return {
        ...state,
        coinList: action.result.data.data
      };
    case COIN_LIST_FAIL:
      return state;
    default:
      return state;
  }
}
