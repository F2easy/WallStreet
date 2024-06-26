import apiUrl from '../apiConfig'
import axios from 'axios'
// READ --> Index
// axios default functionality is to send a GET request
// if it is anything but a GET request the rules change look at PETS
export const getAllStocks = () => {
  return axios (`${apiUrl}/stocks`)
}
// READ -> Show --> Stocks
export const showStock = (symbol) => {
  return axios (`${apiUrl}/stocks/${symbol}`)
}
// READ -> Show --> Portfolio **
export const showPortfolio = (id) => {
  // console.log("user:", user)
  return axios (`${apiUrl}/portfolio/${id}`)
}
// CREATE -> Add a Portfolio **
export const createPortfolio = () => {
  return axios (`${apiUrl}/portfolio`) // would i even need Axios for this ??
 }


// UPDATE -> adjust/edit a Portfolio **
// Patch Route
 export const editPortfolio = (id,data,newName) => {
  console.log("id",id)
  console.log("data",data)
  console.log("portId",id._id)
  console.log("e name is ", newName)
 // console.log(" this is req.body", req.body)
  return axios ({
    url: `${apiUrl}/myportfolio/${data}`,
    method: 'PATCH',
    headers: {
        Authorization: `Token token=${id.token}`
    },
    data: {
      "portfolio": {
         "portName": `${newName}`
  
      }
  }
  })
}

// DELETE --> Delete Portfolio **

// ADD --> add stocks to StockList Array 
export const addStock = ({userId,data}) => {
  console.log("userID: ",userId)
  return axios.patch(`/portfolio/${userId}`,data)
}
// DELETE --> Remove Stocks from StockList array 
export const removeStock = (user,stockId,portId) => {
  console.log("this is user",user)
  // console.log("this is stockId",stockId)
  console.log("this is portId",portId)
  return axios ({
      url: `${apiUrl}/portfolio/${stockId}/${portId}`,
      method: 'DELETE',
      headers: {
          Authorization: `Token token=${user.token}`
      }
  })
}

// READ -> Home --> news
export const showNews = () => {
  return axios (`${apiUrl}/`)
}