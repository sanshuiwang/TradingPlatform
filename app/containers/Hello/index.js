import React from 'react'
import {render} from 'react-dom'
import './test.css'
import './test.scss'
import '../TestHistory/styles.css'
import imgTest from './test.png'
import {increment, decrement, reset,callApiTest} from './action'
import { compose } from 'redux'
import {connect} from 'react-redux'
import SubToHistory from './subPage/SubToHistory'
import history from '../../router/history'

class Hello extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (<div>
      <img src={imgTest}/>
      <p className='text'>'process.env.NODE_ENV:: ' {process.env.NODE_ENV}</p>

      <div>count:: {this.props.counter.count}</div>
      <button onClick={() => this.props.increment()}>自增
      </button>
      <button onClick={() => this.props.decrement()}>自减
      </button>
      <button onClick={() => this.props.reset()}>重置
      </button>
      <br />
      {/* app 文件夹getRouter的history父组件传递 */}
      <button onClick={() => this.props.history.push("/Test")}>Test Page</button>
      <br />
      <button onClick={() => this.props.callApiTest()}>callApiTest axios, count:: 5.</button>
      {/* 直接引用history.js */}
      <button onClick={() => history.push("/Test")}>Test Page</button>

      <SubToHistory />
    </div>)
  }
}

const enhance = compose(
  connect((state) => ({
    counter: state.counter
  }), {
    increment,
    decrement,
    reset,
    callApiTest
  })
)

export default enhance(Hello)
