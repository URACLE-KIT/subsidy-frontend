import React from 'react';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill, BsChatLeftDots } from 'react-icons/bs';

const policiesData = [
    {
        id: 1,
        title: "청년도약계좌 신청 후기입니다!!",
        subsidy: "청년도약계좌",
        date: "2023-10-26 12:00",
        liked: 3,
        comment: 5
    },
    {
        id: 2,
        title: "청년도약계좌 신청 후기입니다!!",
        subsidy: "청년도약계좌",
        date: "2023-10-26 12:00",
        liked: 3,
        comment: 5
    },
    {
        id: 3,
        title: "청년도약계좌 신청 후기입니다!!",
        subsidy: "청년도약계좌",
        date: "2023-10-26 12:00",
        liked: 3,
        comment: 5
    },
    {
        id: 4,
        title: "청년도약계좌 신청 후기입니다!!",
        subsidy: "청년도약계좌",
        date: "2023-10-26 12:00",
        liked: 3,
        comment: 5
    },
];

const Latest = () => {
    return (
        <div className="container">
            <h3>후기글 모음</h3>
            <ul className="policy-list">
                {policiesData.map((policy) => (
                    <li key={policy.id} className="policy-item">
                        <Link to={`/detail?id=${policy.id}&latest`}>
                            <div className="policy-details">
                                <div className="policy-info">
                                    <div className="latest-title">
                                        {policy.title}
                                    </div>
                                    <div className="latest-date">{policy.date}</div>
                                </div>
                                <div className='count'>
                                    <span><BsHeart /> {policy.liked}</span>
                                    <span><BsChatLeftDots /> {policy.comment}</span>
                                    <div className="review-count">{policy.subsidy}</div>
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
