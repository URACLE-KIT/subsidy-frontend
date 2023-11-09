import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';

const Write = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const type = queryParams.get('type');
  const userId = M.data.storage("id");
  const [content, setContent] = useState("");

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

  const onChangeContents = (content) => {
    setContent(content);
  };

  const navigate = useNavigate();

  const saveReview = async () => {
    const title = document.getElementById('title').value;
    const reviewData = {
      title: title,
      content: content,
    };

    try {
      const url = `/v1/subsidies-review/create?userId=${userId}&subsidyId=${id}`;
      const response = await axios.post(url, reviewData);

      alert('후기 작성 완료');
      navigate(`/detail?id=${response.data.id}&review`);
    } catch (error) {
      console.error('오류:', error);
      alert('후기 작성 중 오류 발생');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  let title = '후기 작성';
  let buttonText = '후기 작성 완료';

  if (type === 'review') {
    title = '후기 작성';
    buttonText = '완료';
  } else if (type == "reviewedit") {
    title = '후기 수정';
    buttonText = '수정';
  } else {
    title = id ? '정책 소식 수정' : '정책 소식 작성';
    buttonText = id ? '수정' : '완료';
  }

  return (
    <div className="container">
      <h3>{title}</h3>

      <input type="text" id="title" placeholder='제목' />
      <ReactQuill
        id="content"
        style={{ height: "200px" }}
        onChange={onChangeContents}
        modules={modules}
      />

      <br />
      <br />
      <br />

      <div className="button-container">
        <button onClick={saveReview}>{buttonText}</button>
        <button onClick={handleCancel}>취소</button>
      </div>
    </div>
  );
}

export default Write;