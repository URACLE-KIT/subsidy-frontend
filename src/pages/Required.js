import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import Modal from '../layout/Modal';

const Required = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const openModal = (content) => {
        setModalContent(content);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className="container">
                <h3>로그인이 필요합니다.</h3>
                <button className="to-login">
                    <Link to='/login'>로그인하기</Link>
                </button>
                <button className="to-signup">
                    <Link to='/signup'>회원가입하기</Link>
                </button>
                <p style={{ textAlign: 'center' }} onClick={() => openModal('비밀번호 재설정')}>비밀번호를 잊으셨나요?</p>
            </div>

            <Modal isOpen={modalOpen} onClose={closeModal}>
                {modalContent}
            </Modal>
        </>
    );
}

export default Required;
