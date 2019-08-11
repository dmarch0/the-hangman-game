import React from "react";

import MenuLink from "./buttons/MenuLink";

const MainMenu = () => {
  return (
    <div>
      <MenuLink to="/new">new game</MenuLink>
      <MenuLink to="/stats">stats</MenuLink>
    </div>
  );
};

export default MainMenu;
