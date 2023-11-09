import { async } from 'q';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Write = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const type = queryParams.get('type');
  const commonToolbar = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }, { 'background': [] }],
    [{ 'align': [] }],
    ['image'],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, 'clean']
    
  ];
  
  const reviewToolbar = [
    ...commonToolbar.slice(0, commonToolbar.findIndex(item => item.includes('image'))),
    ...commonToolbar.slice(commonToolbar.findIndex(item => item.includes('image')) + 1),
  ];
  
  const modules = {
    toolbar: {
      container: type === 'review' ? reviewToolbar : commonToolbar,
    },
  };
  const onChangeContents = (constents) => {
    
  }
  const navigate = useNavigate();
  const saveBoard = async () => {
    try {
      const boardData = {
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
      };
  
      const url = `/detail?id=${id}&type=${type}`;
  
      const response = await axios.post(url, boardData);
  
      alert('저장 완료');
  
    } catch (error) {
      alert('게시판 데이터 저장 중 오류 발생');
      console.error('오류:', error);
    }
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  let title = '후기 작성';
  let buttonText = '후기 작성 완료';

  if (type === 'review') {
    title = id ? '후기 수정' : '후기 작성';
    buttonText = id ? '수정' : '완료';
  } else {
    title = id ? '정책 소식 수정' : '정책 소식 작성';
    buttonText = id ? '수정' : '완료';
  }

  return (
    <div className="container">
      <h3>{title}</h3>

      <label htmlFor="title">게시글 제목</label>
      <input type="text" id="title" />

      <label htmlFor="content">
        <ReactQuill 
            style={{ height: "200px" }}
            onChange={onChangeContents}
            modules={modules} />
      </label>
      <br />
      <br />
      <br />

      <div className="button-container">
        <button onClick={saveBoard}>{buttonText}</button>
        <button onClick={handleCancel}>취소</button>
      </div>
    </div>
  );
}

export default Write;