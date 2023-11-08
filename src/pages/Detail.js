import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBookmark, FaRegBookmark, FaExternalLinkAlt, FaPencilAlt } from 'react-icons/fa';
import { BsBriefcase, BsTelephone, BsBoxArrowUpRight, BsLink45Deg, BsPersonFill, BsFileText, BsGift, BsCalendar } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

import Modal from '../layout/Modal';

const Detail = () => {
  const [policy, setPolicy] = useState(null);
  const [activeTab, setActiveTab] = useState('신청정보');
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
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

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

  const toggleBookmark = () => {
    const isBookmarked = isScrapped(id);

    if (isBookmarked) {
      const updatedUserScrappedPolicies = userScrappedPolicies.filter(policy => policy.id !== id);
      setUserScrappedPolicies(updatedUserScrappedPolicies);
    } else {
      const newPolicy = { id: id, title: "", description: "" };
      const updatedUserScrappedPolicies = [...userScrappedPolicies, newPolicy];
      setUserScrappedPolicies(updatedUserScrappedPolicies);
    }

    if (isBookmarked) {
      axios
        .delete(`/v1/subsidyscraps/deleteBySubsidyId?subsidyId=${id}`)
        .then((response) => {
          console.log("스크랩 삭제 성공:", response);
        })
        .catch((error) => {
          console.error("스크랩 삭제 실패:", error);
        });
    } else {
      axios
        .post(`/v1/subsidyscraps/create?userId=${userId}&subsidyId=${id}`)
        .then((response) => {
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
              <div className='views'>
                조회수 {policy.views}
              </div>
              <button className="bookmark-button" onClick={toggleBookmark} style={{ boxShadow: 'none', width: 'auto', marginTop: '-50px' }}>
                {isScrapped(id) ? <FaBookmark /> : <FaRegBookmark />}
              </button>
              <div className="detail-title">{policy.title}</div>
              <button className="detail-button" onClick={() => openModal('공유하기')}>
                <FaExternalLinkAlt /> 공유하기
              </button>
              <Link to="/write?type=review">
                <button className="detail-button">
                  <FaPencilAlt /> 후기글 작성
                </button>
              </Link>
            </div>
          </>
        )}

        <Modal isOpen={modalOpen} onClose={closeModal}>
          {modalContent}
        </Modal>
      </div>

      {policy ? (
        <>
          <div className="tabs">
            <button
              style={{ boxShadow: 'none', width: 'auto', marginTop: 0, borderRadius: 0 }}
              className={`tab ${activeTab === '신청정보' ? 'active' : ''}`}
              onClick={() => handleTabClick('신청정보')}
            >
              신청정보
            </button>
            <button
              style={{ boxShadow: 'none', width: 'auto', marginTop: 0, borderRadius: 0 }}
              className={`tab ${activeTab === '신청문의' ? 'active' : ''}`}
              onClick={() => handleTabClick('신청문의')}
            >
              신청문의
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
            {activeTab === '신청정보' && (
              <div className="tab-panel">
                <h3>신청정보</h3>
                <div className='tab-item'>
                  <span className="sub-title"><BsCalendar />&nbsp;&nbsp; 신청기간</span>{policy.application_period}
                </div>
                <div className='tab-item'>
                  <span className="sub-title"><BsGift />&nbsp;&nbsp; 지원형태</span>{policy.support_type}
                </div>
              </div>
            )}
            {activeTab === '신청문의' && (
              <div className="tab-panel">
                <h3>신청문의</h3>

                <div className='tab-item'>
                  <span className="sub-title"><BsTelephone />&nbsp;&nbsp; 전화문의</span>{policy.telephone_inquiry}
                </div>
              </div>
            )}
            {activeTab === '관련정보' && (
              <div className="tab-panel">
                <h3>관련정보</h3>

                <div className='tab-item'>
                  <span className="sub-title"><BsFileText />&nbsp;&nbsp; 카테고리</span>{policy.category}
                </div>
                <div className='tab-item'>
                  <span className="sub-title"><BsLink45Deg />&nbsp;&nbsp; 상세정보</span>
                  <Link to={policy.detail_information_url}>바로가기 <BsBoxArrowUpRight /></Link>
                </div>
              </div>
            )}
            {activeTab === '신청방법' && (
              <div className="tab-panel">
                <h3>신청방법</h3>
                <div className='tab-item'>
                  <span className="sub-title"><BsPersonFill />&nbsp;&nbsp; 신청방법</span>
                  <Link to={policy.application_process_url}>{policy.application_process} <BsBoxArrowUpRight /></Link>
                </div>
                <div className='tab-item'>
                  <span className="sub-title"><BsBriefcase />&nbsp;&nbsp; 접수기관</span>
                  {policy.receiving_agency}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Detail;
