import { useState, useEffect } from 'react';
import {getAllStocks, showStock} from '../api/portfolio'
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { addStock, showPortfolio,  } from '../api/portfolio';






const Portfolio = ({user}) => {
  const [portfolio, setPortfolio] = useState(null);
  const {userId} = useParams()
  console.log("userId",user._Id)
  console.log(user)
  useEffect(() => {
    showPortfolio()
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