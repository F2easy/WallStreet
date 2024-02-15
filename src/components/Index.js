import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllStocks } from '../api/portfolio';

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
      {stocks ? (
        <ul>
          {stocks.map(stock => (
            <li key={stock.symbol}>
              <Link to={`/stocks/${stock.symbol}`}>
                <p>Description: {stock.description}</p>
                <p>Symbol: {stock.symbol}</p>
                <p>Currency: {stock.currency}</p>
                <p>Type: {stock.type}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading all Stocks...</p>
      )}
    </>
  );
};

export default Index;