import React from 'react';
import { useLocation } from 'react-router-dom';

const Write = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const type = queryParams.get('type');

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

      <label htmlFor="content">내용</label>
      <textarea id="content" />

      <label htmlFor="image-upload">사진 첨부</label>
      <input type="file" id="image-upload" />

      <button className="modify-btn" style={{margin: '20px 0'}}>{buttonText}</button>
    </div>
  );
}

export default Write;