import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {


  sortStocksAlphabetically=(stocks)=>{
    const stocksCopy = stocks.slice()

    if (this.props.alphabetSort){
       stocksCopy.sort((a, b)=>{
       if (a.name > b.name) return 1
       if (a.name < b.name) return -1
       return 0
    })
    }
    return stocksCopy
  }

  sortStocksByPrice=(stocks)=>{
    const stocksCopy = stocks.slice()

    if (this.props.priceSort){
      stocksCopy.sort((a, b) => {
        return a.price - b.price
      })
    }
    return stocksCopy
  }

  filterStocks=(stocks)=>{
    return this.props.chosenFilter.includes("All") ? stocks : stocks.filter(stock => stock.type === this.props.chosenFilter)
  }

  render() {

    const { filterStocks, sortStocksByPrice, sortStocksAlphabetically } = this
    const { stocks, handleClick } = this.props
    
    return (
      <div>
        <h2>Stocks</h2>
        {
          filterStocks(sortStocksByPrice(sortStocksAlphabetically(stocks)))
          .map(stock => <Stock key={stock.id} stock={stock} handleClick={handleClick} />)
        }
      </div>
    );
  }

}

export default StockContainer;
