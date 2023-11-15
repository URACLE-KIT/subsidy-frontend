import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CategoryChart from '../layout/CategoryChart';
import { FaBookmark, FaRegBookmark, FaRegEye, FaRegCommentDots } from "react-icons/fa";

const Ranking = () => {
    const [policies, setPolicies] = useState([]);
    const [females, setFemales] = useState([]);
    const [males, setMales] = useState([]);
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

    // 이번주
    useEffect(() => {
        const fetchWeekPolicies = async () => {
            const hasFemaleFetched = M.data.storage("hasWeekViewed");

            if (!hasFemaleFetched || hasFemaleFetched === 'false') {
                await axios.get("/v1/subsidyViewRankings/create");
                M.data.storage({
                    hasWeekViewed: 'true',
                });
            }
            
            axios.get("/v1/subsidyViewRankings/subsidyRanking_Info")
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
                    console.error("이번주 많이 조회한 보조금 가져오기 실패:", error);
                });
        };

        fetchWeekPolicies();
    }, []);

    // 여성
    useEffect(() => {
        const fetchFemaleViewedPolicies = async () => {
            const hasFemaleFetched = M.data.storage("hasFemaleViewed");

            if (!hasFemaleFetched || hasFemaleFetched === 'false') {
                await axios.get("/v1/subsidyFemaleViewRankings/create");
                M.data.storage({
                    hasFemaleViewed: 'true',
                });
            }

            axios.get("/v1/subsidyFemaleViewRankings/subsidyRanking_Info")
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
                    setFemales(updatedPolicies);

                })
                .catch((error) => {
                    console.error("여성이 많이 조회한 보조금 가져오기 실패:", error);
                });
        };

        fetchFemaleViewedPolicies();
    }, []);

    // 남성
    useEffect(() => {
        const fetchFemaleViewedPolicies = async () => {
            const hasMaleFetched = M.data.storage("hasMaleViewed");

            if (!hasMaleFetched || hasMaleFetched === 'false') {
                await axios.get("/v1/subsidyMaleViewRankings/create");
                M.data.storage({
                    hasMaleViewed: 'true',
                });
            }
            
            axios.get("/v1/subsidyMaleViewRankings/subsidyRanking_Info")
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
                    setMales(updatedPolicies);

                })
                .catch((error) => {
                    console.error("남성이 많이 조회한 보조금 가져오기 실패:", error);
                });
        };

        fetchFemaleViewedPolicies();
    }, []);

    // 월요일 초기화
    useEffect(() => {
        const resetLocalStorage = () => {
            const today = new Date();
            const dayOfWeek = today.getDay();

            if (dayOfWeek === 1) {
                M.data.removeStorage("hasFemaleViewed");
                M.data.removeStorage("hasWeekViewed");
            }
        };

        resetLocalStorage();
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
                    {policies.map((policy, index) => (
                        <li key={policy.id} className="policy-item">
                            <Link to={`/detail?id=${policy.id}`}>
                                <div className="policy-details">
                                    <span style={{ float: 'right', paddingTop: '10px' }} className="policy-description">
                                        <FaRegEye /> {policy.views}
                                    </span>
                                    <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>

                                        {index + 1}&nbsp; {policy.title.length > 17 ? `${policy.title.slice(0, 17)}...` : policy.title}

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
                    {policies.map((policy, index) => (
                        <li key={policy.id} className="policy-item">
                            <Link to={`/detail?id=${policy.id}`}>
                                <div className="policy-details">
                                    <span style={{ float: 'right', paddingTop: '10px' }} className="policy-description">
                                        <FaRegEye /> {policy.views}
                                    </span>
                                    <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>

                                        {index + 1}&nbsp; {policy.title.length > 17 ? `${policy.title.slice(0, 17)}...` : policy.title}

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
                    {males.map((male, index) => (
                        <li key={male.id} className="policy-item">
                            <Link to={`/detail?id=${male.id}`}>

                                <div className="policy-details">
                                    <span style={{ float: 'right', paddingTop: '10px' }} className="policy-description">
                                        <FaRegEye /> {male.views}
                                    </span>
                                    <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {index + 1}&nbsp; {male.title.length > 17 ? `${male.title.slice(0, 17)}...` : male.title}

                                    </span>
                                    <div className="policy-agency">{male.description.length > 23 ? `${male.description.slice(0, 23)}...` : male.description}</div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="container">
                <h2>여성이 많이 조회한 보조금</h2>
                <ul className="policy-list">
                    {females.map((female, index) => (
                        <li key={female.id} className="policy-item">
                            <Link to={`/detail?id=${female.id}`}>
                                <div className="policy-details">
                                    <span style={{ float: 'right', paddingTop: '10px' }} className="policy-description">
                                        <FaRegEye /> {female.views}
                                    </span>
                                    <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {index + 1}&nbsp; {female.title.length > 17 ? `${female.title.slice(0, 17)}...` : female.title}
                                    </span>
                                    <div className="policy-agency">{female.description.length > 23 ? `${female.description.slice(0, 23)}...` : female.description}</div>
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
