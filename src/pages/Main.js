import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const customData = [
  {
    id: 1,
    agency: "서민금융진흥원",
    title: "청년도약계좌",
    description: "서민금융진흥원에서 제공하는 정책입니다.",
    date: "2023-12-31",
    category: "전체",
    bookmarked: false,
  },
  {
    id: 2,
    agency: "보건복지부",
    title: "생계급여",
    description: "보건복지부에서 제공하는 정책입니다.",
    date: "2023-12-31",
    category: "전체",
    bookmarked: false,
  },
  {
    id: 3,
    agency: "국토교통부",
    title: "청년우대형청약통장",
    description: "국토교통부에서 제공하는 정책입니다.",
    date: "2023-12-31",
    category: "전체",
    bookmarked: false,
  },
  {
    id: 4,
    agency: "서민금융진흥원",
    title: "청년도약계좌",
    description: "서민금융진흥원에서 제공하는 정책입니다.",
    date: "2023-12-01",
    category: "전체",
    bookmarked: false,
  },
];

const Main = () => {
  const [customs, setCustoms] = useState(customData);
  const [policies, setPolicies] = useState([]);
  const storedCategory = M.data.storage("category");

  var total = 0;
  var filteredPolicies = [];
  var count = [];
  
  storedCategory.map((c)=>(
    filteredPolicies.push(policies.filter((policy)=>policy.category === c))
  ))

  filteredPolicies.map((fp)=>(
    count.push(fp.length)
  ))
  count.map((count)=>(
    total += count
  ))

  useEffect(() => {
    axios
      .get("/v1/subsidies/all")
      .then((response) => {
        setPolicies(response.data);
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
      });
  }, []);

  const calculateDaysRemaining = (date) => {
    const currentDate = new Date();
    const policyDate = new Date(date);
    const timeDifference = policyDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (daysRemaining < 0) {
      return `D+${Math.abs(daysRemaining)}`;
    } else if (daysRemaining === 0) {
      return "D-DAY";
    } else {
      return `D-${daysRemaining}`;
    }
  };

  return (
    <>
      <div className="category-group">
        <div className="category">
          <h3>맞춤보조금</h3>
          <p>{total}건</p>
        </div>

        {storedCategory.map((category, index) => (
          <div className="category">
            <h3>{category}</h3>
            <p>{count[index]}건</p>
          </div>
        ))}
      </div>

      <div className="container">
        <h2>맞춤보조금</h2>
        <ul className="policy-list">
          {customs.map((customs) => (
            <li key={customs.id} className="policy-item">
              <Link to={`/detail?id=${customs.id}`}>
                <div className="policy-details">
                  <div className="policy-agency">{customs.agency}</div>
                  <div className="policy-description">
                    {customs.description}
                  </div>
                  <span className="policy-date">
                    {calculateDaysRemaining(customs.date)}
                  </span>
                  <span className="policy-title">{customs.title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="container">
        <h2>후기 소식</h2>
      </div>

      <div className="container">
        <h2>홍보 소식</h2>
      </div>

      <div className="container">
        <h2>신규 보조금 20</h2>
      </div>
    </>
  );
};

export default Main;
