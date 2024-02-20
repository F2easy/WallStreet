import { useState, useEffect } from 'react';
import {getAllStocks, showStock} from '../api/portfolio'
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Card, Button } from 'react-bootstrap';

const Show = ({ user }) => {
  const [stock, setStock] = useState(null);
  const { symbol } = useParams();

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
    console.log('user', user._id);
    console.log('stock:', stock);
    return axios.patch(`${apiUrl}/portfolio/${user._id}`, stock);
  };

  return (
    <>
      <h2>Stock Details</h2>
      {stock ? (
        <Card>
          {stock.logo && (
            <Card.Img
              variant="top"
              src={stock.logo}
              alt="Company Logo"
              style={{ width: '150px', height: 'auto' }}
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
      ) : (
        <p>Loading stock details...</p>
      )}
    </>
  );
};








export default Show;













