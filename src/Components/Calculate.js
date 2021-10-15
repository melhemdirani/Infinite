import React, {useState, useEffect} from 'react'
import { setCalculations } from '../redux/user/user.actions'
import { connect } from "react-redux";

const Calculate = ({x, setCalculations, calculations, userName}) => {
    const [variable, setVariable] = useState()
    const [answer, setAnswer] = useState([])

    const f1 = (a)=> (3*a +1)/2
    const f2 = (a) => a/2

    useEffect(()=>{
        if (!x) {
            alert("Please enter a number")
        }
        setVariable(x)
        setAnswer([])
    },[x])

    useEffect(()=>{
        if (variable && variable!==1){
            if (variable%2 === 0) {
                setVariable(f2(variable))
            }
            else {
                setVariable(f1(variable))
            }

        } 
    },[variable])
   
    useEffect(()=>{
        let arr = answer
        setAnswer(prevArray => [...prevArray, variable])
    }, [variable])
    useEffect(()=>{
        if(variable === 1) {
            if(answer.includes(undefined)){
                setCalculations(answer.shift())
            }
            else {
                setCalculations(answer)
            }
        }
        console.log("answer", answer)

    }, [answer])
    useEffect(()=>{
       if(x > 1 && calculations.includes(1)){
            fetch('http://localhost:3000/data', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: userName, 
                    entries: calculations,
                    number: x
                })
            }).then(response => response.json())
            .catch(err => {
                console.log(err)
            })
        }
        console.log("calculations",calculations)
    }, [x])

   return null 
}

const mapDispatchToProps = (dispatch) => ({
    setCalculations: (arr) => dispatch(setCalculations(arr)),
});
const mapStateToProps = (state) => ({
    calculations: state.user.calculations,
    userName: state.user.userName,
});
export default connect(mapStateToProps, mapDispatchToProps)(Calculate);
