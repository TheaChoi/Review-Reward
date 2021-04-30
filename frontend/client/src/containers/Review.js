import React, { useState } from 'react';
import axios from 'axios';
import ImageUpload from '../components/ImageUpload';
import Stars from '../components/Stars';
import TextReview from '../components/TextReview';

const Review = ({ history }) => {
  const [star, setStar] = useState(5);
  const [file, setFile] = useState('');
  const [contents, setContents] = useState({});

  const starRating = star => setStar(star);
  const getFiles = files => setFile(files);
  const getContents = (title, text, item) => {
    setContents({"title": title, "text": text, "item": item})
    return;
  }

  // Formdata Submit
  const submitData = data => {
    axios({
      url: 'http://localhost:4000/api/upload',
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then((response) => {
      console.log("파일저장성공", response)
      alert("파일이 저장되었습니다.");
      // window.location.replace();
      history.replace('/client/');

    }).catch((error) => {
      console.log("error! : ", error);
    })
  }

  const handleSubmit = () => {
    let formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append('files', file[i][0])
    }
    formData.append('star', star);
    formData.append('text', contents.text);
    formData.append('title', contents.title);
    formData.append('item', contents.item);

    submitData(formData);
  }

  return (
    <div>
      <div className='container'>
        <Stars curStars={star} starRating={starRating} />
        <TextReview getContents={getContents}/>
        <ImageUpload getFiles={getFiles}/>
        <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>Upload</button>
      </div>
    </div>
  )
}

export default Review;