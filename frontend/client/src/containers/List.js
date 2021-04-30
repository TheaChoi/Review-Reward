import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Stars from '../components/Stars';

const List = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("List useEffect!");
    fetch('http://localhost:4000/api/getList')
    .then(response => response.json())
    .then(datas => {
      console.log("datass:", datas)
      setPosts(datas)
   });
  }, [])

  return (
    <div className='container'>
      <h4>List</h4>
      <Link to={location.pathname + "write" }>
        <button>Write a review</button>
      </Link>
      <div className="list-group">
        {posts.map((post, index) => (
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" key={index}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">제목: {post.title}</h5>
              <div className="postIcon" ><Stars curStars={post.star} starRating={post.star} /></div>
              <small>{post.time}</small>
            </div>
            <p className="mb-1">{post.text}</p>
            <small>작성자: {post.username}</small>
          </a>
         ))}
      </div>
    </div>
  )
}

export default List;