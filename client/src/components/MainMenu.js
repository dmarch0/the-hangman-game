import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cn from "classnames";

import MenuLink from "./buttons/MenuLink";

const MainMenu = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className={cn(className, { mounted })}>
      <MenuLink to="/game">new game</MenuLink>
      <MenuLink to="/stats">stats</MenuLink>
    </div>
  );
};

const StyledMainMenu = styled(MainMenu)`
  transform: translate(0px, 20px);
  opacity: 0;
  transition: all 0.2s ease-in;
  &.mounted {
    transform: translate(0px, 0px);
    opacity: 1;
  }
`;

export default StyledMainMenu;
