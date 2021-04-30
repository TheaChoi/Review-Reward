import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Main from './containers/Main';
import Header from './components/Header';
import LoginForm from './components/LoginForm';

const App = () => {

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const id = window.sessionStorage.getItem("id");
    const name = window.sessionStorage.getItem("name");
    if (id) {
      setUser({"id":id, "name":name})
    } else {
      setUser(null)
    }
  }, [])

  const signIn = (username, password) => {
    axios.post('http://localhost:4000/admin/account/signin', {
      username: username,
      password: password
    })
    .then( response => { 
      console.log(response);
      const name = response.data.loginInfo.username;
      const id = response.data.loginInfo._id;
      window.sessionStorage.setItem("id", id);
      window.sessionStorage.setItem("name", name);
      setUser({ "id":id, "name":name });
    } )
    .catch( response => { 
      console.log(response);
      setUser(null) 
      alert("로그인 정보가 틀렸습니다.");
      window.location.reload();
    } );
  }

  const signOut = () => {
    console.log("sign out")
    axios.post('http://localhost:4000/admin/account/signout')
    .then( response => { 
      console.log(response);
      window.sessionStorage.clear();
      setUser(null);
      alert("로그아웃했습니다.");
    } )
    .catch( response => { 
      console.log(response);
    } ); 
  }

  return (
    <Fragment>
       <header>
        <Header signOut={signOut} user={user}/>
      </header>
      <div>
        {
          (user) ?
            <div className="container">
              <h1>Main</h1>
              <Router>
                {/* <Route path="/:criteria/:search" component={Main}/> */}
                <Route path="/" component={Main}/>
              </Router>
              {/* <Main user={user} /> */}
            </div>
          :
            <div className="container">
              <h1>로그인</h1>
              <LoginForm onSignIn={signIn} />
            </div>     
        }
      </div>
    </Fragment>
  );
}

export default App;

