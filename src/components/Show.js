import { useState, useEffect } from 'react';
import {getAllStocks, showStock} from '../api/portfolio'
import { Button } from 'react-bootstrap';
import { addStock } from '../api/portfolio';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const Show = ({ user }) => {
  const [stock, setStock] = useState(null);
  const {symbol} = useParams()
  //console.log('user',user._id)
  console.log(symbol)


  useEffect(() => {
    showStock(symbol)
      .then(res => {
        setStock(res.data.stock);
        console.log("rizz", res);
      })
      .catch(error => {
        console.log('Error fetching stock:', error);
      });
  }, [symbol]);


    const handleClick = () => {
      console.log('user',user._id)
      return axios.patch(`/portfolio/${user._id}`,stock)
    }


  return (
    <>
      <h2>Stock Details</h2>
      {stock ? (
        <div>
            {stock.logo && (
            <a href={stock.website} target="_blank" rel="noopener noreferrer">
              <img src={stock.logo} alt="Company Logo" />
            </a>
          )}
          <p>Description: {stock.ticker}</p>
          <p>Symbol: {stock.currency}</p>
          <p>Currency: {stock.ipo}</p>
          <p>Type: {stock.name}</p>
        
          {(
            <Button
              className='m-2'
              variant='success'
               onClick= {handleClick}
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









export default Show;













