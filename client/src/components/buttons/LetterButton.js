import React, { useState } from "react";
import styled from "styled-components";
import cn from "classnames";

const LetterButton = ({ className }) => {
  const [on, toggle] = useState(false);
  return (
    <div className={className} onClick={() => toggle(!on)}>
      <div className={cn("background", { succeed: on })} />
      <div className={cn("letter-container", { "succeed-letter": on })}>A</div>
      <div className={cn("tick-1", { succeed: on })} />
      <div className={cn("tick-2", { succeed: on })} />
    </div>
  );
};

const StyledLetterButton = styled(LetterButton)`
  background-color: white;
  color: black;
  width: 30px;
  height: 30px;
  font-size: 1.5rem;
  line-height: 30px;
  position: relative;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
  border-style: solid;
  border-width: 2px;
  border-color: #727272 #ddd #ddd #727272;
  border-radius: 5px;
  transition: all 0.2s ease-in;

  &:hover {
    border-color: #ddd #727272 #727272 #ddd;
  }
  .background {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 1;
    &.failed {
      background-color: lightcoral;
    }
    &.succeed {
      background-color: lightgreen;
    }
  }

  .letter-container {
    position: relative;
    z-index: 3;
    &.failed-letter {
      color: white;
    }
    &.succeed-letter {
      color: black;
    }
  }
  .tick-1,
  .tick-2 {
    position: absolute;
    width: 4px;
    height: 0px;

    transition: all 0.2s ease-in;
    z-index: 2;
  }
  .tick-1 {
    &.failed {
      transform: translate(14px, -25px) rotate(45deg);
      height: 20px;
      background-color: brown;
    }
    &.succeed {
      transform: translate(18px, -25px) rotate(45deg);
      height: 20px;
      background-color: green;
    }
    transform: translate(-10px, 0px) rotate(45deg);
  }
  .tick-2 {
    &.failed {
      transform: translate(14px, -25px) rotate(-45deg);
      height: 20px;
      background-color: brown;
    }
    &.succeed {
      transform: translate(8px, -20px) rotate(-45deg);
      height: 15px;
      background-color: green;
    }
    transform: translate(38px, 0px) rotate(-45deg);
  }
`;

export default StyledLetterButton;
