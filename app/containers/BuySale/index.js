import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'

class BuySale extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: true
    }
  }

  render() {
    const {toggle} = this.state
    return (
      <div>
        <div>
          <Button variant="contained" color="primary" onClick={() => this.toggleWebSocket()}>
            {toggle ? '关闭' : '开启'} WebSocket
          </Button>
        </div>
        <div>

        </div>
      </div>
    )
  }

  componentDidMount() {
    this.openWebSocket();
  }

  componentWillUnmount() {
    this.wbs.close();
  }

  toggleWebSocket = () => {
    switch (this.wbs.readyState) {
      case WebSocket.CONNECTING:
        this.closeWebSocket();
        break;
      case WebSocket.OPEN:
        this.closeWebSocket();
        break;
      case WebSocket.CLOSING:
        this.openWebSocket();
        break;
      case WebSocket.CLOSED:
        this.openWebSocket();
        break;
      default:
        break;
    }
  }

  openWebSocket = () => {
    this.wbs = null;
    this.wbs = new WebSocket("wss://stream.binance.cloud:9443/ws/bnbbtc@depth20");
    this.wbs.onopen = (event) => {
      this.setState({toggle: true});
    }
    this.wbs.onmessage = (event) => {
      console.log(1000, JSON.parse(event.data));
    };
  }

  closeWebSocket = () => {
    this.wbs.close();
    this.wbs.onclose = (event) => {
      this.setState({toggle: false});
    };
  }

}

BuySale.propTypes = {

};

const enhance = compose(
  connect((state) => ({
    
  }), {
    
  })
)

export default enhance(BuySale)
