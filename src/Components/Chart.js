import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import { connect } from 'react-redux';



const Chart = ({calculations}) => {
 const [labelArray, setLabelArray] = useState([]) 
  useEffect(() => {
    let N = calculations.length
    let arr = Array.from({ length: N }, (_, i) => i+1)
      setLabelArray(arr)
  }, [calculations])
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
          data: calculations
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

const mapStateToProps = (state) => ({
  calculations: state.user.calculations,
});
export default connect(mapStateToProps)(Chart);
