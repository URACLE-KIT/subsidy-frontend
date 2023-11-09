import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Main = () => {
  const [policies, setPolicies] = useState([]);
  const [category, setCategory] = useState([]);
  const [reviews, setReviews] = useState([]);

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

  return (
    <>
      <div className="category-group">
        <div className="category">
          <h3>맞춤보조금</h3>
          <p>{total}건</p>
        </div>

        {category.map((category, index) => (
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
                  <div className="policy-title">{top4Items.title}</div>
                  <div className="policy-description">
                    {top4Items.description}
                  </div>
                  <div className="policy-date" style={{ maxWidth: "100%" ,display: "inline-block" }}>
                    {top4Items.application_period}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="container">
        <h2>후기 소식</h2>
        <ul className="policy-list">
          {reviews.slice(0, 4).map((review) => (
            <li className="policy-item">
              <Link to={`/detail?id=${review.id}&review`}>
                <div className="policy-details">
                  <div className="policy-title">
                    {review.title}
                  </div>
                  <div className="policy-description">
                    {review.content}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="container">
        <h2>홍보 소식</h2>
      </div>

      <div className="container">
        <h2>신규 보조금 20</h2>
        <ul className="policy-list">
          {policies.slice(0, 20).map((policy) => (
            <li key={policy.id} className="policy-item">
              <Link to={`/detail?id=${policy.id}`}>
                <div className="policy-details">
                  <div className="policy-agency">{policy.agency}</div>
                  <div className="policy-title">{policy.title}</div>
                  <div className="policy-description">
                    {policy.description}
                  </div>
                  <div className="policy-date" style={{ maxWidth: "100%" ,display: "inline-block" }}>
                    {policy.application_period}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Main;
