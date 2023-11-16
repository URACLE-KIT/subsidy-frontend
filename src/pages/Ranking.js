import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CategoryChart from '../layout/CategoryChart';

const Ranking = () => {
    const [policies, setPolicies] = useState([]);
    const [females, setFemales] = useState([]);
    const [males, setMales] = useState([]);
    const [teenagers, setTeenagers] = useState([]);
    const [youths, setYouths] = useState([]);
    const [middles, setMiddles] = useState([]);
    const [seniors, setSeniors] = useState([]);
    const [elderlies, setElderlies] = useState([]);
    const [married, setMarried] = useState([]);

    const data = [
        { id: '생활안정', label: '생활안정', value: 20 },
        { id: '주거자립', label: '주거자립', value: 40 },
        { id: '문화환경', label: '문화환경', value: 30 },
        { id: '기타', label: '기타', value: 15 },
    ];

    // 이번주
    useEffect(() => {
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
    }, []);

    // 청소년
    useEffect(() => {
        const lifecycle = M.data.storage("lifecycle");

        if (lifecycle === "Teenager") {
            axios.get("/v1/subsidyTeenagerViewRankings/subsidyRanking_Info")
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
                    setTeenagers(updatedPolicies);

                })
                .catch((error) => {
                    console.error("청소년이 많이 조회한 보조금 가져오기 실패:", error);
                });
        }
    }, []);

    // 청년
    useEffect(() => {
        const lifecycle = M.data.storage("lifecycle");

        if (lifecycle === "Youth") {
            axios.get("/v1/subsidyYouthViewRankings/subsidyRanking_Info")
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
                    setYouths(updatedPolicies);

                })
                .catch((error) => {
                    console.error("청년이 많이 조회한 보조금 가져오기 실패:", error);
                });
        }
    }, []);

    // 중년
    useEffect(() => {
        const lifecycle = M.data.storage("lifecycle");

        if (lifecycle === "MiddleAge") {
            axios.get("/v1/subsidyMiddleAgeViewRankings/subsidyRanking_Info")
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
                    setMiddles(updatedPolicies);

                })
                .catch((error) => {
                    console.error("중년이 많이 조회한 보조금 가져오기 실패:", error);
                });
        }
    }, []);

    // 장년
    useEffect(() => {
        const lifecycle = M.data.storage("lifecycle");

        if (lifecycle === "Senior") {
            axios.get("/v1/subsidySeniorViewRankings/subsidyRanking_Info")
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
                    setSeniors(updatedPolicies);

                })
                .catch((error) => {
                    console.error("장년이 많이 조회한 보조금 가져오기 실패:", error);
                });
        }
    }, []);

    // 노년
    useEffect(() => {
        const lifecycle = M.data.storage("lifecycle");

        if (lifecycle === "Elderly") {
            axios.get("/v1/subsidyElderlyViewRankings/subsidyRanking_Info")
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
                    setElderlies(updatedPolicies);

                })
                .catch((error) => {
                    console.error("노년이 많이 조회한 보조금 가져오기 실패:", error);
                });
        }
    }, []);

    // 여성
    useEffect(() => {
        const gender = M.data.storage("gender");

        if (gender === "F") {
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
        }
    }, []);

    // 남성
    useEffect(() => {
        const gender = M.data.storage("gender");

        if (gender === "M") {
            axios.get("/v1/subsidyMaleViewRankings/subsidyRanking_Info")
                .then((response) => {
                    const updatedPolicies = response.data.map((item) => ({
                        id: item.subsidyId,
                        title: item.title,
                        description: item.description,
                        views: item.views,
                    }));
                    setMales(updatedPolicies);
                })
                .catch((error) => {
                    console.error("남성이 많이 조회한 보조금 가져오기 실패:", error);
                });
        }
    }, []);

    // 기혼
    useEffect(() => {
        const maritalStatus = M.data.storage("maritalStatus");

        if (maritalStatus === "M") {
            axios.get("/v1/subsidyMarriedViewRankings/subsidyRanking_Info")
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
                    setMarried(updatedPolicies);

                })
                .catch((error) => {
                    console.error("기혼이 많이 조회한 보조금 가져오기 실패:", error);
                });
        }
    }, []);

    return (
        <>
            <h3 style={{ textAlign: 'center' }}>랭킹알리미</h3>


            {M.data.storage("lifecycle") === "Teenager" && (
                <div className="container">
                    <h2>청소년이 많이 조회한 카테고리</h2>
                    <CategoryChart data={data} />
                </div>
            )}

            {M.data.storage("lifecycle") === "Youth" && (
                <div className="container">
                    <h2>청년이 많이 조회한 카테고리</h2>
                    <CategoryChart data={data} />
                </div>
            )}

            {M.data.storage("lifecycle") === "MiddleAge" && (
                <div className="container">
                    <h2>중년이 많이 조회한 카테고리</h2>
                    <CategoryChart data={data} />
                </div>
            )}

            {M.data.storage("lifecycle") === "Senior" && (
                <div className="container">
                    <h2>장년이 많이 조회한 카테고리</h2>
                    <CategoryChart data={data} />
                </div>
            )}

            {M.data.storage("lifecycle") === "Elderly" && (
                <div className="container">
                    <h2>노년이 많이 조회한 카테고리</h2>
                    <CategoryChart data={data} />
                </div>
            )}

            {M.data.storage("gender") === "M" && (
                <div className="container">
                    <h2>남성이 많이 조회한 카테고리</h2>
                    <CategoryChart data={data} />
                </div>
            )}

            {M.data.storage("gender") === "F" && (
                <div className="container">
                    <h2>여성이 많이 조회한 카테고리</h2>
                    <CategoryChart data={data} />
                </div>
            )}

            <div className="container">
                <h2>이번주 많이 조회한 보조금</h2>
                <ul className="policy-list">
                    {policies.map((policy, index) => (
                        <li key={policy.id} className="policy-item">
                            <Link to={`/detail?id=${policy.id}`}>
                                <div className="policy-details">
                                    <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>

                                        {index + 1}&nbsp; {policy.title.length > 25 ? `${policy.title.slice(0, 25)}...` : policy.title}

                                    </span>
                                    <div className="policy-agency">{policy.description.length > 27 ? `${policy.description.slice(0, 27)}...` : policy.description}</div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {M.data.storage("lifecycle") === "Teenager" && (
                <div className="container">
                    <h2>청소년이 많이 조회한 보조금</h2>
                    <ul className="policy-list">
                        {teenagers.map((teenager, index) => (
                            <li key={teenager.id} className="policy-item">
                                <Link to={`/detail?id=${teenager.id}`}>

                                    <div className="policy-details">
                                        <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {index + 1}&nbsp; {teenager.title.length > 25 ? `${teenager.title.slice(0, 25)}...` : teenager.title}

                                        </span>
                                        <div className="policy-agency">{teenager.description.length > 27 ? `${teenager.description.slice(0, 27)}...` : teenager.description}</div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {M.data.storage("lifecycle") === "Youth" && (
                <div className="container">
                    <h2>청년이 많이 조회한 보조금</h2>
                    <ul className="policy-list">
                        {youths.map((youth, index) => (
                            <li key={youth.id} className="policy-item">
                                <Link to={`/detail?id=${youth.id}`}>

                                    <div className="policy-details">
                                        <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {index + 1}&nbsp; {youth.title.length > 25 ? `${youth.title.slice(0, 25)}...` : youth.title}

                                        </span>
                                        <div className="policy-agency">{youth.description.length > 27 ? `${youth.description.slice(0, 27)}...` : youth.description}</div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {M.data.storage("lifecycle") === "MiddleAge" && (
                <div className="container">
                    <h2>중년이 많이 조회한 보조금</h2>
                    <ul className="policy-list">
                        {middles.map((middle, index) => (
                            <li key={middle.id} className="policy-item">
                                <Link to={`/detail?id=${middle.id}`}>

                                    <div className="policy-details">
                                        <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {index + 1}&nbsp; {middle.title.length > 25 ? `${middle.title.slice(0, 25)}...` : middle.title}

                                        </span>
                                        <div className="policy-agency">{middle.description.length > 27 ? `${middle.description.slice(0, 27)}...` : middle.description}</div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {M.data.storage("lifecycle") === "Senior" && (
                <div className="container">
                    <h2>장년이 많이 조회한 보조금</h2>
                    <ul className="policy-list">
                        {seniors.map((senior, index) => (
                            <li key={senior.id} className="policy-item">
                                <Link to={`/detail?id=${senior.id}`}>

                                    <div className="policy-details">
                                        <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {index + 1}&nbsp; {senior.title.length > 25 ? `${senior.title.slice(0, 25)}...` : senior.title}

                                        </span>
                                        <div className="policy-agency">{senior.description.length > 27 ? `${senior.description.slice(0, 27)}...` : senior.description}</div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {M.data.storage("lifecycle") === "Elderly" && (
                <div className="container">
                    <h2>노년이 많이 조회한 보조금</h2>
                    <ul className="policy-list">
                        {elderlies.map((elderly, index) => (
                            <li key={elderly.id} className="policy-item">
                                <Link to={`/detail?id=${elderly.id}`}>

                                    <div className="policy-details">
                                        <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {index + 1}&nbsp; {elderly.title.length > 25 ? `${elderly.title.slice(0, 25)}...` : elderly.title}

                                        </span>
                                        <div className="policy-agency">{elderly.description.length > 27 ? `${elderly.description.slice(0, 27)}...` : elderly.description}</div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {M.data.storage("gender") === "M" && (
                <div className="container">
                    <h2>남성이 많이 조회한 보조금</h2>
                    <ul className="policy-list">
                        {males.map((male, index) => (
                            <li key={male.id} className="policy-item">
                                <Link to={`/detail?id=${male.id}`}>

                                    <div className="policy-details">
                                        <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {index + 1}&nbsp; {male.title.length > 25 ? `${male.title.slice(0, 25)}...` : male.title}

                                        </span>
                                        <div className="policy-agency">{male.description.length > 27 ? `${male.description.slice(0, 27)}...` : male.description}</div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {M.data.storage("gender") === "F" && (
                <div className="container">
                    <h2>여성이 많이 조회한 보조금</h2>
                    <ul className="policy-list">
                        {females.map((female, index) => (
                            <li key={female.id} className="policy-item">
                                <Link to={`/detail?id=${female.id}`}>
                                    <div className="policy-details">
                                        <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {index + 1}&nbsp; {female.title.length > 25 ? `${female.title.slice(0, 25)}...` : female.title}
                                        </span>
                                        <div className="policy-agency">{female.description.length > 27 ? `${female.description.slice(0, 27)}...` : female.description}</div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {M.data.storage("maritalStatus") === "M" && (
                <div className="container">
                    <h2>기혼이 많이 조회한 보조금</h2>
                    <ul className="policy-list">
                        {married.map((marry, index) => (
                            <li key={marry.id} className="policy-item">
                                <Link to={`/detail?id=${marry.id}`}>
                                    <div className="policy-details">
                                        <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {index + 1}&nbsp; {marry.title.length > 25 ? `${marry.title.slice(0, 25)}...` : marry.title}
                                        </span>
                                        <div className="policy-agency">{marry.description.length > 27 ? `${marry.description.slice(0, 27)}...` : marry.description}</div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </>
    );
};

export default Ranking;
