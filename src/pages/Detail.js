import React, { useState, useEffect } from 'react';
import { FaBookmark, FaRegBookmark, FaShare } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

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
  const [showShareModal, setShowShareModal] = useState(false);
  const [countdownLabel, setCountdownLabel] = useState('');
  const shareableLink = `${window.location.origin}/detail/${policy.id}`;

  const toggleBookmark = () => {
    setPolicy((prevPolicy) => ({
      ...prevPolicy,
      bookmarked: !prevPolicy.bookmarked,
    }));
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  const handleCopyLink = () => {
    const input = document.createElement('input');
    input.value = shareableLink;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    alert('링크가 복사되었습니다.');
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  useEffect(() => {
    const calculateCountdown = () => {
      const endDate = new Date(policy.endDate);
      const currentDate = new Date();
      const timeDifference = endDate - currentDate;

      if (timeDifference > 0) {
        // Calculate days left
        const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        setCountdownLabel(`D-${daysLeft}`);
      } else if (timeDifference === 0) {
        setCountdownLabel('D-DAY');
      }
    };

    calculateCountdown();
  }, [policy.endDate]);

  // Check the URL for the query parameter '&latest'
  const location = useLocation();
  const isLatest = location.search.includes('latest');

  return (
    <>
      <div className="container">
        <div className="header">
          <button className="bookmark-button" onClick={toggleBookmark}>
            {policy.bookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
        <div>{policy.agency}</div>
        <div>{policy.title}</div>
        <div className="countdown">{countdownLabel}</div>
        <div>지원대상&nbsp;&nbsp; {policy.target}</div>
        <div>지원유형&nbsp;&nbsp; {policy.category}</div>
        <div>지원혜택&nbsp;&nbsp; {policy.supportBenefit}</div>
        <div className="dates">신청기간&nbsp;&nbsp; {policy.startDate}~{policy.endDate}</div>
        <button className="share-button" onClick={handleShareClick}>
          <FaShare /> 공유하기
        </button>
        <button>
          <FaShare /> 후기글 작성
        </button>
        {showShareModal && (
          <div className="share-modal">
            <h3>공유 옵션</h3>
            <p>링크 복사: {shareableLink}</p>
            <button onClick={handleCopyLink}>링크 복사</button>
            <button onClick={closeShareModal}>닫기</button>
          </div>
        )}
      </div>

      {isLatest ? (
        <div className="tab-content">
          {/* Show detail content for &latest */}
          <div className="tab-panel">상세 내용을 여기에 표시합니다.</div>
        </div>
      ) : (
        <div className="tabs">
          <button
            className={`tab ${activeTab === '지원대상' ? 'active' : ''}`}
            onClick={() => handleTabClick('지원대상')}
          >
            지원대상
          </button>
          <button
            className={`tab ${activeTab === '지원내용' ? 'active' : ''}`}
            onClick={() => handleTabClick('지원내용')}
          >
            지원내용
          </button>
          <button
            className={`tab ${activeTab === '관련정보' ? 'active' : ''}`}
            onClick={() => handleTabClick('관련정보')}
          >
            관련정보
          </button>
          <button
            className={`tab ${activeTab === '신청방법' ? 'active' : ''}`}
            onClick={() => handleTabClick('신청방법')}
          >
            신청방법
          </button>
        </div>
      )}
    </>
  );
};

export default Detail;
