import React from 'react';
import './App.css';
import cors from 'cors';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Review from './containers/Review';
import List from './containers/List';

function App() {
  cors();
  return (
    <div className="App">
      <header className="App-header">
         <h1> Review </h1>
      </header>
      <Router>
        <Redirect to={location.pathname}/>
        {/* <Switch> */}
          <Route path={location.pathname} exact component={List}></Route>
          <Route path={location.pathname + "write"} component={Review}></Route>
        {/* </Switch> */}
      </Router>       
    </div>
  );
}

export default App;
