import React from 'react'
import { compose } from 'redux'
import {connect} from 'react-redux'
import history from '../../../router/history'
class SubToHistory extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button onClick={() => history.push("/Test")}>SubPage Test Page</button>
    )
  }
}

const enhance = compose(
  connect((state) => ({
  }), {
  })
)

export default enhance(SubToHistory)
