import React, {useState, useEffect} from 'react'
import Calculate from './Components/Calculate'
import Chart from './Components/Chart'
import * as moment from 'moment'
import './App.css'
import { connect } from "react-redux";

function App({calculations}) {
  const[input, setInput] = useState("")
  const[val, setVal] = useState()
  const[res, setRes] = useState([])
  const[calc, setCalc] = useState(false)

  const handleClick = () => {
    setVal(parseInt(input))
    console.log(val)
    setCalc(true);
  }
  useEffect(()=>{
    fetch('http://localhost:3000/history', {
      method: 'get',
      headers: {'Content-Type': 'application/json'},

      }).then(response => response.json()
      .then(data => {
        setRes(data)
      })
      )
      .catch(err => {
          console.log(err)
    })
  },[calculations, input])
  useEffect(() => {
    let N = res.length

    console.log("dataaa",res[N-1])
  }, [input])
  const History = () => {
    return(
      <>
        { res.map((data, i)=> <option key={i} value={data.number}> {data.name} {data.number}  {moment(data.date).format("DD/MM/YYYY")}</option>)}
      </>
  )}
  const handleChange = (e) => {
    setVal(e.target.value)
    setCalc(true);

  }

  return (
    <div className="app">
      <div className="number_input">
        <input type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} />
        <button onClick={handleClick}>Submit</button>
      </div>
      <select onChange={handleChange}>
        <option defaultValue hidden>History</option>
       <History/>
      </select> 

      { calc && 
      <>
        <Calculate x={val}/>
        <Chart />
      </>
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  calculations: state.user.calculations,
});

export default connect(mapStateToProps)(App);

