import React, { useState } from 'react';

const LoginForm = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault()
    onSignIn(username, password);
  }

  const handleChange = e => {
    let name = e.target.name;
    if (name == 'username') {
      setUsername(e.target.value);
    } else if (name == 'password') {
      setPassword(e.target.value)
    }
  }

  return (
    <form onSubmit={handleSignIn}>
      <input type="text" name="username" placeholder="enter you username" onChange={handleChange}/><br/>
      <input type="password" name="password" placeholder="enter password"  onChange={handleChange}/><br/>
      <input type="submit" value="Login" />
    </form>
  );
}

export default LoginForm;
