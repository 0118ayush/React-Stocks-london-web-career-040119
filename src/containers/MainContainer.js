import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {


  state = {
    stocks: [], 
    myStocks: [], 
    alphabetSort: false, 
    priceSort: false, 
    chosenFilter: "All"
  }

  componentDidMount(){
    fetch("http://localhost:3000/stocks")
    .then(resp => resp.json())
    .then( stocks => this.setState({
      stocks: stocks
    }))
  }

  updateAlphabetSort=()=>{
    this.setState({
      alphabetSort: !this.state.alphabetSort
    })
  }

  updatePriceSort=()=>{
    this.setState({
      priceSort: !this.state.priceSort
    })
  }

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
  
  addStocksToPortfolio=(stock)=>{
    this.setState({
      myStocks: [...this.state.myStocks, stock]
    })
  }

  removeStocksToPortfolio=(removedStock)=>{
    this.setState({
      myStocks: this.state.myStocks.filter(stock => stock.id !== removedStock.id)
    })
  }

  updateChosenFilter=(e)=>{
    this.setState({
      chosenFilter: e.target.value
    })
  }
  

  render() {

    const { updateAlphabetSort, updatePriceSort, updateChosenFilter, addStocksToPortfolio, removeStocksToPortfolio } = this
    const { stocks, alphabetSort, priceSort, chosenFilter, myStocks } = this.state

    return (
      <div>
        <SearchBar updateAlphabetSort={updateAlphabetSort} updatePriceSort={updatePriceSort} stocks={stocks} updateChosenFilter={updateChosenFilter}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={stocks} handleClick={addStocksToPortfolio} alphabetSort={alphabetSort} priceSort={priceSort} chosenFilter={chosenFilter}/>

            </div>
            <div className="col-4">

              <PortfolioContainer myStocks={myStocks} handleClick={removeStocksToPortfolio} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
