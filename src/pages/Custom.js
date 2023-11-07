import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Custom = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");
  const option = new URLSearchParams(location.search).get("option");
  const [filter, setFilter] = useState("전체");
  const [policies, setPolicies] = useState([]);
  const [name, setName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [filteredPolicies, setFilteredPolicies] = useState([]);

  useEffect(() => {
    const storedName = M.data.storage('name');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  useEffect(() => {
    let requestURL = "/v1/subsidies/all";

    if (search && option) {
      requestURL = `/v1/subsidies/search/${option}?${option}=${encodeURIComponent(search)}`;
    }

    axios.get(requestURL)
      .then((response) => {
        setPolicies(response.data);
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
      });
  }, [search, option]);

  useEffect(() => {
    const updatedPolicies =
      filter === "전체" ? policies : policies.filter((policy) => policy.category === filter);
    
    setFilteredPolicies(updatedPolicies);
  }, [filter, policies]);

  const storedCategory = M.data.storage("category");
  const filterOptions = ["전체"];
  if (storedCategory) {
    filterOptions.push(...storedCategory);
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers) {
      setCurrentPage(currentPage + 1);
    }
  };

  const toggleBookmark = (id) => {
    const updatedPolicies = filteredPolicies.map((policy) =>
      policy.id === id ? { ...policy, bookmarked: !policy.bookmarked } : policy
    );
    setFilteredPolicies(updatedPolicies);
  };

  const pageNumbers = Math.ceil(filteredPolicies.length / itemsPerPage);

  useEffect(() => {
    const policyDateElements = document.querySelectorAll(".policy-date");
    policyDateElements.forEach((element) => {
      const text = element.textContent;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.font = getComputedStyle(element).font;
      const textWidth = context.measureText(text).width;
      element.style.width = textWidth + "px";
    });
  }, [filteredPolicies, name, currentPage]);

  const maxPageDisplay = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPageDisplay / 2));
  const endPage = Math.min(pageNumbers, startPage + maxPageDisplay - 1);

  return (
    <div className="container">
      <h3>{name}님을 위한 맞춤 보조금</h3>
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
        {filteredPolicies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((policy) => (
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
                <div className="policy-agency">{policy.receiving_agency}</div>
                <div className="policy-title">{policy.title}</div>
                <div className="policy-description">{policy.description}</div>
                <div className="policy-date" style={{ maxWidth: "100%" }}>{policy.application_period}</div>
                <div className="policy-description">{policy.telephone_inquiry}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          className={`page-button ${currentPage === 1 ? "disabled" : ""}`}
        >
          &lsaquo;
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <button
            key={startPage + i}
            onClick={() => setCurrentPage(startPage + i)}
            className={`page-button ${currentPage === startPage + i ? "active" : ""}`}
          >
            {startPage + i}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className={`page-button ${currentPage === pageNumbers ? "disabled" : ""}`}
        >
          &rsaquo;
        </button>
      </div>
    </div>
  );
};

export default Custom;
