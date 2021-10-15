import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import { connect } from 'react-redux';
import { setIterations } from '../redux/user/user.actions';



const Chart = ({calculations,dataArray, setIterations}) => {
  const [arrays,setArrays] = useState([])
  const [labelArray, setLabelArray] = useState([]) 
  useEffect(() => {
    setArrays(calculations)
  }, [calculations])
  useEffect(() => {
    setArrays(dataArray)
  }, [dataArray])
  useEffect(() => {
    setIterations((arrays.length - 1))
  }, [arrays])
  useEffect(() => {
    let N = arrays.length
    let arr = Array.from({ length: N }, (_, i) => i+1)
      setLabelArray(arr)
  }, [arrays])
  const state = {
    labels: labelArray,
    datasets: [ 
      {
          label: "result",
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 1,
          data: arrays
      }
    ]
  }
    return (
      <div>
        <Line
          data={state}
          options={{
            title:{
              display:false,
              text:'',
              fontSize:20
            },
            legend:{
              display:false,
              position:'right'
            }
          }}
        />
      </div>
    );
}
const mapDispatchToProps = (dispatch) => ({
  setIterations: (i) => dispatch(setIterations(i)),
});
const mapStateToProps = (state) => ({
  calculations: state.user.calculations,
});
export default connect(mapStateToProps,mapDispatchToProps)(Chart);


