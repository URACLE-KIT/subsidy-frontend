import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CategoryChart from '../layout/CategoryChart';
import { FaBookmark, FaRegBookmark, FaRegEye, FaRegCommentDots } from "react-icons/fa";

const Ranking = () => {
    const [policies, setPolicies] = useState([]);
    const [category, setCategory] = useState([]);
    const [reviews, setReviews] = useState([]);
    const data = [
        { id: '생활안정', label: '생활안정', value: 20 },
        { id: '주거자립', label: '주거자립', value: 40 },
        { id: '문화환경', label: '문화환경', value: 30 },
        { id: '기타', label: '기타', value: 15 },
    ];

    var total = 0;
    var filteredPolicies = [];
    var count = [];

    category.map((c) =>
        filteredPolicies.push(policies.filter((policy) => policy.category === c))
    );

    filteredPolicies.map((fp) => count.push(fp.length));
    count.map((count) => (total += count));

    const sumPolicies = filteredPolicies.reduce((accumulator, currentArray) => {
        return accumulator.concat(currentArray);
    }, []);

    sumPolicies.sort((a, b) => b.id - a.id);

    const top4Items = sumPolicies.slice(0, 4);

    useEffect(() => {
        var storedCategory = M.data.storage("category");
        if (!storedCategory) {
            storedCategory = [];
        }
        setCategory(storedCategory);
        axios
            .get("/v1/subsidies/all")
            .then((response) => {
                setPolicies(response.data);
            })
            .catch((error) => {
                console.error("맞춤 보조금 데이터 가져오기 실패:", error);
            });
    }, []);

    useEffect(() => {
        axios
            .get("/v1/subsidies-review/all")
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error("후기 데이터 가져오기 실패:", error);
            });
    }, []);
    
    useEffect(() => {
        const fetchData = async () => {
          await axios.get("http://localhost:8080/v1/subsidyViewRankings/create");
      
          axios.get("http://localhost:8080/v1/subsidyViewRankings/subsidyRanking_Info")
            .then((response) => {
                console.log(response);
              const updatedPolicies = response.data.map((item) => {
                return {
                  id: item.subsidyId,
                  title: item.title,
                  description: item.description,
                  views: item.views,
                };
              });
              console.log(updatedPolicies);
              setPolicies(updatedPolicies);
            })
            .catch((error) => {
              console.error("저번주 많이 조회한 보조금 가져오기 실패:", error);
            });
        };
      
        fetchData();
      }, []);           

    return (
        <>

            <h3 style={{ textAlign: 'center' }}>랭킹알리미</h3>

            <div className="container">
                <h2>청년이 많이 조회한 카테고리</h2>
                <CategoryChart data={data} />
            </div>

            <div className="container">
                <h2>남성이 많이 조회한 카테고리</h2>
                <CategoryChart data={data} />
            </div>

            <div className="container">
                <h2>이번주 많이 조회한 보조금</h2>
                <ul className="policy-list">
                    {policies.map((policy) => (
                        <li key={policy.id} className="policy-item">
                            <Link to={`/detail?id=${policy.id}`}>
                                <div className="policy-details">
                                    <span style={{ float: 'right', paddingTop: '10px' }} className="policy-description">
                                        <FaRegEye /> {policy.views}
                                    </span>
                                    <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {policy.id}&nbsp; {policy.title.length > 17 ? `${policy.title.slice(0, 17)}...` : policy.title}
                                    </span>
                                    <div className="policy-agency">{policy.description.length > 23 ? `${policy.description.slice(0, 23)}...` : policy.description}</div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="container">
                <h2>청년이 많이 조회한 보조금</h2>
                <ul className="policy-list">
                    {policies.map((policy) => (
                        <li key={policy.id} className="policy-item">
                            <Link to={`/detail?id=${policy.id}`}>
                                <div className="policy-details">
                                    <span style={{ float: 'right', paddingTop: '10px' }} className="policy-description">
                                        <FaRegEye /> {policy.views}
                                    </span>
                                    <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {policy.id}&nbsp; {policy.title.length > 17 ? `${policy.title.slice(0, 17)}...` : policy.title}
                                    </span>
                                    <div className="policy-agency">{policy.description.length > 23 ? `${policy.description.slice(0, 23)}...` : policy.description}</div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="container">
                <h2>남성이 많이 조회한 보조금</h2>
                <ul className="policy-list">
                    {policies.map((policy) => (
                        <li key={policy.id} className="policy-item">
                            <Link to={`/detail?id=${policy.id}`}>
                                <div className="policy-details">
                                    <span style={{ float: 'right', paddingTop: '10px' }} className="policy-description">
                                        <FaRegEye /> {policy.views}
                                    </span>
                                    <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {policy.id}&nbsp; {policy.title.length > 17 ? `${policy.title.slice(0, 17)}...` : policy.title}
                                    </span>
                                    <div className="policy-agency">{policy.description.length > 23 ? `${policy.description.slice(0, 23)}...` : policy.description}</div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Ranking;
