import React, { useState, useEffect } from "react";
import {
  FaBookmark,
  FaRegBookmark,
  FaExternalLinkAlt,
  FaPencilAlt,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { BsPersonFill, BsFileText, BsGift, BsCalendar } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";

const policiesData = [
  {
    id: 1,
    agency: "서민금융진흥원",
    title: "청년도약계좌",
    description: "서민금융진흥원에서 제공하는 정책입니다.",
    date: "2023-10-26",
    category: "전체",
    bookmarked: true,
  },
  {
    id: 2,
    agency: "서민금융진흥원",
    title: "청년도약계좌",
    description: "서민금융진흥원에서 제공하는 정책입니다.",
    date: "2023-12-01",
    category: "전체",
    bookmarked: true,
  },
  {
    id: 3,
    agency: "서민금융진흥원",
    title: "청년도약계좌",
    description: "서민금융진흥원에서 제공하는 정책입니다.",
    date: "2023-12-01",
    category: "전체",
    bookmarked: true,
  },
  {
    id: 4,
    agency: "서민금융진흥원",
    title: "청년도약계좌",
    description: "서민금융진흥원에서 제공하는 정책입니다.",
    date: "2023-12-01",
    category: "전체",
    bookmarked: true,
  },
];

const Mypage = () => {
  const [activeTab, setActiveTab] = useState("스크랩");
  const [policies, setPolicies] = useState(policiesData);
  const navigate = useNavigate();

  // useEffect(() => {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //         navigate('/required');
  //     }
  // }, []);

  const toggleBookmark = (id) => {
    const updatedPolicies = policies.map((policy) =>
      policy.id === id ? { ...policy, bookmarked: !policy.bookmarked } : policy
    );
    setPolicies(updatedPolicies);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const location = useLocation();

  const calculateDaysRemaining = (date) => {
    const currentDate = new Date();
    const policyDate = new Date(date);
    const timeDifference = policyDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (daysRemaining < 0) {
      return `D+${Math.abs(daysRemaining)}`;
    } else if (daysRemaining === 0) {
      return "D-DAY";
    } else {
      return `D-${daysRemaining}`;
    }
  };

  return (
    <>
      <div className="container" style={{ padding: "30px 20px" }}>
        <div className="header">
          <Link to="/setting">
            <FiSettings className="setting-button" />
          </Link>
        </div>
        <span className="name">홍길동님</span>
        <div>
          <Link to="/profile">
            <span className="sub-title">
              프로필 수정 <FaPencilAlt />
            </span>
          </Link>
        </div>
        <div className="mycount">
          <Link to="/custom">
            <span>
              맞춤 정책
              <br />
              <p className="num">56</p>
            </span>
          </Link>
          <span className="line" onClick={() => handleTabClick("스크랩")}>
            스크랩
            <br />
            <p className="num">5</p>
          </span>
          <span onClick={() => handleTabClick("작성 댓글")}>
            작성 댓글
            <br />
            <p className="num">0</p>
          </span>
        </div>
        <button className="custom-button">
          <Link to="/mycustom">내 맞춤정보</Link>
        </button>
      </div>

      <div className="tabs">
        <button
          style={{
            boxShadow: "none",
            width: "auto",
            marginTop: 0,
            borderRadius: 0,
          }}
          className={`tab ${activeTab === "스크랩" ? "active" : ""}`}
          onClick={() => handleTabClick("스크랩")}
        >
          스크랩
        </button>
        <button
          style={{
            boxShadow: "none",
            width: "auto",
            marginTop: 0,
            borderRadius: 0,
          }}
          className={`tab ${activeTab === "작성 글" ? "active" : ""}`}
          onClick={() => handleTabClick("작성 글")}
        >
          작성 글
        </button>
        <button
          style={{
            boxShadow: "none",
            width: "auto",
            marginTop: 0,
            borderRadius: 0,
          }}
          className={`tab ${activeTab === "작성 댓글" ? "active" : ""}`}
          onClick={() => handleTabClick("작성 댓글")}
        >
          작성 댓글
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "스크랩" && (
          <div className="tab-panel">
            <ul className="policy-list">
              {policiesData.map((policy) => (
                <li key={policy.id} className="policy-item">
                  <Link to={`/detail?id=${policy.id}`}>
                    <button
                      style={{ boxShadow: "none", width: "auto", marginTop: 0 }}
                      className="bookmark-button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleBookmark(policy.id);
                      }}
                    >
                      {policy.bookmarked ? <FaBookmark /> : <FaRegBookmark />}
                    </button>
                    <div className="policy-details">
                      <div className="policy-agency">{policy.agency}</div>
                      <div className="policy-description">
                        {policy.description}
                      </div>
                      <span className="policy-date">
                        {calculateDaysRemaining(policy.date)}
                      </span>
                      <span className="policy-title">{policy.title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === "작성 글" && (
          <div className="tab-panel">작성 글 내용</div>
        )}
        {activeTab === "작성 댓글" && (
          <div className="tab-panel">작성 댓글 내용</div>
        )}
      </div>
    </>
  );
};

export default Mypage;
