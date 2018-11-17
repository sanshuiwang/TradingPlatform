import React from 'react'
import { hot } from 'react-hot-loader'
import getRouter from '../../router/router'
import {Router} from 'react-router-dom'
import history from '../../router/history'
class App extends React.Component {
    render() {
        return (
          <Router history={history}>
            {getRouter()}
          </Router>
        )
    }
}

export default hot(module)(App)
