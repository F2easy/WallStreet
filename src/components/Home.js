import {useState, useEffect} from 'react'
import {getAllStocks} from "../api/portfolio"

const Home = (props) => {
	 const { msgAlert, user } = props
	// console.log('props in home', props)

	const [stocks, setStocks] = useState(null)
  
	// useEffect is an effect hook and it requires 2 args
	// first arg is a callback function and 2nd arg is a dependecy array
	// the depedencay array tells react when to run an effect hok.
	// if we want this to run only on the first render and anytime the page refreshes, 
	// we keep the dependancy array empty
	useEffect(() => {
		getAllStocks()
		.then()
		.catch( error => console.log('stocks: \n', stocks))
	}, []) // by keeping the array empty you are calling function 1X per render

	return (
		<>
			<h2>Home Page</h2>
		</>
	)
}

export default Home