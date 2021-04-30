import React, { useState, useEffect } from 'react';
// const API_BASE = "http://localhost:4000";

// 이미지 업로드 클래스 컴포넌트 
const ImageUpload = ({ getFiles }) => {
  
  const [fileList, setFileList] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);

  useEffect(() => {
    getFiles(fileList);
  }, [fileList])

  // 화면에 업로드할 이미지 preview 띄우기
  const previewFiles = e => {
    let target = e.target.files;
    setFileList(fileList.concat(target));
    setFileUrls(fileUrls.concat(URL.createObjectURL(target[0])))
  }

  // 저장할 이미지 제거하기
  const handleRemove = idx => {
    setFileList(fileList.filter(file => file[0] !== fileList[idx][0]));
    setFileUrls(fileUrls.filter(url => url !== fileUrls[idx]))
  }

  return (
    <div>
      <div className='form-group multi-preview'>
        {(fileUrls || []).map((url, idx) => (
          <div className="img-container" key={idx} onClick={() => handleRemove(idx)}>
            <img src={url} alt='uploadImage' className="image" />
            <div className="overlay">
              <div className="remove-image">Remove</div>
            </div>
          </div>
        ))}
      </div>
      <div className='form-group'>
        <input type='file' name="multipleImages" className='form-control' onChange={previewFiles} multiple />
      </div>
    </div>
  )
}

export default ImageUpload;


