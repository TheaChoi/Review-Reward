import React, { useState, useEffect, Fragment } from 'react';
import Box from '@material-ui/core/Box';

const Modal = ({children, onClose, onRemove}) => {

  useEffect(()=> {
    document.body.style.overflowY = 'hidden';
    return () => document.body.style.overflowY = 'auto';
  }, []);

  let row = children;
  let fileUrls = row.files;
  let fl = [];

  console.log(typeof onClose)

  if (fileUrls.length > 0) {
    for(let i=0; i<fileUrls.length; i++) {
      let path = fileUrls[i].path;
      let pathName = path.substring(path.lastIndexOf('\\')+1, path.length)
      fl.push(pathName)
    }
    console.log("pathName array: ", fl)
  }

  return (
    <Fragment>
      <Box>
        <div className="Modal-backdrop" onClick={onClose}></div>
        <div className="Modal">
          <div className="Modal-body">
            <ul>
              <li>
                <h6>작성자</h6>
                <p>{row.username}</p>
              </li>
              <li>
                <h6>구매 품목</h6>
                <p>{row.numItem}</p>
              </li>
              <li>
                <h6>작성 내용</h6>
                <p>{row.text}</p>
              </li>
              <li>
                <h6>작성 시간</h6>
                <p>{row.time}</p>
              </li>
            
              <li>
                <h6>이미지</h6>            
                { fl.length == 0 &&  <p>저장된 이미지 없음</p> }
                <br/>
                {fl.map((path, idx) => (
                  <div className="img-container" key={idx} onClick={() => onRemove(row, path)} >
                    <img src={'http://localhost:8080/image/'+path} alt='uploadImage' className="image" />
                    <div className="overlay">
                      <div className="remove-image">Remove</div>
                    </div>
                  </div>
                ))}
              </li>
            </ul>
          </div>
          <div className="Modal-footer"><button onClick={onClose}>닫기</button></div>
        </div> 
      </Box>
       
    </Fragment>
  )
}
export default Modal;