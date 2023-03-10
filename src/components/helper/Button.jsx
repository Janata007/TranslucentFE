import React from "react";
import Loader from "./Loader";
import "../../styles/components/Button.css";

const Button = ({ onButtonClick, text, loading }) => {
  const onClick = (e) => {
    e.preventDefault();
    onButtonClick();
  };

  return (
    <button className="button" onClick={(e) => onClick(e)}>
      {loading ? <Loader /> : text}
    </button>
  );
};

export default Button;
