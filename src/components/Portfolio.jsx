import React, { useState, useEffect } from 'react';
import {editPortfolio,  removeStock, showPortfolio, showStock} from '../api/portfolio'
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
 import  axios  from 'axios';



const Portfolio = ({user}) => {
  const [portfolio, setPortfolio] = useState(null);
  const [newName, setNewName] = useState('');
  const {userId} = useParams()
 // console.log("userId",user._id)
  // console.log(user)
  // console.log('portId', portfolio)
  useEffect(() => {
    showPortfolio(userId)
      .then(res => { 
        setPortfolio(res.data.portfolio);
        // console.log("portfolio", res.data.portfolio);
      })
      .catch(error => {
        console.log('Error fetching portfolio:', error);
      });
  }, []);


    


  const handleEditPortfolio = () => {
    editPortfolio(user, portfolio._id, newName)
      .then((e) => {
        setPortfolio(prevPortfolio => ({ ...prevPortfolio, portName: newName }));
        console.log('Portfolio name updated successfully!');
      })
      .catch((error) => {
        console.error('Failed to update portfolio name:', error);
      });
  };

  const handleRemoveStock = (stock) => {
    removeStock(user, stock._id, portfolio._id)
      .then(() => {
        setPortfolio(prevPortfolio => ({
          ...prevPortfolio,
          stockList: prevPortfolio.stockList.filter(item => item._id !== stock._id)
        }));
        console.log('Stock removed successfully!');
      })
      .catch((error) => {
        console.error('Failed to remove stock:', error);
      });
  };

  return (
    <>
    
    <h2 align='center' > Stocks in Your Portfolio</h2>
    
    {portfolio ? (
      
      <div className='portfolio-container'>
        
        <div>
        <p>Portfolio Name: {portfolio.portName}</p>
        <input type="text" 
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        /> 
         <Button
            className="m-2"
            variant="dark"
            
            onClick={handleEditPortfolio}
          >
            Change Portfolio Name
          </Button>

        </div >
        {portfolio ? (
          <div className='portfolio-container'>
            {portfolio.stockList.map((stock, stockIndex) => (
              <div key={stockIndex}>
                <img src={stock.logo} alt = "" className="Stock-Logo" />
                <p>Ticker: {stock.ticker}</p>
                <p>Country: {stock.country}</p>
                <Button
                  className="m-2"
                  variant="danger"
                  onClick ={() => {handleRemoveStock(stock)}}
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