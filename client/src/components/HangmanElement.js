import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cn from "classnames";

const HangmanElement = ({ isDisplayed, className, children }) => {
  const [settled, settle] = useState(false);
  useEffect(() => {
    if (isDisplayed) {
      settle(true);
      const id = setTimeout(() => settle(false), 200);
      return () => clearTimeout(id);
    }
  }, [isDisplayed]);
  return (
    <span
      className={cn(className, { displayed: isDisplayed, pulsed: settled })}
    >
      {children}
    </span>
  );
};

const StyledElement = styled(HangmanElement)`
  opacity: 0.2;
  display: inline-block;
  transition: all 0.2s ease-in;
  transform: scale(1, 1);
  &.displayed {
    opacity: 1;
  }
  &.pulsed {
    transform: scale(1.5, 1.5);
  }
`;

export default StyledElement;
