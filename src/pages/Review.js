import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaRegEye, FaRegCommentDots } from 'react-icons/fa';
import axios from 'axios';

const Latest = () => {
    const [subsidiesData, setSubsidiesData] = useState([]);
    const [sortOption, setSortOption] = useState("최신순");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        axios.get('/v1/subsidies-review/all')
            .then((response) => {
                setSubsidiesData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
        setCurrentPage(1);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('ko-KR', options);
    };

    const sortPolicies = (policies, sortOption) => {
        switch (sortOption) {
            case "제목순":
                return policies.sort((a, b) => a.title.localeCompare(b.title));
            case "조회수순":
                return policies.sort((a, b) => b.views - a.views);
            case "좋아요순":
                return policies.sort((a, b) => b.likes - a.likes);
            case "댓글순":
                return policies.sort((a, b) => b.comments - a.comments);
            default:
                return policies.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
    };

    const sortedPolicies = sortPolicies(subsidiesData, sortOption);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPolicies = sortedPolicies.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = Math.ceil(sortedPolicies.length / itemsPerPage);

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


    return (
        <div className="container">
            <h3>후기글 모음</h3>
            <select
                id="filterSelect"
                value={sortOption}
                onChange={handleSortChange}
                style={{ marginTop: '20px' }}
            >
                <option value="최신순">최신순</option>
                <option value="제목순">제목순</option>
                <option value="조회수순">조회수순</option>
                <option value="좋아요순">좋아요순</option>
                <option value="댓글순">댓글순</option>
            </select>
            <ul className="policy-list">
                {currentPolicies.map((policy) => (
                    <li key={policy.id} className="policy-item">
                        <Link to={`/reviewdetail`}>
                            <div className="policy-details">
                                <div className="policy-info">
                                    <div className="review-count" style={{ float: 'none' }}>{policy.subsidy.title}</div>
                                    <div className="latest-title">
                                        {policy.title}
                                    </div>
                                    <div className="latest-date">
                                        {formatDate(policy.created_at)}&nbsp;
                                        <span style={{ color: "#999" }}>({formatDate(policy.updated_at)} 수정)</span>
                                    </div>
                                    <div className='count views'>
                                        <span><FaRegEye /> {policy.views}</span>
                                        <span><FaRegHeart /> {policy.likes}</span>
                                        <span><FaRegCommentDots /> {policy.comments}</span>
                                    </div>
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
                {Array.from({ length: pageNumbers }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
                    >
                        {i + 1}
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

export default Latest;
