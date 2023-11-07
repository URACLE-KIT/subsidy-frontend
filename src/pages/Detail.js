import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBookmark, FaRegBookmark, FaExternalLinkAlt, FaPencilAlt } from 'react-icons/fa';
import { BsPersonFill, BsFileText, BsGift, BsCalendar } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

import Modal from '../layout/Modal';

const Detail = () => {
  const [policy, setPolicy] = useState(null);
  const [activeTab, setActiveTab] = useState('지원대상');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [countdownLabel, setCountdownLabel] = useState('');
  const [userId, setUserId] = useState('');
  const [userScrappedPolicies, setUserScrappedPolicies] = useState([]);

  useEffect(() => {
    const storedUserId = M.data.storage('id');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    axios.get(`/v1/subsidyscraps/find/subsidyinfo?userId=${userId}`)
      .then((response) => {
        setUserScrappedPolicies(response.data);
      })
      .catch((error) => {
        console.error("스크랩된 보조금 가져오기 실패:", error);
      });
  }, [userId]);

  const location = useLocation();

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const isScrapped = (id) => {
    return userScrappedPolicies.some((policy) => policy.id === id);
  };

  const toggleBookmark = (id) => {
    const isBookmarked = isScrapped(id);

    if (isBookmarked) {
      const updatedUserScrappedPolicies = userScrappedPolicies.filter(policy => policy.id !== id);
      setUserScrappedPolicies(updatedUserScrappedPolicies);

      axios.delete(`/v1/subsidyscraps/delete?scrapId=${id}`)
        .then((response) => {
          console.log("스크랩 삭제 성공:", response);
        })
        .catch((error) => {
          console.error("스크랩 삭제 실패:", error);
        });
    } else {
      axios.post(`/v1/subsidyscraps/create?userId=${userId}&subsidyId=${id}`)
        .then((response) => {
          const updatedUserScrappedPolicies = [...userScrappedPolicies, response.data];
          setUserScrappedPolicies(updatedUserScrappedPolicies);

          console.log("스크랩 추가 성공:", response);
        })
        .catch((error) => {
          console.error("스크랩 추가 실패:", error);
        });
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const calculateCountdown = () => {
      if (policy && policy.endDate) {
        const endDate = new Date(policy.endDate);
        const currentDate = new Date();
        const timeDifference = endDate - currentDate;

        if (timeDifference > 0) {
          const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
          setCountdownLabel(`D-${daysLeft}`);
        } else if (timeDifference === 0) {
          setCountdownLabel('D-DAY');
        }
      }
    };

    calculateCountdown();
  }, [policy]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    axios
      .get(`/v1/subsidies/id?id=${id}`)
      .then((response) => {
        setPolicy(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [location.search]);

  return (
    <>
      <div className="container">
        {policy && (
          <>
            <div className="header">
              <button className="bookmark-button" onClick={toggleBookmark} style={{ boxShadow: 'none', width: 'auto', marginTop: 0 }}>
                {isScrapped(policy.id) ? <FaBookmark /> : <FaRegBookmark />}
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
          </>
        )}

        <Modal isOpen={modalOpen} onClose={closeModal}>
          {modalContent}
        </Modal>
      </div>

      {policy ? (
        <div className="tab-content">
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
              <div className="tab-panel">
                <h3>신청방법</h3>
                <p>{policy.application_process}</p>
                <p>{policy.detail_information_url}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Detail;
