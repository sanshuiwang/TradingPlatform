import React from 'react'
import {BrowserRouter, Router, Route, Switch, Link} from 'react-router-dom'
import history from './history'

import Bundle from './Bundle'

import Hello from 'bundle-loader?lazy&name=hello!../containers/Hello'

//没有按需加载
// import Test from '../containers/TestHistory'
import Test from 'bundle-loader?lazy&name=test!../containers/TestHistory'
import Home from 'bundle-loader?lazy&name=test!../containers/Home'
import BuySale from 'bundle-loader?lazy&name=test!../containers/BuySale'
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
        <Route exact path="/" component={createComponent(Home)} />
        <Route exact path="/BuySale" component={createComponent(BuySale)} />
        <Route exact path="/Hello" component={createComponent(Hello)} />
        <Route exact path="/Test" component={createComponent(Test)} />
    </Switch>
)

export default getRouter
