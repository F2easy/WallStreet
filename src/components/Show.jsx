import { useState, useEffect } from 'react';
import { showStock } from '../api/portfolio';
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../apiConfig';
import { Card, Button, Row, Col } from 'react-bootstrap';
import {Bar,Line} from 'react-chartjs-2'
import messages from '../components/shared/AutoDismissAlert/messages'
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
LineElement,
BarElement,
Title,
Tooltip,
PointElement,
Legend
} from 'chart.js'

ChartJS.register(
CategoryScale,
LinearScale,
LineElement,
BarElement,
PointElement,

Title,
Tooltip,
Legend
)

const Show = ({ user }) => {
  const [stock, setStock] = useState(null);
  const { symbol } = useParams();
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState(null)
  // const showAlert = (heading, message, variant) => {
  //   setAlert({ heading, message, variant });
  // };

  // const dismissAlert = () => {
  //   setAlert(null);
  // };


  console.log('this is stock',stock)
  useEffect(() => {
    setLoading(true)

    showStock(symbol)
      .then(res => {
        setStock(res.data.stock);
        setLoading(false)
      })
      .catch(error => {
        console.log('Error fetching stock:', error);
      });
  }, [symbol]);

  const handleClick = (messages) => {
    //  const { msgAlert, setUser } = props
    console.log('user', user._id);
    console.log('stock:', stock);
    return axios.patch(`${apiUrl}/portfolio/${user._id}`, stock)
    // .then(() =>
		// 		msgAlert({
		// 			heading: 'Sign In Success',
		// 			message: messages.signInSuccess,
		// 			variant: 'success',
		// 		})
		// 	);
   };
   
  /// Line Chart for trends


  const labels1 = ['Current-Price', 'Lowest-Price', 'Highest-Price', 'Prev-Close', 'Open-Price'];
  const data1 = {
    labels: labels1,
    datasets: [{
      label: 'Trends for stock',
      data: [
        stock?.currentPrice || 0, 
        stock?.lowPrice || 0, 
        stock?.highPrice || 0, 
        stock?.prevClose || 0, 
        stock?.openPrice || 0
      ],
      fill: true,
      borderColor: 'light-green',
      tension: 0.1
    }]
  };

 
  const config = {
    type: 'line',
    data: data1,
  };

// Bar Chart for reccomendations

   const labels = [stock?.recPeriod3, stock?.recPeriod2, stock?.recPeriod1, stock?.recPeriod] ;
   const data = {
     labels: labels,
     datasets: [{ 
      label: 'Strong-Buy', 
      backgroundColor: "blue", 
      data: [stock?.recStrongBuy3 || 0,stock?.recStrongBuy2 || 0,stock?.recStrongBuy1 || 0,stock?.recStrongBuy || 0], 
  },{ 
    label: 'Buy', 
    backgroundColor: "green", 
    data: [ stock?.recBuy3 || 0, stock?.recBuy2 || 0, stock?.recBuy1 || 0, stock?.recBuy || 0], 
},
   { 
      label: 'Hold', 
      backgroundColor: "yellow", 
      data: [stock?.recHold3|| 0, stock?.recHold2|| 0, stock?.recHold1|| 0, stock?.recHold|| 0], 
  }, { 
      label: 'Sell', 
      backgroundColor: "red", 
      data: [stock?.recSell3 || 0,stock?.recSell2 || 0,stock?.recSell1 || 0,stock?.recSell || 0], 
  },
  { 
    label: 'Strong-Sell', 
    backgroundColor: "red", 
    data: [stock?.recStrongSell3||0, stock?.recStrongSell2|| 0,stock?.recStrongSell1|| 0,stock?.recStrongSell|| 0], 
}], 
}
 
  const options = {

    responsive: true,
    legend: {
       position: 'center' // place legend on the center of chart
    },

    scales: {
      x: {
        beginAtZero: true,
        stacked: true
      },
      y: {
        beginAtZero: true,
        stacked: true,
      }
    },
    };
  


    

    return (
      <>
        {loading ? (
          <p>Loading...</p>
        ) : stock ? (
      
        
        <Row>
           <div>
        
        </div>
        <Col md={3}>
            <Card className="line-chart">
              <Card.Body>
                <Line data={data1} options={config} />
              </Card.Body>
            </Card>
          </Col>
        <Col md={5}>
            <Card className="bar-chart">
              <Card.Body>
                <Bar data={data} options={options} />
              </Card.Body>
            </Card>
          </Col>
           <Col md={3}>
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
                  style={{ width: '25%', height: '25%' }}
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