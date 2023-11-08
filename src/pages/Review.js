import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaRegEye, FaRegCommentDots } from 'react-icons/fa';
import axios from 'axios';

const Latest = () => {
    const [subsidiesData, setSubsidiesData] = useState([]);

    useEffect(() => {
        axios.get('/v1/subsidies-review/all')
            .then((response) => {
                setSubsidiesData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('ko-KR', options);
    };

    return (
        <div className="container">
            <h3>후기글 모음</h3>
            <ul className="policy-list">
                {subsidiesData.map((policy) => (
                    <li key={policy.id} className="policy-item">
                        <Link to={`/detail?id=${policy.id}&latest`}>
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
                                        <span><FaRegCommentDots /> {policy.views}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Latest;
