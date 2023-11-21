import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CategoryChart from '../layout/CategoryChart';
import {
  FaBookmark,
  FaRegBookmark,
  FaRegEye,
  FaRegCommentDots,
} from "react-icons/fa";

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
    const [categoryData, setCategoryData] = useState([]);

    const toKorean = (englishLabel) => {
        const translationMap = {
            PregnancyChildbirth: '임신출산',
            HousingSelfReliance: '주거자립',
            EmploymentEntrepreneurship: '고용창업',
            AdminStrativeSafety: '행정안전',
            CulturalEnvironment: '문화환경',
            AgricultureLivestockFisheries: '농림축산어업',
            ChildCareEducation: '보육교육',
            DailySafety: '생활안정',
            ProtectiveCare: '보호돌봄',
            HealthCare: '보건의료'
        };
    
        // 영어 레이블에서 키워드 추출
        const keyword = Object.keys(translationMap).find((key) => englishLabel.includes(key));
    
        // 번역된 레이블이 있으면 해당 번역 사용, 없으면 원본 레이블 사용
        const koreanLabel = keyword ? translationMap[keyword] : englishLabel;
    
        return koreanLabel;
    };

    const transformDataForChart = (data) => {
        return Object.keys(data).map((key) => ({
            id: key,
            label: toKorean(key),
            value: data[key],
        }));
    };  

    useEffect(() => {
        axios.get("/v1/subsidyCategoryViewRankings/views?id=1")
            .then((response) => {
                const transformedData = transformDataForChart(response.data);
                setCategoryData(transformedData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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
                    <CategoryChart data={categoryData.filter(item => item.id.includes("teenager"))} />
                </div>
            )}

            {M.data.storage("lifecycle") === "Youth" && (
                <div className="container">
                    <h2>청년이 많이 조회한 카테고리</h2>
                    <CategoryChart data={categoryData.filter(item => item.id.includes("youth"))} />
                </div>
            )}

            {M.data.storage("lifecycle") === "MiddleAge" && (
                <div className="container">
                    <h2>중년이 많이 조회한 카테고리</h2>
                    <CategoryChart data={categoryData.filter(item => item.id.includes("middleAge"))} />
                </div>
            )}

            {M.data.storage("lifecycle") === "Senior" && (
                <div className="container">
                    <h2>장년이 많이 조회한 카테고리</h2>
                    <CategoryChart data={categoryData.filter(item => item.id.includes("senior"))} />
                </div>
            )}

            {M.data.storage("lifecycle") === "Elderly" && (
                <div className="container">
                    <h2>노년이 많이 조회한 카테고리</h2>
                    <CategoryChart data={categoryData.filter(item => item.id.includes("elderly"))} />
                </div>
            )}

            {!M.data.storage("token") && (
                <div className="container">
                    <h2>남성이 많이 조회한 카테고리</h2>
                    <CategoryChart data={categoryData.filter(item => item.label.includes("male") && !item.label.includes("female"))} />
                </div>
            )}

            {M.data.storage("gender") === "M" && (
                <div className="container">
                    <h2>남성이 많이 조회한 카테고리</h2>
                    <CategoryChart data={categoryData.filter(item => item.id.includes("male") && !item.id.includes("female"))} />
                </div>
            )}

            {!M.data.storage("token") && (
                <div className="container">
                    <h2>여성이 많이 조회한 카테고리</h2>
                    <CategoryChart data={categoryData.filter(item => item.label.includes("female"))} />
                </div>
            )}

            {M.data.storage("gender") === "F" && (
                <div className="container">
                    <h2>여성이 많이 조회한 카테고리</h2>
                    <CategoryChart data={categoryData.filter(item => item.id.includes("female"))} />
                </div>
            )}

            <div className="container">
                <h2>이번주 많이 조회한 보조금</h2>
                <ul className="policy-list">
                    {policies.map((policy, index) => (
                        <li key={policy.id} className="policy-item">
                            <Link to={`/detail?id=${policy.id}`}>
                                <div className="policy-details">
                                    <div className="policy-description" style={{ float: 'right', marginTop: '15px' }}>
                                        <FaRegEye /> {policy.views}
                                    </div>
                                    <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>

                                        {index + 1}&nbsp; {policy.title.length > 18 ? `${policy.title.slice(0, 18)}...` : policy.title}

                                    </span>
                                    <div className="policy-agency">{policy.description.length > 21 ? `${policy.description.slice(0, 21)}...` : policy.description}</div>
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
                                        <div className="policy-description" style={{ float: 'right', marginTop: '15px' }}>
                                            <FaRegEye /> {teenager.views}
                                        </div>
                                        <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {index + 1}&nbsp; {teenager.title.length > 18 ? `${teenager.title.slice(0, 18)}...` : teenager.title}

                                        </span>
                                        <div className="policy-agency">{teenager.description.length > 21 ? `${teenager.description.slice(0, 21)}...` : teenager.description}</div>
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
                                        <div className="policy-description" style={{ float: 'right', marginTop: '15px' }}>
                                            <FaRegEye /> {youth.views}
                                        </div>
                                        <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {index + 1}&nbsp; {youth.title.length > 18 ? `${youth.title.slice(0, 18)}...` : youth.title}
                                        </span>
                                        <div className="policy-agency">{youth.description.length > 21 ? `${youth.description.slice(0, 21)}...` : youth.description}</div>
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
                                        <div className="policy-description" style={{ float: 'right', marginTop: '15px' }}>
                                            <FaRegEye /> {middle.views}
                                        </div>
                                        <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {index + 1}&nbsp; {middle.title.length > 18 ? `${middle.title.slice(0, 18)}...` : middle.title}
                                        </span>
                                        <div className="policy-agency">{middle.description.length > 21 ? `${middle.description.slice(0, 21)}...` : middle.description}</div>
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
                                        <div className="policy-description" style={{ float: 'right', marginTop: '15px' }}>
                                            <FaRegEye /> {senior.views}
                                        </div>
                                        <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {index + 1}&nbsp; {senior.title.length > 18 ? `${senior.title.slice(0, 18)}...` : senior.title}
                                        </span>
                                        <div className="policy-agency">{senior.description.length > 21 ? `${senior.description.slice(0, 21)}...` : senior.description}</div>
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
                                        <div className="policy-description" style={{ float: 'right', marginTop: '15px' }}>
                                            <FaRegEye /> {elderly.views}
                                        </div>
                                        <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {index + 1}&nbsp; {elderly.title.length > 18 ? `${elderly.title.slice(0, 18)}...` : elderly.title}
                                        </span>
                                        <div className="policy-agency">{elderly.description.length > 21 ? `${elderly.description.slice(0, 21)}...` : elderly.description}</div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {!M.data.storage("token") && (
                <div className="container">
                    <h2>남성이 많이 조회한 보조금</h2>
                    <ul className="policy-list">
                        {males.map((male, index) => (
                            <li key={male.id} className="policy-item">
                                <Link to={`/detail?id=${male.id}`}>
                                    <div className="policy-details">
                                        <div className="policy-description" style={{ float: 'right', marginTop: '15px' }}>
                                            <FaRegEye /> {male.views}
                                        </div>
                                        <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {index + 1}&nbsp; {male.title.length > 18 ? `${male.title.slice(0, 18)}...` : male.title}
                                        </span>
                                        <div className="policy-agency">{male.description.length > 21 ? `${male.description.slice(0, 21)}...` : male.description}</div>
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
                                        <div className="policy-description" style={{ float: 'right', marginTop: '15px' }}>
                                            <FaRegEye /> {male.views}
                                        </div>
                                        <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {index + 1}&nbsp; {male.title.length > 18 ? `${male.title.slice(0, 18)}...` : male.title}
                                        </span>
                                        <div className="policy-agency">{male.description.length > 21 ? `${male.description.slice(0, 21)}...` : male.description}</div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {!M.data.storage("token") && (
                <div className="container">
                    <h2>여성이 많이 조회한 보조금</h2>
                    <ul className="policy-list">
                        {females.map((female, index) => (
                            <li key={female.id} className="policy-item">
                                <Link to={`/detail?id=${female.id}`}>
                                    <div className="policy-details">
                                        <div className="policy-description" style={{ float: 'right', marginTop: '15px' }}>
                                            <FaRegEye /> {female.views}
                                        </div>
                                        <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {index + 1}&nbsp; {female.title.length > 18 ? `${female.title.slice(0, 18)}...` : female.title}
                                        </span>
                                        <div className="policy-agency">{female.description.length > 21 ? `${female.description.slice(0, 21)}...` : female.description}</div>
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
                                        <div className="policy-description" style={{ float: 'right', marginTop: '15px' }}>
                                            <FaRegEye /> {female.views}
                                        </div>
                                        <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {index + 1}&nbsp; {female.title.length > 18 ? `${female.title.slice(0, 18)}...` : female.title}
                                        </span>
                                        <div className="policy-agency">{female.description.length > 21 ? `${female.description.slice(0, 21)}...` : female.description}</div>
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
                                        <div className="policy-description" style={{ float: 'right', marginTop: '15px' }}>
                                            <FaRegEye /> {marry.views}
                                        </div>
                                        <span className="policy-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {index + 1}&nbsp; {marry.title.length > 18 ? `${marry.title.slice(0, 18)}...` : marry.title}
                                        </span>
                                        <div className="policy-agency">{marry.description.length > 21 ? `${marry.description.slice(0, 21)}...` : marry.description}</div>
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