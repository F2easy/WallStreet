import React, { useState, useEffect } from 'react';
import { showNews } from "../api/portfolio";
import { Card } from 'react-bootstrap';

const Home = () => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    showNews()
      .then(res => {
        setNews(res.data.news);
      })
      .catch((error) => {
        console.log('Error fetching news:', error);
      });
  }, []);

  return (
    <body style={{ backgroundColor: '#4a4a4a' }}>
      <h1>WallStreet</h1>
      <div className='home-body'> Welcome to Wallstreet ! </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1' }}>
          {/* Content on the left side (if any) */}
        </div>
        <div style={{ flex: '1' }}>
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
    </body>
  );
};

export default Home;