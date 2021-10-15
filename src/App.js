import React from 'react'
import HomePage from './Components/HomePage'
import Calculations from './Components/Calculations';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/calculations">
          <Calculations />
        </Route>
      </Router>

    </div>
  )
}

export default App
