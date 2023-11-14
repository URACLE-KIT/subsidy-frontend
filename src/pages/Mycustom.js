import React, { useState, useEffect } from "react";
import {
  FcHome,
  FcBusinessman,
  FcGraduationCap,
  FcDam,
  FcPlus,
  FcKindle,
  FcLikePlaceholder,
  FcVlc,
  FcGlobe,
  FcLandscape,
} from "react-icons/fc";
import axios from "axios";

const Mycustom = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const buttonsInitialState = [
    {
      value: "생활안정",
      icon: <FcBusinessman size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "주거자립",
      icon: <FcHome size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "보육교육",
      icon: <FcGraduationCap size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "고용창업",
      icon: <FcDam size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "보건의료",
      icon: <FcPlus size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "행정안전",
      icon: <FcKindle size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "임신출산",
      icon: <FcLikePlaceholder size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "보호돌봄",
      icon: <FcVlc size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "문화환경",
      icon: <FcGlobe size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "농림축산 어업",
      icon: <FcLandscape size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
  ];
  const [buttons, setButtons] = useState(buttonsInitialState);
  const [userId, setUserId] = useState("");
  const [storedCategory, setStoredCategory] = useState([]);

  const toggleCategory = (button) => {
    const updatedButtons = buttons.map((btn) => {
      if (btn === button) {
        if (selectedCategory.includes(button.value)) {
          setSelectedCategory(
            selectedCategory.filter((category) => category !== button.value)
          );
          axios
            .delete(`/v1/users/delete-category?userId=${userId}&category=${button.value}`)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error("카테고리 삭제 실패:", error);
            });
        } else {
          setSelectedCategory([...selectedCategory, button.value]);
          axios
            .post(`/v1/users/add-category?userId=${userId}&category=${button.value}`)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error("카테고리 추가 실패:", error);
            });
        }
        btn.backgroundColor =
          btn.backgroundColor === "initial" ? "#6675fc" : "initial";
        btn.textColor = btn.backgroundColor === "initial" ? "black" : "white";
      }

      return btn;
    });

    setButtons(updatedButtons);
  };

  useEffect(() => {
    const storedUserId = M.data.storage("id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`/v1/users/category-list?userId=${userId}`)
      .then((response) => {
        console.log(response.data);
        setStoredCategory(response.data);
      })
      .catch((error) => {
        console.error("카테고리 가져오기 실패:", error);
      });
  }, [userId]);

  useEffect(() => {
    if (storedCategory) {
      setSelectedCategory(storedCategory);
      const updatedButtons = buttons.map((button) => {
        if (storedCategory.includes(button.value)) {
          button.backgroundColor = "#6675fc";
          button.textColor = "white";
        }
        return button;
      });
      setButtons(updatedButtons);
    }
  }, [storedCategory]);

  useEffect(() => {
    M.data.storage({
      category: selectedCategory,
    });
  }, [selectedCategory]);

  return (
    <div className="container">
      <div>
        <h2>맞춤 보조금 카테고리 설정</h2>
      </div>

      <div>
        {buttons.map((button, index) => (
          <button
            key={index}
            className="category-button"
            value={button.value}
            onClick={() => toggleCategory(button)}
            style={{
              backgroundColor: button.backgroundColor,
              color: button.textColor,
            }}
          >
            <div className="category-icon">{button.icon}</div>
            {button.value}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Mycustom;
