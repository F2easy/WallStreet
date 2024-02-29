import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllStocks } from '../api/portfolio';
import { Tabs, Tab, } from 'react-bootstrap';
import Form from 'react-bootstrap/Form' ;
import InputGroup from 'react-bootstrap/InputGroup' ;


const Index = () => {
  const [stocks, setStocks] = useState(null);
  const [search, setSearch] = useState('');
  console.log(search)
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
    <div className='search'>
    <Form> 
      <InputGroup className="myBar" >
        <Form.Control
          onChange={(e) => setSearch(e.target.value)}placeholder='Search Stocks' />
      </InputGroup>
    </Form>
    </div>
    <></>
    <div className="stock-cards">
        {stocks ? (
          <div className="card-list">
            {stocks.filter((stock) => {
              return search.trim() === '' ? stock : stock.description.toLowerCase().includes(search.toLowerCase())
            }).map((stock) => (
              <div key={stock.symbol} className="card">
                <Link to={`/stocks/${stock.symbol}`} className="card-name">
                  {stock.symbol}
                </Link>
                <div className="card-info">
                  <p>Company Name: {stock.description}</p>
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