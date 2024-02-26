import {useState, useEffect} from 'react'
import {getAllStocks, showNews} from "../api/portfolio"
import React from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import axios from 'axios';
import Portfolio from './Portfolio';


const Home = () => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    showNews()
    .then(res => {
      setNews(res.data.news);
      console.log("this is setStocks", setNews);
    })
    .catch((error) => {
      console.log('Error fetching stocks:', error);
    });
}, []);


  return (
    <>
      <h1>WallStreet</h1>
      <body> Welcome to Wallstreet ! </body>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1' }}>
          {/* Content on the left side (if any) */}
        </div>
        <div style={{ flex: '1'}}>
          <h2 style={{ textAlign: 'center' }}>News</h2>
          {news ? (
          <>
           <Card>
           <Card.Img
             variant="top"
             src={news.imageGen}
             style={{ width: '300px', height: '150px', objectFit: 'contain' }}
           />
           <Card.Body>
             <Card.Title>{news.headlineGen}</Card.Title>
             <Card.Subtitle className="mb-2 text-muted">
               Source: {news.sourceGen}
             </Card.Subtitle>
             <Card.Text>{news.summaryGen}</Card.Text>
             <Card.Link href={news.urlGen}>Read More</Card.Link>
           </Card.Body>
         </Card>
         <div style={{ flex: '1' }}></div>
         <h2 style={{ textAlign: 'center' }}>Merger News</h2>
           <Card>
           <Card.Img
             variant="top"
             src={news.imageMerge}
             style={{ width: '300px', height: '150px', objectFit: 'contain' }}
           />
           <Card.Body>
             <Card.Title>{news.headlineMerge}</Card.Title>
             <Card.Subtitle className="mb-2 text-muted">
               Source: {news.sourceMerge}
             </Card.Subtitle>
             <Card.Text>{news.summaryMerge}</Card.Text>
             <Card.Link href={news.urlMerge}>Read More</Card.Link>
           </Card.Body>
         </Card>
       </>
         
       ) : (
            <p>Loading news...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;