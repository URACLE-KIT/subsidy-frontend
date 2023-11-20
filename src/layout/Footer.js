import { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import Modal from '../layout/Modal';

const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const location = useLocation();

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (location.pathname === "/download") {
      return null;
  }

  return (
    <>
      <footer className="footer">
        <h5>보조알리미</h5>
        <p>20' 박수현, 18' 김인찬, 17' 원종현, 18' 이찬영</p>
        <Link to='https://uracle.co.kr/'>유라클</Link>
        <p>보조알리미 v1.0</p>
        <span onClick={() => openModal('이용 약관')}>이용 약관</span>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <span onClick={() => openModal('개인정보 처리방침')}>개인정보 처리방침</span>
        <p>copyrightⓒ 2023 보조알리미 all rights deserved.</p>
      </footer>

      <Modal isOpen={modalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
};

export default Footer;