import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaBookmark, FaRegBookmark, FaRegEye, FaRegCommentDots } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Custom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");
  const option = new URLSearchParams(location.search).get("option");
  const [filter, setFilter] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [sortOption, setSortOption] = useState("기본순");
  const [userScrappedPolicies, setUserScrappedPolicies] = useState([]);
  const [storedCategory, setStoredCategory] = useState([]);

  useEffect(() => {

    const storedToken = M.data.storage("token");
    if (!storedToken) {
      navigate("/required");
      
      return;
    }

    const storedName = M.data.storage('name');

    if (storedName) {
      setName(storedName);
    }

    const storedUserId = M.data.storage("id");
    if (storedUserId) {
      setUserId(storedUserId);
    }

  }, [navigate]);


  useEffect(() => {
    axios
      .get(`/v1/subsidyscraps/search/subsidyinfo?userId=${userId}`)
      .then((response) => {
        setUserScrappedPolicies(response.data);
      })
      .catch((error) => {
        console.error("스크랩된 보조금 가져오기 실패:", error);
      });

    axios
      .get(`/v1/users/category-list?userId=${userId}`)
      .then((response) => {
        setStoredCategory(response.data);
      })
      .catch((error) => {
        console.error("카테고리 가져오기 실패:", error);
      });
  }, [userId]);

  useEffect(()=>{
    if (storedCategory) {
      setFilter(storedCategory[0]);
    }
  }, [storedCategory]);
  
  useEffect(() => {
    let requestURL = "/v1/subsidies/all";

    if (search && option) {
      requestURL = `/v1/subsidies/search/${option}?${option}=${encodeURIComponent(
        search
      )}`;
    }

    axios
      .get(requestURL)
      .then((response) => {
        setPolicies(response.data);
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
      });
  }, [search, option]);

  useEffect(() => {
    const updatedPolicies = policies.filter(
      (policy) => policy.category === filter
    );
    setFilteredPolicies(updatedPolicies);
  }, [filter, policies]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1);
  };

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

  const isScrapped = (id) => {
    return userScrappedPolicies.some((policy) => policy.id === id);
  };

  const toggleBookmark = (id) => {
    const isBookmarked = isScrapped(id);

    if (isBookmarked) {
      const updatedUserScrappedPolicies = userScrappedPolicies.filter(
        (policy) => policy.id !== id
      );
      setUserScrappedPolicies(updatedUserScrappedPolicies);
    } else {
      const newPolicy = { id: id, title: "", description: "" };
      const updatedUserScrappedPolicies = [...userScrappedPolicies, newPolicy];
      setUserScrappedPolicies(updatedUserScrappedPolicies);
    }

    if (isBookmarked) {
      axios
        .delete(`/v1/subsidyscraps/delete?subsidyId=${id}`)
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

  const sortPolicies = () => {
    const policiesCopy = [...filteredPolicies];

    policiesCopy.sort((a, b) => {
      if (sortOption === "기본순") {
        return a.id - b.id;
      }

      if (sortOption === "제목순") {
        return a.title.localeCompare(b.title);
      }

      if (sortOption === "조회수순") {
        return b.views - a.views;
      }

      if (sortOption === "후기순") {
        return b.numReviews - a.numReviews;
      }
    });

    setFilteredPolicies(policiesCopy);
  };

  useEffect(() => {
    sortPolicies();
  }, [sortOption]);

  return (
    <div className="container">
      <h3>{name}님을 위한 맞춤 보조금</h3>
      <div className="filter-container">
        {storedCategory.map((option) => (
          <div
            key={option}
            className={`filter-option ${filter === option ? "active" : ""}`}
            onClick={() => setFilter(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <select
        id="filterSelect"
        value={sortOption}
        onChange={handleSortChange}
        style={{ marginTop: "20px" }}
      >
        <option value="기본순">기본순</option>
        <option value="제목순">제목순</option>
        <option value="조회수순">조회수순</option>
        <option value="후기순">후기순</option>
      </select>
      <ul className="policy-list">
        {filteredPolicies
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((policy) => (
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
                  {isScrapped(policy.id) ? <FaBookmark /> : <FaRegBookmark />}
                </button>
                <div className="policy-details">
                  <div className="policy-agency">{policy.receiving_agency}</div>
                  <div className="policy-title">{policy.title}</div>
                  <div className="policy-description">{policy.description}</div>
                  <div className="policy-date" style={{ maxWidth: "100%" }}>
                    {policy.application_period}
                  </div>
                  <div className="policy-description">
                    <FaRegEye /> {policy.views}&nbsp;&nbsp;&nbsp;
                    <FaRegCommentDots /> {policy.numReviews}{}
                  </div>
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
            className={`page-button ${
              currentPage === startPage + i ? "active" : ""
            }`}
          >
            {startPage + i}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className={`page-button ${
            currentPage === pageNumbers ? "disabled" : ""
          }`}
        >
          &rsaquo;
        </button>
      </div>
    </div>
  );
};

export default Custom;
