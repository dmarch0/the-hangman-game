import React from "react";
import styled from "styled-components";
import cn from "classnames";

const WordDisplay = ({ className, game, data }) => {
  const { currentState } = data;
  return (
    <div className={className}>
      {currentState.map((letter, index) => (
        <div
          className={cn("letter-container", { content: letter !== "_" })}
          key={index}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};

const StyledWordDisplay = styled(WordDisplay)`
  font-size: 4rem;
  text-align: center;

  .letter-container {
    display: inline-block;
    height: 4rem;
    width: 50px;
    line-height: 4rem;
    margin: 10px;
  }
  .content {
  }
`;

const mapStateToProps = state => ({ game: state.game });

export default StyledWordDisplay;
