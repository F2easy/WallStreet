import { useState, useEffect } from 'react';
import {editPortfolio, getAllStocks, removeStock, showPortfolio, showStock} from '../api/portfolio'
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import React from 'react';
import messages from './shared/AutoDismissAlert/messages';




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
    console.log("user", user);
    console.log("portfolioId", portfolio._id);
    console.log("newName", newName);
    editPortfolio(user, portfolio._id, { portName: newName })
      .then(() => {
        // Update the local state with the new name
        setPortfolio({ ...portfolio, portName: newName });
        // Reset the input field
        setNewName('');
        // Handle successful update, e.g., show a success message
        
				msgAlert({
					heading: 'Portfolio Update Success',
					message: messages.updatedPortfolioSuccess,
					variant: 'success',
				})

        console.log('Portfolio name updated successfully!');
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error('Failed to update portfolio name:', error);
      });
  };




  return (
    <>
    <h2>Portfolio Details</h2>
    
    {portfolio ? (
      <div>
        <h3>Stocks in Your Portfolio</h3>
        <div>
        <p>name: {portfolio.portName}</p>
        <input type="text" 
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        />
        <Button
            className="m-2"
            variant="dark"
            onClick={() => {editPortfolio(user, portfolio._id)}}
          >
            Change Portfolio Name
          </Button>

        </div>
        {portfolio ? (
          <div>
            <p>name: {portfolio.name}</p>
            {portfolio.stockList.map((stock, stockIndex) => (
              <div key={stockIndex}>
                <img src={stock.logo} alt="Stock Logo" />
                <p>Ticker: {stock.ticker}</p>
                <p>Country: {stock.country}</p>
                <Button
                  className="m-2"
                  variant="dark"
                  onClick ={handleEditPortfolio}
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