import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllStocks } from '../api/portfolio';
import { Tabs, Tab } from 'react-bootstrap';



const Index = () => {
  const [stocks, setStocks] = useState(null);

  useEffect(() => {
    getAllStocks()
      .then(res => {
        setStocks(res.data.stocks);
        console.log("this is setStocks", setStocks);
      })
      .catch((error) => {
        console.log('Error fetching stocks:', error);
      });
  }, []);

  return (
    <>
    <h2>Stocks</h2>
      <div className="stock-cards">
        {stocks ? (
          <div className="card-list">
            {stocks.map(stock => (
              <div key={stock.symbol} className="card">
                <Link to={`/stocks/${stock.symbol}`} className="card-name">
                  {stock.symbol}
                </Link>
                <div className="card-info">
                  <p>Description: {stock.description}</p>
                  <p>Currency: {stock.currency}</p>
                  <p>Type: {stock.type}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading all Stocks...</p>
        )}
      </div>
    </>
  );
};

export default Index;