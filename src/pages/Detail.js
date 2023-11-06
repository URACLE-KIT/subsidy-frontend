import React, { useState, useEffect } from 'react';
import { FaBookmark, FaRegBookmark, FaExternalLinkAlt, FaPencilAlt } from 'react-icons/fa';
import { BsPersonFill, BsFileText, BsGift, BsCalendar } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom/dist';
import Modal from '../layout/Modal';

const policiesData = [
  {
    id: 1,
    agency: "서민금융진흥원",
    title: "청년도약계좌",
    description: "서민금융진흥원에서 제공하는 정책입니다.",
    startDate: "2023-10-26",
    endDate: "2023-12-31",
    category: "서비스(의료)",
    bookmarked: false,
    target: "청년 (12~26세)",
    supportBenefit: "HPV 예방접종 및 의료비 지원",
  },
];

const Detail = () => {
  const [policy, setPolicy] = useState(policiesData[0]);
  const [activeTab, setActiveTab] = useState('지원대상');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [countdownLabel, setCountdownLabel] = useState('');

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const toggleBookmark = () => {
    setPolicy((prevPolicy) => ({
      ...prevPolicy,
      bookmarked: !prevPolicy.bookmarked,
    }));
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // const handleShareClick = () => {
  //   setShowShareModal(true);
  // };

  // const closeShareModal = () => {
  //   setShowShareModal(false);
  // };

  useEffect(() => {
    const calculateCountdown = () => {
      const endDate = new Date(policy.endDate);
      const currentDate = new Date();
      const timeDifference = endDate - currentDate;

      if (timeDifference > 0) {
        const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        setCountdownLabel(`D-${daysLeft}`);
      } else if (timeDifference === 0) {
        setCountdownLabel('D-DAY');
      }
    };

    calculateCountdown();
  }, [policy.endDate]);

  const location = useLocation();
  const isLatest = location.search.includes('latest');

  return (
    <>
      <div className="container">
        <div className="header">
          <button className="bookmark-button" onClick={toggleBookmark}
            style={{ boxShadow: 'none', width: 'auto', marginTop: 0 }}>
            {policy.bookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
        <div className="policy-agency">{policy.agency}</div>
        <div className="detail-title">{policy.title}</div>
        <div className="policy-date">{countdownLabel}</div>
        <div style={{ marginTop: '5px' }}>
          <span className="sub-title"><BsPersonFill />&nbsp;&nbsp; 지원대상</span>{policy.target}
        </div>
        <div>
          <span className="sub-title"><BsFileText />&nbsp;&nbsp; 지원유형</span>{policy.category}
        </div>
        <div>
          <span className="sub-title"><BsGift />&nbsp;&nbsp; 지원혜택</span>{policy.supportBenefit}
        </div>
        <div>
          <span className="sub-title"><BsCalendar />&nbsp;&nbsp; 신청기간</span>{policy.startDate}~{policy.endDate}
        </div>
        <button className="detail-button" onClick={() => openModal('공유하기')}>
          <FaExternalLinkAlt /> 공유하기
        </button>
        <Link to="/write?type=review">
          <button className="detail-button">
            <FaPencilAlt /> 후기글 작성
          </button>
        </Link>

        <Modal isOpen={modalOpen} onClose={closeModal}>
          {modalContent}
        </Modal>
        
        {/* {showShareModal && (
          <>
            <div className="blur" />
            <div className="modal">
              <h3>공유하기</h3>
              <p>{shareableLink}</p>
              <button onClick={handleCopyLink}>링크 복사</button>
              <button onClick={closeShareModal}>닫기</button>
            </div>
          </>
        )} */}
      </div>

      {isLatest ? (
        <div className="tab-content">
          <div className="tab-panel">상세 내용을 여기에 표시합니다.</div>
        </div>
      ) : (
        <>
          <div className="tabs">
            <button
              style={{ boxShadow: 'none', width: 'auto', marginTop: 0, borderRadius: 0 }}
              className={`tab ${activeTab === '지원대상' ? 'active' : ''}`}
              onClick={() => handleTabClick('지원대상')}
            >
              지원대상
            </button>
            <button
              style={{ boxShadow: 'none', width: 'auto', marginTop: 0, borderRadius: 0 }}
              className={`tab ${activeTab === '지원내용' ? 'active' : ''}`}
              onClick={() => handleTabClick('지원내용')}
            >
              지원내용
            </button>
            <button
              style={{ boxShadow: 'none', width: 'auto', marginTop: 0, borderRadius: 0 }}
              className={`tab ${activeTab === '관련정보' ? 'active' : ''}`}
              onClick={() => handleTabClick('관련정보')}
            >
              관련정보
            </button>
            <button
              style={{ boxShadow: 'none', width: 'auto', marginTop: 0, borderRadius: 0 }}
              className={`tab ${activeTab === '신청방법' ? 'active' : ''}`}
              onClick={() => handleTabClick('신청방법')}
            >
              신청방법
            </button>
          </div>

          <div className="tab-content">
            {activeTab === '지원대상' && (
              <div className="tab-panel">지원 대상 내용</div>
            )}
            {activeTab === '지원내용' && (
              <div className="tab-panel">지원 내용 내용</div>
            )}
            {activeTab === '관련정보' && (
              <div className="tab-panel">관련 정보 내용</div>
            )}
            {activeTab === '신청방법' && (
              <div className="tab-panel">신청 방법 내용</div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
