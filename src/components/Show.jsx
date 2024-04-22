import { useState, useEffect } from 'react';
import { getAllStocks, showStock } from '../api/portfolio';
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../apiConfig';
import { Card, Button, Row, Col } from 'react-bootstrap';

const Show = ({ user }) => {
  const [stock, setStock] = useState(null);
  const { symbol } = useParams();

  useEffect(() => {
    showStock(symbol)
      .then(res => {
        setStock(res.data.stock);
      })
      .catch(error => {
        console.log('Error fetching stock:', error);
      });
  }, [symbol]);

  const handleClick = () => {
    console.log('user', user._id);
    console.log('stock:', stock);
    return axios.patch(`${apiUrl}/portfolio/${user._id}`, stock);
  };

  return (
    <>
      <h2>Stock Details</h2>
      {stock ? (
        
        <Row>
           <Col  lg={7} md={8}>
            <Card className='prices'>
              <Card.Body>
                <Card.Title>Financial</Card.Title>
                <Card.Text>Current Price Per Share: ${stock.currentPrice}</Card.Text>
                <Card.Text>Daily Low Price: ${stock.lowPrice}</Card.Text>
                <Card.Text>Daily High Price: ${stock.highPrice}</Card.Text>
                <Card.Text>Change: ${stock.change}</Card.Text>
                <Card.Text>Percent Change: {stock.percentChange}%</Card.Text>
                <Card.Text>Open Price: ${stock.openPrice}</Card.Text>
                <Card.Text> Previous close Price: ${stock.prevClose}</Card.Text>
                
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            
            <Card className='stock-info'>
              {stock.logo && (
                <Card.Img
                  variant="top"
                  src={stock.logo}
                  alt="Company Logo"
                  // style={{ width: '150px', height: '150px' }}
                />
              )}
              <Card.Body>
                <Card.Title>{stock.ticker}</Card.Title>
                <Card.Text>Company Name: {stock.name}</Card.Text>
                <Card.Text>Currency: {stock.currency}</Card.Text>
                <Card.Text>Country: {stock.country}</Card.Text>
                <Card.Text>Industry: {stock.industry}</Card.Text>
                <Card.Text>IPO date: {stock.ipo}</Card.Text>
                <Card.Text>Exchange: {stock.exchange}</Card.Text>
                <Button
                  className="m-2"
                  variant="success"
                  onClick={handleClick}
                  
                >
                  Purchase Stock
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Card className='company-news'> 
            <Card.Title>Company News</Card.Title>
            {stock.logo && (
                <Card.Img
                  variant="top"
                  src={stock.newsImage}
                  alt="News Logo"
                  style={{ width: 'auto', height: 'auto' }}
                />
              )}
              <Col md={3}>
              <Card.Body>
                <Card.Text>{stock.companyNews}</Card.Text>
                <Card.Text>{stock.summary}</Card.Text>
                <Card.Text>News Source: {stock.source}</Card.Text>
              </Card.Body>
              </Col>
            </Card>
        </Row>
        
      ) : (
        <p>Loading stock details...</p>
      )}
    </>
  );
};

export default Show;
