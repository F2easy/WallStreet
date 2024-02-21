import {useState, useEffect} from 'react'
import {getAllStocks} from "../api/portfolio"
import React from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import axios from 'axios';

const Home = () => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/home');
        setNews(response.data.news);
      } catch (error) {
        console.log('Error fetching news:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1' }}>
          {/* Content on the left side (if any) */}
        </div>
        <div style={{ flex: '1' }}>
          <h2>News</h2>
          {news ? (
            <Card>
              <Card.Img variant="top" src={news.imageGen} />
              <Card.Body>
                <Card.Title>{news.headlineGen}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Source: {news.sourceGen}
                </Card.Subtitle>
                <Card.Text>{news.summaryGen}</Card.Text>
                <Card.Link href={news.urlGen}>Read More</Card.Link>
              </Card.Body>
            </Card>
          ) : (
            <p>Loading news...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;