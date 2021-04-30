import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ signOut, user }) => {

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light justify-content-end">
      {
        (user) ?
          <button className="btn btn-outline-success" type="button" onClick={signOut}>SignOut</button>
        :
          <p>로그인을 해주세요.</p>
      }
    </div>
  )
}

export default Header;  