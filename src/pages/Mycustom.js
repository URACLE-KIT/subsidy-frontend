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

  const toggleCategory = (button) => {
    const updatedButtons = buttons.map((btn) => {
      if (btn === button) {
        if (selectedCategory.includes(button.value)) {
          setSelectedCategory(selectedCategory.filter((category) => category !== button.value));
        } else {
          setSelectedCategory([...selectedCategory, button.value]);
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
    const storedCategory = M.data.storage("category");

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
  }, []);

  useEffect(() => {
    M.data.storage({
      'category': selectedCategory,
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
