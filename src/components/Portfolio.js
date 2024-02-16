import { useState, useEffect } from 'react';
import {getAllStocks, removeStock, showStock} from '../api/portfolio'
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { addStock, showPortfolio,  } from '../api/portfolio';
import React from 'react';





const Portfolio = ({user}) => {
  const [portfolio, setPortfolio] = useState(null);
  const {userId} = useParams()
  console.log("userId",user._id)
  console.log(user)
  useEffect(() => {
    showPortfolio(userId)
      .then(res => { 
        setPortfolio(res.data.portfolio);
        console.log("portfolio", res.data.portfolio);
      })
      .catch(error => {
        console.log('Error fetching portfolio:', error);
      });
  }, []);





  return (
    <>
    <h2>Portfolio Details</h2>
    
    {portfolio ? (
      <div>
        <h3>Stocks in Your Portfolio</h3>
        
        {portfolio ? (
          <div>
            <p>name: {portfolio.name}</p>
            {portfolio.stockList.map((stock, stockIndex) => (
              <div key={stockIndex}>
                <p>Ticker: {stock.ticker}</p>
                <p>Country: {stock.country}</p>
                {/* Render other properties of the stock object as needed */}
                <Button
                  className="m-2"
                  variant="success"
                  onClick={() => removeStock(stock._id,user, portfolio._id)}
                >
                  Delete Stock
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading portfolio...</p>
        )}
      </div>
    ) : (
      <p>Loading stock details...</p>
    )}
  </>

  )}







export default Portfolio;