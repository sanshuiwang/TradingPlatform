import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import numeral from 'numeral'
import { getCoinList } from './action'

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './style.scss'
import {accDiv,accSub} from '../../util/arithmetic'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 960,
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes, coinList } = this.props
    
    const tableTitle = [
      '市场',
      '币种',
      '最新价',
      '24h涨跌',
      '24h最高价',
      '24h最低价',
      '24h成交量'
    ]

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {
                tableTitle.map((title,index) => {
                  if(index === 0){
                    return <TableCell key={index}>{title}</TableCell>
                  }

                  return <TableCell key={index} numeric>{title}</TableCell>
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
          {
            coinList.map((coinListItem,index) => {
              return (
                <TableRow key={index} className='rowStyle' onClick={() => this.toBuySale(coinListItem)}>
                  <TableCell component="th" scope="row">
                    {`${coinListItem.baseAsset}/${coinListItem.quoteAsset}`}
                  </TableCell>
                  <TableCell numeric>{coinListItem.baseAssetName}</TableCell>
                  <TableCell numeric>{coinListItem.open}</TableCell>
                  <TableCell numeric>{numeral(accDiv(accSub(coinListItem.open,coinListItem.close), coinListItem.close)).format('0.00%')}</TableCell>
                  <TableCell numeric>{coinListItem.high}</TableCell>
                  <TableCell numeric>{coinListItem.low}</TableCell>
                  <TableCell numeric>{coinListItem.volume}</TableCell>
                </TableRow>
              )
            })
          }
          </TableBody>
        </Table>
      </Paper>
    )
  }

  componentDidMount() {
    this.props.getCoinList();
  }

  
  toBuySale = (coinListItem) => {
    this.props.history.push(`/BuySale/${coinListItem.baseAsset}_${coinListItem.quoteAsset}`)
  }

}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withStyles(styles),
  connect((state) => ({
    coinList: state.coin.coinList
  }), {
    getCoinList
  })
)

export default enhance(Home)
