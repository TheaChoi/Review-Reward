import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { useHistory } from "react-router-dom";
import Board from '../components/Board';
import Filter from '../components/Filter';

const Main = ({ location }) => {

  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();
  console.log("location=", location)
  console.log("location.pathname=", location.pathname)

  const query = queryString.parse(location.search);
  const criteria = query.criteria;
  const searched = query.searched;

  useEffect(() => {
    setIsLoading(true);
    showlist(criteria, searched)
  }, [])

  const deleteRows = (ids) => {
    const confirmDelete = confirm(`해당 데이터 ${ids.length} 개를 삭제하시겠습니까?`);
    if (confirmDelete) {
      axios({
            url: 'http://localhost:4000/admin/deleteRows',
            method: 'post',
            data: {"ids": ids},
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },  
          }).then((response) => {
            console.log("삭제함.", response)
            window.location.reload();
          }).catch((error) => {
            console.log("삭제에러: ", error);
          })
    } 
  }

  const deleteImage = (row, path) => {
    const confirmDelete = confirm('해당 게시물에서 선택하신 이미지를 삭제하시겠습니까?');
    if (confirmDelete) {
      axios({
        url: 'http://localhost:4000/admin/deleteImage',
        method: 'post',
        data: {"row": row, "path": path},
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },  
      }).then((response) => {
        console.log("삭제함.", response)
        window.location.reload();
      }).catch((error) => {
        console.log("삭제에러: ", error);
      })
    }
  }

  const showlist = (ct, sh) => {
    if (typeof ct == "undefined") ct = '';
    if (typeof sh == "undefined") sh = '';
    axios({
      url: 'http://localhost:4000/admin/getSearched?criteria=' + ct + '&searched=' + sh,
      method: 'get',
      // data: { 'criteria': criteria, 'search': search },
    })
    .then((response) => {
      console.log(response);
      const data = response.data;
      setList(data)
      setIsLoading(false);
      // location.reload()     
    }).catch((error) => {
      console.log("search에러: ", error);
    })
  }

  const searchRows = (ct, sh) => {
    console.log("ct=" + ct + ", sh=" + sh)
    history.push(location.pathname + '?criteria=' + ct + '&searched=' + sh);
    window.location.reload()
  }
  
  if (isLoading) {
    return <p>Loading ...</p>;
  }
  return (
    <div className="row">
      <Filter searchRows={searchRows}/>
      <Board list={list} deleteRows={deleteRows} handleImage={deleteImage}/>
    </div>
  );
}

export default Main;