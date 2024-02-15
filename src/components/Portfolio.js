import { useState, useEffect } from 'react';
import {getAllStocks, showStock} from '../api/portfolio'
import { Button } from 'react-bootstrap';

import { addStock, showPortfolio,  } from '../api/portfolio';






const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    showPortfolio()
      .then(res => {
        setPortfolio(res.data.portfolio);
        console.log("stock", res.data.portfolio);
      })
      .catch(error => {
        console.log('Error fetching portfolio:', error);
      });
  }, []);





  return (
    <>
      <h2>Stock Details</h2>
      {portfolio ? (
        <div>
          <p>name {portfolio.name}</p>
          <p>Portfolio: {portfolio.stockList}</p>
         
        
          {(
            <Button
              className='m-2'
              variant='success'
              onClick={addStock}
            >
              Purchase Stock
            </Button>
          )}
        </div>
      ) : (
        <p>Loading stock details...</p>
      )}
    </>
  );
};









export default Portfolio;