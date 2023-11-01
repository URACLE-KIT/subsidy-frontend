import React, { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import Modal from '../layout/Modal';
import { useNavigate } from 'react-router-dom';

const Setting = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('id');
      localStorage.removeItem('email');
      closeModal();
      navigate('/login');
    }
  };

  return (
    <>
      <div className="container">
        <h3>설정</h3>
        <div className="section">
          <div className="title">이용 안내</div>
          <p className="list" onClick={() => openModal('자주 묻는 질문')}>자주 묻는 질문 <FaAngleRight /></p>
        </div>

        <div className="section">
          <div className="title">이용 정보</div>
          <p className="list" onClick={() => openModal('이용 약관')}>이용 약관 <FaAngleRight /></p>
          <p className="list" onClick={() => openModal('개인정보 처리방침')}>개인정보 처리방침 <FaAngleRight /></p>
          <p className="list" onClick={handleLogout}>로그아웃 <FaAngleRight /></p>
        </div>

        <div className="withdraw" onClick={() => openModal('회원 탈퇴')}>회원 탈퇴</div>
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
};

export default Setting;
