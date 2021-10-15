import React, {useState, useEffect} from 'react'
import Calculate from './Calculate'
import Chart from './Chart'
import * as moment from 'moment'
import '../App.css'
import { connect } from "react-redux";

function Calculations({calculations, iterations, userName}) {
  const[input, setInput] = useState("")
  const[val, setVal] = useState()
  const[res, setRes] = useState([])
  const[calc, setCalc] = useState(false)
  const[newInput, setNewInput] = useState(false)
  const [dataArray, setDataArray]=useState([])

  const handleClick = () => {
    setVal(parseInt(input))
    console.log(val)
    setCalc(true);
    setNewInput(true)
  }
  useEffect(()=>{
    fetch('http://localhost:3000/history', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name: userName })
      }).then(response => response.json()
      .then(data => {
        setRes(data)
      })
      )
      .catch(err => {
          console.log(err)
    })
  },[calculations, input])

  const History = () => {
    return(
      <>
        { res.map((data, i)=> <option key={i} value={data.entries}> {data.name} {data.number}  {moment(data.date).format("DD/MM/YYYY")}</option>)}
      </>
  )}
  const handleChange = (e) => {
    let fetchedData = e.target.value
    setDataArray(fetchedData.toString().split(","));
    setCalc(true);
    setNewInput(false)
  }
  useEffect(() => {
    let splitData = dataArray.toString().split(",")
    console.log("dataaa", splitData)
  }, [dataArray])
  return (
    <div className="app">
        <h1> Hello {userName} </h1>
      <div className="number_input">
        <input type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} />
        <button onClick={handleClick}>Submit</button>
      </div>
      <select onChange={handleChange} >
        <option  hidden>History</option>
       <History/>
      </select> 

      { calc && 
      <>
      {
        newInput && <Calculate x={val}/>
      }
      <Chart dataArray={dataArray} />
      <p>It took {iterations} iterations to reach 1.</p>
      </>
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  calculations: state.user.calculations,
  iterations: state.user.iterations,
  userName: state.user.userName,
});

export default connect(mapStateToProps)(Calculations);

