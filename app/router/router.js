import React from 'react'
import {BrowserRouter, Router, Route, Switch, Link} from 'react-router-dom'
import history from './history'

import Bundle from './Bundle'

import Hello from 'bundle-loader?lazy&name=hello!../containers/Hello'

//没有按需加载
// import Test from '../containers/Test'
import Test from 'bundle-loader?lazy&name=test!../containers/Test'

import Loading from '../components/Loading'

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading />
        }
    </Bundle>
)

const getRouter = () => (
    <Switch>
      <Route exact path="/" component={createComponent(Hello)} />
      <Route path="/Test" component={createComponent(Test)} />
    </Switch>
)

export default getRouter
