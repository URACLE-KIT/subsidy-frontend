import React from 'react';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill, BsChatLeftDots, BsPencilSquare } from 'react-icons/bs';

const policiesData = [
    {
        id: 1,
        title: "청년도약계좌",
        date: "2023-10-26 12:00",
        liked: 3,
        comment: 5
    },
    {
        id: 2,
        title: "청년도약계좌 청년도약계좌 청년도약계좌 청년도약계좌",
        date: "2023-10-26 12:00",
        liked: 3,
        comment: 5
    },
    {
        id: 3,
        title: "청년도약계좌",
        date: "2023-10-26 12:00",
        liked: 3,
        comment: 5
    },
    {
        id: 4,
        title: "청년도약계좌",
        date: "2023-10-26 12:00",
        liked: 3,
        comment: 5
    },
];

const Latest = () => {
    return (
        <div className="container">
            <h3>새로 나온 정책 소식</h3>
            <ul className="policy-list">
                {policiesData.map((policy) => (
                    <li key={policy.id} className="policy-item">
                        <Link to={`/detail?id=${policy.id}&latest`}>
                            <div className="policy-details">
                                <div className="policy-image">
                                    <img src={process.env.PUBLIC_URL + '/image1.jpg'} alt="Image" />
                                </div>
                                <div className="policy-info">
                                    <div className="latest-title">
                                        {policy.title}
                                    </div>
                                    <div className="latest-date">{policy.date}</div>
                                </div>
                                <div className='count'>
                                    <span><BsHeart /> {policy.liked}</span>
                                    <span><BsChatLeftDots /> {policy.comment}</span>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            <Link to="/write">
                <button className="latest-btn">
                    <BsPencilSquare />
                </button>
            </Link>
        </div>
    );
};

export default Latest;
