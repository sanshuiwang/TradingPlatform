import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

import './style.scss'

const styles = theme => ({
  root: {
    display: 'inline-block',
    width: '48%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    height: 400,
    'verticalAlign': 'top'
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
})

class BuySale extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false,
      wwsData: {}
    }
  }

  render() {
    const { toggle, wwsData } = this.state
    const { classes } = this.props

    const coin = this.props.match.params.coin
    const coinArr = coin.split('_')

    const title = [`价格(${coinArr[0]})`, `成交量(${coinArr[1]})`]

    return (
      <div>
        <div>
          <Button variant="contained" color="primary" onClick={() => this.toggleWebSocket()} style={{textTransform: 'capitalize'}}>
            {toggle ? '关闭' : '开启'} WebSocket
          </Button>
        </div>
        <div style={{marginTop: '15px'}}>
          <List key="asks" className={classes.root} subheader={<li />} style={{marginRight: '4%'}}>
              <li className={classes.listSection}>
                <ul className={classes.ul}>
                  <ListSubheader>
                    {
                      title.map((item,index) => (
                        <h3 key={`asks-${index}`} className='list-title-header'>{item}</h3>
                      ))
                    }
                  </ListSubheader>
                  {
                    wwsData.asks ? wwsData.asks.map((item,index) => (
                    <ListItem key={`asks-${index}`}>
                      <ListItemText className='list-item-text' primary={`${item[0]}`} />
                      <ListItemText className='list-item-text' primary={`${item[1]}`}/>
                    </ListItem>
                    )) : (<h6 style={{textAlign: 'center'}}>No Data</h6>)
                  }
                </ul>
              </li>
          </List>
          
          <List key="bids" className={classes.root} subheader={<li />}>
              <li className={classes.listSection}>
                <ul className={classes.ul}>
                  <ListSubheader>
                    {
                      title.map((item,index) => (
                        <h3 key={`bids-${index}`} className='list-title-header'>{item}</h3>
                      ))
                    }
                  </ListSubheader>
                  {
                    wwsData.bids ? wwsData.bids.map((item,index) => (
                    <ListItem key={`bids-${index}`}>
                      <ListItemText className='list-item-text' primary={`${item[0]}`} />
                      <ListItemText className='list-item-text' primary={`${item[1]}`}/>
                    </ListItem>
                    )) : (<h6 style={{textAlign: 'center'}}>No Data</h6>)
                  }
                </ul>
              </li>
          </List>
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
      console.log('Open WWS Success.');
    }
    this.wbs.onmessage = (event) => {
      console.log(1000, JSON.parse(event.data));
      this.setState((prevState, props) => ({
        toggle: true,
        wwsData: prevState.wwsData.lastUpdateId != null ?  (prevState.wwsData.lastUpdateId < JSON.parse(event.data).lastUpdateId ? (JSON.parse(event.data)) : ({})) : JSON.parse(event.data)
      }));
    };
  }

  closeWebSocket = () => {
    this.wbs.close();
    this.wbs.onclose = (event) => {
      this.setState({toggle: false});
      console.log('websocket 断开: ' + event.code + ' ' + event.reason + ' ' + event.wasClean)
      console.log(event)
    };
  }

}

BuySale.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles(styles),
  connect((state) => ({
    
  }), {
    
  })
)

export default enhance(BuySale)
