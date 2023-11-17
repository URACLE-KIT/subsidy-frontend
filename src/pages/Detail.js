import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaBookmark,
  FaRegBookmark,
  FaExternalLinkAlt,
  FaPencilAlt,
  FaRegEye,
  FaRegCommentDots,
  FaRegTrashAlt,
  FaHeart,
  FaRegHeart,
  FaEllipsisV,
  FaTimes,
} from "react-icons/fa";
import {
  BsBriefcase,
  BsTelephone,
  BsBoxArrowUpRight,
  BsLink45Deg,
  BsPersonFill,
  BsFileText,
  BsGift,
  BsCalendar,
  BsArrowUp,
  BsArrowDown,
} from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../layout/Modal";

const Detail = () => {
  const [policy, setPolicy] = useState(null);
  const [review, setReview] = useState(null);
  const [activeTab, setActiveTab] = useState("신청정보");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [userId, setUserId] = useState("");
  const [userScrappedPolicies, setUserScrappedPolicies] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [editCommentId, setEditCommentId] = useState(null);
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [commentOptionsVisible, setCommentOptionsVisible] = useState(false);
  const navigate = useNavigate();

  const handleToggleCommentOptions = (commentId) => {
    setCommentOptionsVisible((prevCommentId) =>
      prevCommentId === commentId ? null : commentId
    );
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const handleGetComment = () => {
    const subsidyReviewId = searchParams.get("id");

    axios
      .get(
        `/v1/subsidy-reviewcomments/search/subsidyReviewId?subsidyReviewId=${subsidyReviewId}`
      )
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (commentId, commentContent) => {
    setEditingCommentId(commentId);
    setEditedComment(commentContent);
  };

  const handleDeleteReview = async () => {
    const subsidyReviewId = searchParams.get("id");
    try {
      await axios.delete(
        `/v1/subsidies-review/delete?reviewId=${subsidyReviewId}`
      );
      await axios.put(
        `/v1/subsidies/decrement-numReviews?id=${review.subsidy.id}`
      );

      M.pop.alert("삭제가 완료되었습니다.");
      navigate("/review");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = (commentId) => {
    setEditingCommentId(null);
    setEditedComment("");
    setCommentOptionsVisible(false);
  };

  const handleSaveEdit = (commentId) => {
    axios
      .patch(`/v1/subsidy-reviewcomments/update?commentId=${commentId}`, {
        content: editedComment,
      })
      .then((response) => {
        console.log("댓글 수정 성공:", response);
        setEditCommentId(null);
        setEditedComment("");
        handleGetComment();
        M.pop.alert("댓글 수정이 완료되었습니다.");
        handleCancelEdit();
      })
      .catch((error) => {
        console.error("댓글 수정 실패:", error);
      });
  };

  const handleDelete = (commentId) => {
    axios
      .delete(`/v1/subsidy-reviewcomments/delete?commentId=${commentId}`)
      .then((response) => {
        M.pop.alert("댓글 삭제가 완료되었습니다.");
        handleGetComment();
      })
      .catch((error) => {
        M.pop.alert("실패");
        console.error(error);
      });

    axios
      .put(`/v1/subsidies-review/decrement-numComments?id=${id}`)
      .then((response) => {
        console.log("댓글수 감소 성공:", response);
        handleGetComment();
      })
      .catch((error) => {
        console.error("댓글수 감소 실패:", error);
      });
  };

  const submitComment = () => {
    axios
      .post(
        `/v1/subsidy-reviewcomments/create?userId=${M.data.storage(
          "id"
        )}&reviewId=${id}`,
        {
          content: comment,
        }
      )
      .then((response) => {
        // console.log(response);
        setComment("");
        handleGetComment();
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .put(`/v1/subsidies-review/increment-numComments?id=${id}`)
      .then((response) => {
        console.log("댓글수 증가 성공:", response);
      })
      .catch((error) => {
        console.error("댓글수 증가 실패:", error);
      });
  };

  useEffect(() => {
    const storedUserId = M.data.storage("id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    handleGetComment();
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
  }, [userId]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  console.log("1");

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const isScrapped = (title) => {
    return userScrappedPolicies.some((policy) => policy.title === title);
  };

  const toggleBookmark = () => {
    const isBookmarked = isScrapped(policy.title);

    if (isBookmarked) {
      const updatedUserScrappedPolicies = userScrappedPolicies.filter(
        (policy) => policy.title !== policy.title
      );
      setUserScrappedPolicies(updatedUserScrappedPolicies);
    } else {
      const newPolicy = {
        id: policy.id,
        title: policy.title,
        description: policy.description,
      };
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

  const toggleLike = () => {
    if (!isLiked) {
      if (userId) {
        axios
          .put(`/v1/subsidies-review/increment-likes?id=${id}`)
          .then((response) => {
            setIsLiked(true);
            setLikes(likes + 1);
            console.log("좋아요 증가 성공:", response);
          })
          .catch((error) => {
            console.error("좋아요 증가 실패:", error);
          });
      } else {
        M.pop.alert("로그인한 사용자만 이용할 수 있는 기능입니다.");
      }
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString("ko-KR", options);
  };

  useEffect(() => {
    const isReview = searchParams.get("review");

    if (isReview !== null) {
      axios
        .get(`/v1/subsidies-review/search/reviewId?reviewId=${id}`)
        .then((response) => {
          // console.log(response.data);
          setReview(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      // 리뷰 조회수 증가
      axios
        .put(`/v1/subsidies-review/increment-views?id=${id}`)
        .then((response) => {
          console.log("조회 수 증가 성공:", response);
        })
        .catch((error) => {
          console.error("조회 수 증가 실패:", error);
        });
    } else {
      setReview(null);

      axios
        .get(`/v1/subsidies/subsidyId?id=${id}`)
        .then((response) => {
          setPolicy(response.data);
          console.log("2");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [location.search]);

  useEffect(() => {
    if (policy && policy.category) {

      const isReview = searchParams.get("review");
      if (isReview !== null) {
      } else {
        // 보조금 조회수 증가 - 일반
        axios
          .put(`/v1/subsidies/increment-views?id=${id}`)
          .then((response) => {
            console.log("조회 수 증가 성공:", response);
          })
          .catch((error) => {
            console.error("조회 수 증가 실패:", error);
          });

        // 보조금 조회수 증가 - 이번주
        axios
          .post(`/v1/subsidyViewRankings/increment-views?subsidyId=${id}`)
          .then((response) => {
            console.log("이번주 조회 수 증가 성공:", response);
          })
          .catch((error) => {
            console.error("이번주 조회 수 증가 실패:", error);
          });

        const lifecycle = M.data.storage("lifecycle");
        // 보조금 조회수 증가 - 청소년
        if (lifecycle === "Teenager") {
          axios
            .post(
              `/v1/subsidyTeenagerViewRankings/increment-views?subsidyId=${id}`
            )
            .then((response) => {
              console.log("청소년 조회 수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청소년 조회 수 증가 실패:", error);
            });
        }

        // 보조금 조회수 증가 - 청년
        if (lifecycle === "Youth") {
          axios
            .post(
              `/v1/subsidyYouthViewRankings/increment-views?subsidyId=${id}`
            )
            .then((response) => {
              console.log("청년 조회 수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청년 조회 수 증가 실패:", error);
            });
        }

        // 보조금 조회수 증가 - 중년
        if (lifecycle === "MiddleAge") {
          axios
            .post(
              `/v1/subsidyMiddleAgeViewRankings/increment-views?subsidyId=${id}`
            )
            .then((response) => {
              console.log("청년 조회 수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청년 조회 수 증가 실패:", error);
            });
        }

        // 보조금 조회수 증가 - 장년
        if (lifecycle === "Senior") {
          axios
            .post(
              `/v1/subsidySeniorViewRankings/increment-views?subsidyId=${id}`
            )
            .then((response) => {
              console.log("장년 조회 수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("장년 조회 수 증가 실패:", error);
            });
        }

        // 보조금 조회수 증가 - 노년
        if (lifecycle === "Elderly") {
          axios
            .post(
              `/v1/subsidyElderlyViewRankings/increment-views?subsidyId=${id}`
            )
            .then((response) => {
              console.log("노년 조회 수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("노년 조회 수 증가 실패:", error);
            });
        }

        const gender = M.data.storage("gender");
        // 보조금 조회수 증가 - 여성
        if (gender === "F") {
          axios
            .post(
              `/v1/subsidyFemaleViewRankings/increment-views?subsidyId=${id}`
            )
            .then((response) => {
              console.log("여성 조회 수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("여성 조회 수 증가 실패:", error);
            });
        }

        // 보조금 조회수 증가 - 남성
        if (gender === "M") {
          axios
            .post(`/v1/subsidyMaleViewRankings/increment-views?subsidyId=${id}`)
            .then((response) => {
              console.log("남성 조회 수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("남성 조회 수 증가 실패:", error);
            });
        }

        const maritalStatus = M.data.storage("maritalStatus");
        // 보조금 조회수 증가 - 기혼
        if (maritalStatus === "M") {
          axios
            .post(
              `/v1/subsidyMarriedViewRankings/increment-views?subsidyId=${id}`
            )
            .then((response) => {
              console.log("기혼 조회 수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("기혼 조회 수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청소년 && 생활안정
        if (lifecycle === "Teenager" && policy.category === "생활안정") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/teenager/daily-safety?id=1`
            )
            .then((response) => {
              console.log("청소년 && 생활안정 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청소년 && 생활안정 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청소년 && 주거자립
        if (lifecycle === "Teenager" && policy.category === "주거자립") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/teenager/housing-self-reliance?id=1`
            )
            .then((response) => {
              console.log("청소년 && 주거자립 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청소년 && 주거자립 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청소년 && 보육교육
        if (lifecycle === "Teenager" && policy.category === "보육교육") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/teenager/child-care-education?id=1`
            )
            .then((response) => {
              console.log("청소년 && 보육교육 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청소년 && 보육교육 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청소년 && 고용창업
        if (lifecycle === "Teenager" && policy.category === "고용창업") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/teenager/employment-entrepreneurship?id=1`
            )
            .then((response) => {
              console.log("청소년 && 고용창업 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청소년 && 고용창업 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청소년 && 보건의료
        if (lifecycle === "Teenager" && policy.category === "보건의료") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/teenager/health-care?id=1`
            )
            .then((response) => {
              console.log("청소년 && 보건의료 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청소년 && 보건의료 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청소년 && 행정안전
        if (lifecycle === "Teenager" && policy.category === "행정안전") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/teenager/admin-strative-safety?id=1`
            )
            .then((response) => {
              console.log("청소년 && 행정안전 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청소년 && 행정안전 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청소년 && 임신출산
        if (lifecycle === "Teenager" && policy.category === "임신출산") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/teenager/pregnancy-childbirth?id=1`
            )
            .then((response) => {
              console.log("청소년 && 임신출산 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청소년 && 임신출산 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청소년 && 보호돌봄
        if (lifecycle === "Teenager" && policy.category === "보호돌봄") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/teenager/protective-care?id=1`
            )
            .then((response) => {
              console.log("청소년 && 보호돌봄 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청소년 && 보호돌봄 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청소년 && 문화환경
        if (lifecycle === "Teenager" && policy.category === "문화환경") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/teenager/cultural-environment?id=1`
            )
            .then((response) => {
              console.log("청소년 && 문화환경 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청소년 && 문화환경 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청소년 && 농림축산 어업
        if (lifecycle === "Teenager" && policy.category === "농림축산 어업") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/teenager/agriculture-livestock-fisheries?id=1`
            )
            .then((response) => {
              console.log(
                "청소년 && 농림축산 어업 조회수 증가 성공:",
                response
              );
            })
            .catch((error) => {
              console.error("청소년 && 농림축산 어업 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청년 && 생활안정
        if (lifecycle === "Youth" && policy.category === "생활안정") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/youth/daily-safety?id=1`
            )
            .then((response) => {
              console.log("청년 && 생활안정 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청년 && 생활안정 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청년 && 주거자립
        if (lifecycle === "Youth" && policy.category === "주거자립") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/youth/housing-self-reliance?id=1`
            )
            .then((response) => {
              console.log("청년 && 주거자립 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청년 && 주거자립 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청년 && 보육교육
        if (lifecycle === "Youth" && policy.category === "보육교육") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/youth/child-care-education?id=1`
            )
            .then((response) => {
              console.log("청년 && 보육교육 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청년 && 보육교육 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청년 && 고용창업
        if (lifecycle === "Youth" && policy.category === "고용창업") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/youth/employment-entrepreneurship?id=1`
            )
            .then((response) => {
              console.log("청년 && 고용창업 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청년 && 고용창업 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청년 && 보건의료
        if (lifecycle === "Youth" && policy.category === "보건의료") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/youth/health-care?id=1`
            )
            .then((response) => {
              console.log("청년 && 보건의료 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청년 && 보건의료 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청년 && 행정안전
        if (lifecycle === "Youth" && policy.category === "행정안전") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/youth/admin-strative-safety?id=1`
            )
            .then((response) => {
              console.log("청년 && 행정안전 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청년 && 행정안전 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청년 && 임신출산
        if (lifecycle === "Youth" && policy.category === "임신출산") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/youth/pregnancy-childbirth?id=1`
            )
            .then((response) => {
              console.log("청년 && 임신출산 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청년 && 임신출산 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청년 && 보호돌봄
        if (lifecycle === "Youth" && policy.category === "보호돌봄") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/youth/protective-care?id=1`
            )
            .then((response) => {
              console.log("청년 && 보호돌봄 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청년 && 보호돌봄 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청년 && 문화환경
        if (lifecycle === "Youth" && policy.category === "문화환경") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/youth/cultural-environment?id=1`
            )
            .then((response) => {
              console.log("청년 && 문화환경 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청년 && 문화환경 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 청년 && 농림축산 어업
        if (lifecycle === "Youth" && policy.category === "농림축산 어업") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/youth/agriculture-livestock-fisheries?id=1`
            )
            .then((response) => {
              console.log("청년 && 농림축산 어업 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("청년 && 농림축산 어업 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 중년 && 생활안정
        if (lifecycle === "MiddleAge" && policy.category === "생활안정") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/middle-age/daily-safety?id=1`
            )
            .then((response) => {
              console.log("중년 && 생활안정 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("중년 && 생활안정 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 중년 && 주거자립
        if (lifecycle === "MiddleAge" && policy.category === "주거자립") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/middle-age/housing-self-reliance?id=1`
            )
            .then((response) => {
              console.log("중년 && 주거자립 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("중년 && 주거자립 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 중년 && 보육교육
        if (lifecycle === "MiddleAge" && policy.category === "보육교육") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/middle-age/child-care-education?id=1`
            )
            .then((response) => {
              console.log("중년 && 보육교육 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("중년 && 보육교육 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 중년 && 고용창업
        if (lifecycle === "MiddleAge" && policy.category === "고용창업") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/middle-age/employment-entrepreneurship?id=1`
            )
            .then((response) => {
              console.log("중년 && 고용창업 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("중년 && 고용창업 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 중년 && 보건의료
        if (lifecycle === "MiddleAge" && policy.category === "보건의료") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/middle-age/health-care?id=1`
            )
            .then((response) => {
              console.log("중년 && 보건의료 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("중년 && 보건의료 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 중년 && 행정안전
        if (lifecycle === "MiddleAge" && policy.category === "행정안전") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/middle-age/admin-strative-safety?id=1`
            )
            .then((response) => {
              console.log("중년 && 행정안전 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("중년 && 행정안전 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 중년 && 임신출산
        if (lifecycle === "MiddleAge" && policy.category === "임신출산") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/middle-age/pregnancy-childbirth?id=1`
            )
            .then((response) => {
              console.log("중년 && 임신출산 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("중년 && 임신출산 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 중년 && 보호돌봄
        if (lifecycle === "MiddleAge" && policy.category === "보호돌봄") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/middle-age/protective-care?id=1`
            )
            .then((response) => {
              console.log("중년 && 보호돌봄 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("중년 && 보호돌봄 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 중년 && 문화환경
        if (lifecycle === "MiddleAge" && policy.category === "문화환경") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/middle-age/cultural-environment?id=1`
            )
            .then((response) => {
              console.log("중년 && 문화환경 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("중년 && 문화환경 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 중년 && 농림축산 어업
        if (lifecycle === "MiddleAge" && policy.category === "농림축산 어업") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/middle-age/agriculture-livestock-fisheries?id=1`
            )
            .then((response) => {
              console.log("중년 && 농림축산 어업 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("중년 && 농림축산 어업 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 장년 && 생활안정
        if (lifecycle === "Senior" && policy.category === "생활안정") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/senior/daily-safety?id=1`
            )
            .then((response) => {
              console.log("장년 && 생활안정 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("장년 && 생활안정 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 장년 && 주거자립
        if (lifecycle === "Senior" && policy.category === "주거자립") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/senior/housing-self-reliance?id=1`
            )
            .then((response) => {
              console.log("장년 && 주거자립 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("장년 && 주거자립 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 장년 && 보육교육
        if (lifecycle === "Senior" && policy.category === "보육교육") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/senior/child-care-education?id=1`
            )
            .then((response) => {
              console.log("장년 && 보육교육 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("장년 && 보육교육 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 장년 && 고용창업
        if (lifecycle === "Senior" && policy.category === "고용창업") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/senior/employment-entrepreneurship?id=1`
            )
            .then((response) => {
              console.log("장년 && 고용창업 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("장년 && 고용창업 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 장년 && 보건의료
        if (lifecycle === "Senior" && policy.category === "보건의료") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/senior/health-care?id=1`
            )
            .then((response) => {
              console.log("장년 && 보건의료 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("장년 && 보건의료 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 장년 && 행정안전
        if (lifecycle === "Senior" && policy.category === "행정안전") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/senior/admin-strative-safety?id=1`
            )
            .then((response) => {
              console.log("장년 && 행정안전 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("장년 && 행정안전 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 장년 && 임신출산
        if (lifecycle === "Senior" && policy.category === "임신출산") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/senior/pregnancy-childbirth?id=1`
            )
            .then((response) => {
              console.log("장년 && 임신출산 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("장년 && 임신출산 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 장년 && 보호돌봄
        if (lifecycle === "Senior" && policy.category === "보호돌봄") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/senior/protective-care?id=1`
            )
            .then((response) => {
              console.log("장년 && 보호돌봄 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("장년 && 보호돌봄 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 장년 && 문화환경
        if (lifecycle === "Senior" && policy.category === "문화환경") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/senior/cultural-environment?id=1`
            )
            .then((response) => {
              console.log("장년 && 문화환경 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("장년 && 문화환경 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 장년 && 농림축산 어업
        if (lifecycle === "Senior" && policy.category === "농림축산 어업") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/senior/agriculture-livestock-fisheries?id=1`
            )
            .then((response) => {
              console.log("장년 && 농림축산 어업 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("장년 && 농림축산 어업 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 노년 && 생활안정
        if (lifecycle === "Elderly" && policy.category === "생활안정") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/elderly/daily-safety?id=1`
            )
            .then((response) => {
              console.log("노년 && 생활안정 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("노년 && 생활안정 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 노년 && 주거자립
        if (lifecycle === "Elderly" && policy.category === "주거자립") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/elderly/housing-self-reliance?id=1`
            )
            .then((response) => {
              console.log("노년 && 주거자립 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("노년 && 주거자립 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 노년 && 보육교육
        if (lifecycle === "Elderly" && policy.category === "보육교육") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/elderly/child-care-education?id=1`
            )
            .then((response) => {
              console.log("노년 && 보육교육 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("노년 && 보육교육 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 노년 && 고용창업
        if (lifecycle === "Elderly" && policy.category === "고용창업") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/elderly/employment-entrepreneurship?id=1`
            )
            .then((response) => {
              console.log("노년 && 고용창업 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("노년 && 고용창업 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 노년 && 보건의료
        if (lifecycle === "Elderly" && policy.category === "보건의료") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/elderly/health-care?id=1`
            )
            .then((response) => {
              console.log("노년 && 보건의료 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("노년 && 보건의료 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 노년 && 행정안전
        if (lifecycle === "Elderly" && policy.category === "행정안전") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/elderly/admin-strative-safety?id=1`
            )
            .then((response) => {
              console.log("노년 && 행정안전 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("노년 && 행정안전 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 노년 && 임신출산
        if (lifecycle === "Elderly" && policy.category === "임신출산") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/elderly/pregnancy-childbirth?id=1`
            )
            .then((response) => {
              console.log("노년 && 임신출산 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("노년 && 임신출산 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 노년 && 보호돌봄
        if (lifecycle === "Elderly" && policy.category === "보호돌봄") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/elderly/protective-care?id=1`
            )
            .then((response) => {
              console.log("노년 && 보호돌봄 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("노년 && 보호돌봄 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 노년 && 문화환경
        if (lifecycle === "Elderly" && policy.category === "문화환경") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/elderly/cultural-environment?id=1`
            )
            .then((response) => {
              console.log("노년 && 문화환경 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("노년 && 문화환경 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 노년 && 농림축산 어업
        if (lifecycle === "Elderly" && policy.category === "농림축산 어업") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/elderly/agriculture-livestock-fisheries?id=1`
            )
            .then((response) => {
              console.log("노년 && 농림축산 어업 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("노년 && 농림축산 어업 조회수 증가 실패:", error);
            });
        }

      }
      // console.log(lifecycle);
      // console.log(policy.category);
    }
  }, [policy]);


  useEffect(() => {
    if (policy && policy.category) {
      const gender = M.data.storage("gender");
      // 보조금 카테고리 조회수 증가 - 남성 && 생활안정
        if (gender === "M" && policy.category === "생활안정") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/male/daily-safety?id=1`
            )
            .then((response) => {
              console.log("남성 && 생활안정 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("남성 && 생활안정 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 남성 && 주거자립
        if (gender === "M" && policy.category === "주거자립") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/male/housing-self-reliance?id=1`
            )
            .then((response) => {
              console.log("남성 && 주거자립 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("남성 && 주거자립 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 남성 && 보육교육
        if (gender === "M" && policy.category === "보육교육") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/male/child-care-education?id=1`
            )
            .then((response) => {
              console.log("남성 && 보육교육 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("남성 && 보육교육 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 남성 && 고용창업
        if (gender === "M" && policy.category === "고용창업") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/male/employment-entrepreneurship?id=1`
            )
            .then((response) => {
              console.log("남성 && 고용창업 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("남성 && 고용창업 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 남성 && 보건의료
        if (gender === "M" && policy.category === "보건의료") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/male/health-care?id=1`
            )
            .then((response) => {
              console.log("남성 && 보건의료 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("남성 && 보건의료 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 남성 && 행정안전
        if (gender === "M" && policy.category === "행정안전") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/male/admin-strative-safety?id=1`
            )
            .then((response) => {
              console.log("남성 && 행정안전 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("남성 && 행정안전 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 남성 && 임신출산
        if (gender === "M" && policy.category === "임신출산") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/male/pregnancy-childbirth?id=1`
            )
            .then((response) => {
              console.log("남성 && 임신출산 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("남성 && 임신출산 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 남성 && 보호돌봄
        if (gender === "M" && policy.category === "보호돌봄") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/male/protective-care?id=1`
            )
            .then((response) => {
              console.log("남성 && 보호돌봄 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("남성 && 보호돌봄 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 남성 && 문화환경
        if (gender === "M" && policy.category === "문화환경") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/male/cultural-environment?id=1`
            )
            .then((response) => {
              console.log("남성 && 문화환경 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("남성 && 문화환경 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 남성 && 농림축산 어업
        if (gender === "M" && policy.category === "농림축산 어업") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/male/agriculture-livestock-fisheries?id=1`
            )
            .then((response) => {
              console.log("남성 && 농림축산 어업 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("남성 && 농림축산 어업 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 여성 && 생활안정
        if (gender === "F" && policy.category === "생활안정") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/female/daily-safety?id=1`
            )
            .then((response) => {
              console.log("여성 && 생활안정 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("여성 && 생활안정 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 여성 && 주거자립
        if (gender === "F" && policy.category === "주거자립") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/female/housing-self-reliance?id=1`
            )
            .then((response) => {
              console.log("여성 && 주거자립 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("여성 && 주거자립 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 여성 && 보육교육
        if (gender === "F" && policy.category === "보육교육") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/female/child-care-education?id=1`
            )
            .then((response) => {
              console.log("여성 && 보육교육 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("여성 && 보육교육 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 여성 && 고용창업
        if (gender === "F" && policy.category === "고용창업") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/female/employment-entrepreneurship?id=1`
            )
            .then((response) => {
              console.log("여성 && 고용창업 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("여성 && 고용창업 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 여성 && 보건의료
        if (gender === "F" && policy.category === "보건의료") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/female/health-care?id=1`
            )
            .then((response) => {
              console.log("여성 && 보건의료 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("여성 && 보건의료 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 여성 && 행정안전
        if (gender === "F" && policy.category === "행정안전") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/female/admin-strative-safety?id=1`
            )
            .then((response) => {
              console.log("여성 && 행정안전 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("여성 && 행정안전 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 여성 && 임신출산
        if (gender === "F" && policy.category === "임신출산") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/female/pregnancy-childbirth?id=1`
            )
            .then((response) => {
              console.log("여성 && 임신출산 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("여성 && 임신출산 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 여성 && 보호돌봄
        if (gender === "F" && policy.category === "보호돌봄") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/female/protective-care?id=1`
            )
            .then((response) => {
              console.log("여성 && 보호돌봄 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("여성 && 보호돌봄 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 여성 && 문화환경
        if (gender === "F" && policy.category === "문화환경") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/female/cultural-environment?id=1`
            )
            .then((response) => {
              console.log("여성 && 문화환경 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("여성 && 문화환경 조회수 증가 실패:", error);
            });
        }

        // 보조금 카테고리 조회수 증가 - 여성 && 농림축산 어업
        if (gender === "F" && policy.category === "농림축산 어업") {
          axios
            .put(
              `/v1/subsidyCategoryViewRankings/increment/female/agriculture-livestock-fisheries?id=1`
            )
            .then((response) => {
              console.log("여성 && 농림축산 어업 조회수 증가 성공:", response);
            })
            .catch((error) => {
              console.error("여성 && 농림축산 어업 조회수 증가 실패:", error);
            });
        }
    }
  }, [policy]);
        
  return (
    <>
      <div className="container">
        {policy && (
          <>
            <div className="header">
              <div className="views">
                <FaRegEye /> {policy.views}&nbsp;&nbsp;&nbsp;
                <Link to={`/review?id=${id}`} style={{ color: "#999" }}>
                  <FaRegCommentDots /> {policy.numReviews}
                </Link>
              </div>
              <button
                className="bookmark-button"
                onClick={toggleBookmark}
                style={{ boxShadow: "none", width: "auto", marginTop: "-50px" }}
              >
                {isScrapped(policy.title) ? <FaBookmark /> : <FaRegBookmark />}
              </button>
              <div className="detail-title">{policy.title}</div>
              <button
                className="detail-button"
                onClick={() => openModal("공유하기")}
              >
                <FaExternalLinkAlt /> 공유하기
              </button>
              <Link to={`/write?type=review&id=${id}`}>
                <button className="detail-button">
                  <FaPencilAlt /> 후기글 작성
                </button>
              </Link>
            </div>
          </>
        )}

        {review && (
          <>
            <div className="header">
              <div
                className="policy-date"
                style={{ maxWidth: "100%", display: "inline-block" }}
              >
                {review.subsidy.title}
              </div>

              <div className="views" style={{ float: "right" }}>
                <span>
                  <FaRegEye /> {review.views}
                </span>
                <span>
                  <Link to={`/review?id=${id}`} style={{ color: "#999" }}>
                    <FaRegCommentDots /> {comments.length}
                  </Link>
                </span>
                {M.data.storage("name") === review.user.name && (
                  <>
                    <span>
                      <Link to={`/write?id=${id}&type=reviewedit`}>
                        <FaPencilAlt />
                      </Link>
                    </span>
                    <span onClick={handleDeleteReview}>
                      <FaRegTrashAlt />
                    </span>
                  </>
                )}
              </div>

              <div className="detail-title">{review.title}</div>
              <div className="policy-description">
                작성자: {review.user.name}
              </div>
              <div className="latest-date">
                {formatDate(review.created_at)}{" "}
                <span style={{ color: "#999" }}>
                  ({formatDate(review.updated_at)} 수정)
                </span>
              </div>
              <div className="detail-button-group">
                <button className="like-button" onClick={toggleLike}>
                  {isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                  &nbsp;
                  {isLiked ? review.likes + 1 : review.likes}
                </button>

                <button
                  className="detail-button"
                  onClick={() => openModal("공유하기")}
                >
                  <FaExternalLinkAlt /> 공유하기
                </button>
                <Link to={`/detail?id=${review.subsidy.id}`}>
                  <button className="detail-button">
                    <FaPencilAlt /> 원본글 가기
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}

        <Modal isOpen={modalOpen} onClose={closeModal}>
          {modalContent}
        </Modal>
      </div>

      {policy && (
        <>
          <div className="tabs">
            <button
              style={{
                boxShadow: "none",
                width: "auto",
                marginTop: 0,
                borderRadius: 0,
              }}
              className={`tab ${activeTab === "신청정보" ? "active" : ""}`}
              onClick={() => handleTabClick("신청정보")}
            >
              신청정보
            </button>
            <button
              style={{
                boxShadow: "none",
                width: "auto",
                marginTop: 0,
                borderRadius: 0,
              }}
              className={`tab ${activeTab === "신청문의" ? "active" : ""}`}
              onClick={() => handleTabClick("신청문의")}
            >
              신청문의
            </button>
            <button
              style={{
                boxShadow: "none",
                width: "auto",
                marginTop: 0,
                borderRadius: 0,
              }}
              className={`tab ${activeTab === "관련정보" ? "active" : ""}`}
              onClick={() => handleTabClick("관련정보")}
            >
              관련정보
            </button>
            <button
              style={{
                boxShadow: "none",
                width: "auto",
                marginTop: 0,
                borderRadius: 0,
              }}
              className={`tab ${activeTab === "신청방법" ? "active" : ""}`}
              onClick={() => handleTabClick("신청방법")}
            >
              신청방법
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "신청정보" && (
              <div className="tab-panel">
                <h3>신청정보</h3>
                <div className="tab-item">
                  <span className="sub-title">
                    <BsCalendar />
                    &nbsp;&nbsp; 신청기간
                  </span>
                  {policy.application_period}
                </div>
                <div className="tab-item">
                  <span className="sub-title">
                    <BsGift />
                    &nbsp;&nbsp; 지원형태
                  </span>
                  {policy.support_type}
                </div>
              </div>
            )}
            {activeTab === "신청문의" && (
              <div className="tab-panel">
                <h3>신청문의</h3>

                <div className="tab-item">
                  <span className="sub-title">
                    <BsTelephone />
                    &nbsp;&nbsp; 전화문의
                  </span>
                  {policy.telephone_inquiry}
                </div>
              </div>
            )}
            {activeTab === "관련정보" && (
              <div className="tab-panel">
                <h3>관련정보</h3>

                <div className="tab-item">
                  <span className="sub-title">
                    <BsFileText />
                    &nbsp;&nbsp; 카테고리
                  </span>
                  {policy.category}
                </div>
                <div className="tab-item">
                  <span className="sub-title">
                    <BsLink45Deg />
                    &nbsp;&nbsp; 상세정보
                  </span>
                  <Link to={policy.detail_information_url}>
                    바로가기 <BsBoxArrowUpRight />
                  </Link>
                </div>
              </div>
            )}
            {activeTab === "신청방법" && (
              <div className="tab-panel">
                <h3>신청방법</h3>
                <div className="tab-item">
                  <span className="sub-title">
                    <BsPersonFill />
                    &nbsp;&nbsp; 신청방법
                  </span>
                  <Link to={policy.application_process_url}>
                    {policy.application_process} <BsBoxArrowUpRight />
                  </Link>
                </div>
                <div className="tab-item">
                  <span className="sub-title">
                    <BsBriefcase />
                    &nbsp;&nbsp; 접수기관
                  </span>
                  {policy.receiving_agency}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {review && (
        <div
          className="tab-content"
          dangerouslySetInnerHTML={{ __html: review.content }}
        />
      )}

      {review && (
        <div className="comment-list">
          {userId && (
            <>
              <input
                className="comment-input"
                placeholder="댓글을 입력해주세요."
                value={comment}
                onChange={handleCommentChange}
              />

              <button className="comment-btn" onClick={submitComment}>
                전송
              </button>
            </>
          )}

          {comments.length > 0 && (
            <>
              <p>{comments.length}개의 댓글</p>
              <div className="comment-sort">
                <button
                  onClick={() => handleSortOrderChange("desc")}
                  className={sortOrder === "desc" ? "active" : ""}
                >
                  <BsArrowUp /> 최신순
                </button>
                <button
                  onClick={() => handleSortOrderChange("asc")}
                  className={sortOrder === "asc" ? "active" : ""}
                >
                  <BsArrowDown /> 오래된순
                </button>
              </div>

              <div>
                {comments
                  .sort((a, b) =>
                    sortOrder === "desc"
                      ? new Date(b.created_at) - new Date(a.created_at)
                      : new Date(a.created_at) - new Date(b.created_at)
                  )
                  .map((comment) => (
                    <div className="comments" key={comment.id}>
                      {comment.id === editingCommentId && (
                        <div className="comment-modal">
                          <div className="blur" />
                          <div className="modal">
                            <button
                              className="close-button"
                              onClick={() => handleCancelEdit(comment.id)}
                            >
                              <FaTimes />
                            </button>
                            <p
                              style={{ marginTop: "20px", marginBottom: "5px" }}
                            >
                              <input
                                type="text"
                                placeholder="수정할 댓글을 입력해주세요."
                                value={editedComment}
                                onChange={(e) =>
                                  setEditedComment(e.target.value)
                                }
                              />
                            </p>
                            <button
                              className="comment-save"
                              onClick={() => handleSaveEdit(comment.id)}
                            >
                              완료
                            </button>
                          </div>
                        </div>
                      )}
                      {commentOptionsVisible === comment.id && (
                        <div className="comment-edit">
                          <button
                            className="comment-modify"
                            onClick={() =>
                              handleEdit(comment.id, comment.content)
                            }
                          >
                            수정
                          </button>
                          <button
                            className="comment-delete"
                            onClick={() => handleDelete(comment.id)}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                      <div>
                        {comment.user.name === M.data.storage("name") && (
                          <FaEllipsisV
                            className="comment-option"
                            onClick={() =>
                              handleToggleCommentOptions(comment.id)
                            }
                          />
                        )}
                        <p>{comment.user.name}</p>
                        <p>{comment.content}</p>
                        <span className="policy-description">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Detail;
