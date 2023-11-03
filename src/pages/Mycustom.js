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
  const [selectedTag, setSelectedTag] = useState([]);
  const buttonsInitialState = [
    {
      value: "생활안정",
      icon: <FcBusinessman size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "주거·자립",
      icon: <FcHome size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "보육·교육",
      icon: <FcGraduationCap size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "고용·창업",
      icon: <FcDam size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "보건·의료",
      icon: <FcPlus size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "행정·안전",
      icon: <FcKindle size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "임신·출산",
      icon: <FcLikePlaceholder size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "보호·돌봄",
      icon: <FcVlc size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "문화·환경",
      icon: <FcGlobe size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "농림축산어업",
      icon: <FcLandscape size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
  ];
  const [buttons, setButtons] = useState(buttonsInitialState);

  const toggleTag = (button) => {
    const updatedButtons = buttons.map((btn) => {
      if (btn === button) {
        if (selectedTag.includes(button.value)) {
          setSelectedTag(selectedTag.filter((tag) => tag !== button.value));
        } else {
          setSelectedTag([...selectedTag, button.value]);
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
    const storedTags = JSON.parse(localStorage.getItem("tags"));
    
    if (storedTags) {
      setSelectedTag(storedTags);
      // 로컬 스토리지에서 가져온 태그에 해당하는 버튼 상태를 업데이트
      const updatedButtons = buttons.map((button) => {
        if (storedTags.includes(button.value)) {
          button.backgroundColor = "#6675fc";
          button.textColor = "white";
        }
        return button;
      });
      setButtons(updatedButtons);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(selectedTag));
  }, [selectedTag]);

  return (
    <div className="container">
      <div><h2>맞춤 정책 카테고리 설정</h2></div>

      <div>
        {buttons.map((button, index) => (
          <button
            key={index}
            className="tag-button"
            value={button.value}
            onClick={() => toggleTag(button)}
            style={{
              backgroundColor: button.backgroundColor,
              color: button.textColor,
            }}
          >
            <div className="tag-icon">{button.icon}</div>
            {button.value}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Mycustom;
