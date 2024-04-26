import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllStocks } from '../api/portfolio';
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
    <div className='Back-Ground' style={{ backgroundColor: '#4a4a4a'}}>
    <h2 className='title-Index'>Stock-List</h2>
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
          <div className="card-list" style={{ backgroundColor: '#4a4a4a'}}>
            {stocks.filter((stock) => {
              return search.trim() === '' ? stock : stock.description.toLowerCase().includes(search.toLowerCase())
            }).map((stock) => (
              <div key={stock.symbol} className="card" style={{ backgroundColor: 'a3a3a3'}}>
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
      </div>
    </>
  );
};

export default Index;