import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
const policiesData = [
  {
    id: 1,
    agency: "서민금융진흥원",
    title: "청년도약계좌",
    description: "서민금융진흥원에서 제공하는 정책입니다.",
    date: "2023-10-26",
    category: "생활안정",
    bookmarked: false,
  },
  {
    id: 2,
    agency: "보건의료",
    title: "청년도약계좌",
    description: "서민금융진흥원에서 제공하는 정책입니다.",
    date: "2023-12-01",
    category: "보건·의료",
    bookmarked: false,
  },
  {
    id: 3,
    agency: "서민금융진흥원",
    title: "청년도약계좌",
    description: "서민금융진흥원에서 제공하는 정책입니다.",
    date: "2023-12-01",
    category: "전체",
    bookmarked: false,
  },
  {
    id: 4,
    agency: "서민금융진흥원",
    title: "청년도약계좌",
    description: "서민금융진흥원에서 제공하는 정책입니다.",
    date: "2023-12-01",
    category: "전체",
    bookmarked: false,
  },
];

const Custom = () => {
  const [filter, setFilter] = useState("전체");
  const [policies, setPolicies] = useState(policiesData);

  const toggleBookmark = (id) => {
    const updatedPolicies = policies.map((policy) =>
      policy.id === id ? { ...policy, bookmarked: !policy.bookmarked } : policy
    );
    setPolicies(updatedPolicies);
  };

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

  const filteredPolicies =
    filter === "전체"
      ? policies
      : policies.filter((policy) => policy.category === filter);
  const storedCategory = JSON.parse(localStorage.getItem("category"));
  const filterOptions = ["전체"];

  
  if (storedCategory) {
    filterOptions.push(...storedCategory);
  }

  return (
    <div className="container">
      <h3>홍길동님을 위한 맞춤 정책</h3>
      <div className="filter-container">
        {filterOptions.map((option) => (
          <div
            key={option}
            className={`filter-option ${filter === option ? "active" : ""}`}
            onClick={() => setFilter(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <ul className="policy-list">
        {filteredPolicies.map((policy) => (
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
                <div className="policy-description">{policy.description}</div>
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
  );
};

export default Custom;
