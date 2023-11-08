import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Main = () => {
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

  const sumPolicies = filteredPolicies.reduce((accumulator, currentArray) => {
    return accumulator.concat(currentArray);
  }, []);

  sumPolicies.sort((a, b)=> b.id - a.id);

  const top4Items = sumPolicies.slice(0, 4);

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
          {top4Items.map((top4Items) => (
            <li key={top4Items.id} className="policy-item">
              <Link to={`/detail?id=${top4Items.id}`}>
                <div className="policy-details">
                  <div className="policy-agency">{top4Items.agency}</div>
                  <div className="policy-description">
                    {top4Items.description}
                  </div>
                  <span className="policy-date">
                    {calculateDaysRemaining(top4Items.date)}
                  </span>
                  <span className="policy-title">{top4Items.title}</span>
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
