import React, { useState } from "react";
import { FcHome, FcBusinessman, FcGraduationCap } from "react-icons/fc";

const Mycustom = () => {
  //const [selectedTag, setSelectedTag] = useState([]);
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
      icon: <FcHome size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "보건·의료",
      icon: <FcHome size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "행정·안전",
      icon: <FcHome size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "임신·출산",
      icon: <FcHome size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "보호·돌봄",
      icon: <FcHome size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "문화·환경",
      icon: <FcHome size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
    {
      value: "농림축산어업",
      icon: <FcHome size="24" />,
      backgroundColor: "initial",
      textColor: "black",
    },
  ];
  const [buttons, setButtons] = useState(buttonsInitialState);

  const toggleTag = (button) => {
    const updatedButtons = buttons.map((btn) => {
      if (btn === button) {
        btn.backgroundColor =
          btn.backgroundColor === "initial" ? "#6675fc" : "initial";
        btn.textColor = btn.backgroundColor === "initial" ? "black" : "white";
      }
      return btn;
    });

    setButtons(updatedButtons);
  };

  return (
    <div className="container">
      <div>맞춤 정책 태그 설정</div>

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
      <button className="tag-savebutton">저장</button>
    </div>
  );
};
export default Mycustom;
