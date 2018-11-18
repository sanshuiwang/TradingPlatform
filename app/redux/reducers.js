import {combineReducers} from "redux"
import counter from '../containers/Hello/reducer'
import coin from '../containers/Home/reducer'

export default combineReducers({
    counter,
    coin
})
