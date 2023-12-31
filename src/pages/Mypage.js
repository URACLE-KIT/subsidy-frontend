import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBookmark, FaRegBookmark, FaRegEye, FaPencilAlt } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Mypage = () => {
  const [activeTab, setActiveTab] = useState("스크랩");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userScrappedPolicies, setUserScrappedPolicies] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [policiesAll, setPoliciesAll] = useState([]);
  const [category, setCategory] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewcomments, setReviewcomments] = useState([]);

  var total = 0;
  var filteredPolicies = [];
  var count = [];
  category.map((c) =>
    filteredPolicies.push(policiesAll.filter((policy) => policy.category === c))
  );
  filteredPolicies.map((fp) => count.push(fp.length));
  count.map((count) => (total += count));

  useEffect(() => {
    const storedName = M.data.storage("name");
    const token = M.data.storage("token");
    if (!token) {
      navigate("/required");
    }
    if (storedName) {
      setName(storedName);
    }

    const storedUserId = M.data.storage("id");
    if (storedUserId) {
      setUserId(storedUserId);
    }

    axios
      .get("/v1/subsidies/all")
      .then((response) => {
        setPoliciesAll(response.data);
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
      });
  }, []);

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
        setCategory(response.data);
      })
      .catch((error) => {
        console.error("카테고리 가져오기 실패:", error);
      });

    axios
      .get(`/v1/subsidies-review/search/userId?userId=${userId}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("내가 작성한 후기 데이터 가져오기 실패:", error);
      });

    axios
      .get(`/v1/subsidy-reviewcomments/search/userId?userId=${userId}`)
      .then((response) => {
        setReviewcomments(response.data);
      })
      .catch((error) => {
        console.error("내가 작성한 댓글 데이터 가져오기 실패:", error);
      });
  }, [userId]);

  useEffect(() => {
    const scrappedPolicies = userScrappedPolicies.map((policy) => {
      return {
        id: policy.id,
        agency: policy.receiving_agency,
        title: policy.title,
        description: policy.description,
        date: policy.application_period,
        category: "전체",
        bookmarked: true,
      };
    });
    setPolicies(scrappedPolicies);
  }, [userScrappedPolicies]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
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
          const updatedUserScrappedPolicies = [
            ...userScrappedPolicies,
            response.data,
          ];
          setUserScrappedPolicies(updatedUserScrappedPolicies);

          console.log("스크랩 추가 성공:", response);
        })
        .catch((error) => {
          console.error("스크랩 추가 실패:", error);
        });
    }
  };

  const sanitizeHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateString).toLocaleString("ko-KR", options);
  };

  return (
    <>
      <div className="container" style={{ padding: "30px 20px" }}>
        <div className="header">
          <Link to="/setting">
            <FiSettings className="setting-button" />
          </Link>
        </div>
        <span className="name">{name}님</span>
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
              맞춤보조금
              <br />
              <p className="num">{total}</p>
            </span>
          </Link>
          <span
            style={{ borderLeft: "1px solid #999" }}
            onClick={() => handleTabClick("스크랩")}
          >
            스크랩
            <br />
            <p className="num">{userScrappedPolicies.length}</p>
          </span>
          <span
            style={{ borderLeft: "1px solid #999" }}
            onClick={() => handleTabClick("작성 글")}
          >
            작성 글
            <br />
            <p className="num">{reviews.length}</p>
          </span>
          <span
            style={{ borderLeft: "1px solid #999" }}
            onClick={() => handleTabClick("작성 댓글")}
          >
            작성 댓글
            <br />
            <p className="num">{reviewcomments.length}</p>
          </span>
        </div>
        <button className="custom-button">
          <Link to="/mycustom">내 맞춤 카테고리</Link>
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
            {userScrappedPolicies.length === 0 ? (
              <>
                <p style={{ textAlign: "center" }}>
                  관심 정책의 스크랩 버튼을 누르면 <br /> 원하는 정책을 저장하고
                  관리할 수 있어요.
                </p>
                <div style={{ textAlign: "center" }}>
                  <img
                    src="/image2.jpg"
                    style={{ width: "300px", height: "400px" }}
                  />
                </div>
              </>
            ) : (
              <ul className="policy-list">
                {policies.map((policy) => (
                  <li key={policy.id} className="policy-item">
                    <Link to={`/detail?id=${policy.id}`}>
                      <button
                        style={{
                          boxShadow: "none",
                          width: "auto",
                          marginTop: 0,
                        }}
                        className="bookmark-button"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleBookmark(policy.id);
                        }}
                      >
                        {isScrapped(policy.id) ? (
                          <FaBookmark />
                        ) : (
                          <FaRegBookmark />
                        )}
                      </button>
                      <div className="policy-details">
                        <div className="policy-title">{policy.title}</div>
                        <div className="policy-description">
                          {policy.description}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {activeTab === "작성 글" && (
          <div className="tab-panel">
            {reviews.length === 0 ? (
              <>
                <p style={{ textAlign: "center" }}>
                  작성한 후기가 없습니다.
                  <br />
                  지원금을 받고 후기를 남겨주세요.
                </p>
                <div style={{ textAlign: "center" }}>
                  <img
                    src="/image3.jpg"
                    style={{ width: "300px", height: "400px" }}
                  />
                </div>
              </>
            ) : (
              <ul className="policy-list" style={{ textAlign: "left" }}>
                {reviews.map((review) => (
                  <li key={review.id} className="policy-item">
                    <Link to={`/detail?id=${review.id}&review`}>
                      <div className="policy-details">
                        <div>
                          <div className="policy-title">{review.title}</div>
                          <div className="policy-description">
                            {sanitizeHtml(review.content)}
                          </div>
                          <div className="myreview-bottom">
                            <div className="latest-date">
                              <span style={{ color: "#999" }}>
                                {formatDate(review.updated_at)}
                              </span>
                            </div>
                            <div className="myreview-views"><FaRegEye /> {review.views}</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {activeTab === "작성 댓글" && (
          <div className="tab-panel">
            {reviewcomments.length === 0 ? (
              <>
                <p style={{ textAlign: "center" }}>
                  작성한 댓글이 없습니다.
                  <br />
                  마음에 드는 후기글에 댓글을 남겨주세요.
                </p>
                <div style={{ textAlign: "center" }}>
                  <img
                    src="/image4.jpg"
                    style={{ width: "300px", height: "250px" }}
                  />
                </div>
              </>
            ) : (
              <ul className="policy-list" style={{ textAlign: "left" }}>
                {reviewcomments.map((comment) => (
                  <div key={comment.id} className="policy-item">
                    <Link to={`/detail?id=${comment.reviews.id}&review`}>
                      <div className="comment-details">
                        <div className="policy-title">
                          {sanitizeHtml(comment.content)}
                        </div>
                        <div className="latest-date">
                              <span style={{ color: "#999" }}>
                                {formatDate(comment.updated_at)}
                              </span>
                            </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Mypage;
