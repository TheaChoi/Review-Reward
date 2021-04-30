import React, { useEffect, useState } from 'react';

const TextReview = ({ getContents }) => {

  const [title, setTitle] = useState('좋은 상품 감사합니다.');
  const [text, setText] = useState('');
  const [item, setItem] = useState('ople13579');

  useEffect(() => {
    getContents(title, text, item)
  }, [title, item, text])

  return (
    <div className="textReview form-group">
      <label htmlFor="textReview"></label>
      <input className="form-control" rows="7" name="title" placeholder="제목" value={title} onChange={e => setTitle(e.target.value)}></input>
      <input className="form-control" rows="7" name="item" placeholder="상품명" value={item} onChange={e => setItem(e.target.value) }></input>
      <textarea 
        className="form-control" rows="7" name="text" onChange={e => setText(e.target.value)} placeholder="상품평을 작성해 보세요.">
      </textarea>
        {/* <input type="submit" className="btn btn-danger btn-block" value="등록하기"></input> */}
    </div>
  )
}

export default TextReview;