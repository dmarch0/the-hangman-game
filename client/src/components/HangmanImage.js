import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cn from "classnames";
import { connect } from "react-redux";

const HangmanImage = ({ className, game }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const lives = game.data ? game.data.livesLeft : 10;
  return (
    <div className={cn(className, { mounted })}>
      <div>
        <span className={cn({ displayed: lives <= 6 })}>__________</span>
      </div>
      <div>
        <span className={cn({ displayed: lives <= 7 })}>|</span>
        &emsp;&emsp;&emsp;
        <span className={cn({ displayed: lives <= 5 })}>|</span>
      </div>
      <div>
        <span className={cn({ displayed: lives <= 7 })}>|</span>
        &emsp;&emsp;&emsp;
        <span className={cn({ displayed: lives <= 4 })}>@</span>
      </div>
      <div>
        <span className={cn({ displayed: lives <= 7 })}>|</span>
        &emsp;&emsp;&emsp;
        <span className={cn({ displayed: lives <= 3 })}>/</span>
        <span className={cn({ displayed: lives <= 2 })}>|</span>
        <span className={cn({ displayed: lives <= 1 })}>\</span>
      </div>
      <div>
        <span className={cn({ displayed: lives <= 7 })}>|</span>
        &emsp;&emsp;&emsp;&nbsp;
        <span className={cn({ displayed: lives <= 0 })}>/\</span>
      </div>
      <div>
        <span className={cn({ displayed: lives <= 7 })}>|</span>
        <span className={cn({ displayed: lives <= 8 })}>_________</span>
      </div>
      <div>
        <span className={cn({ displayed: lives <= 9 })}>|</span>
        &emsp;&emsp;&emsp;
        <span className={cn({ displayed: lives <= 9 })}>|</span>
      </div>
    </div>
  );
};

const StyledImage = styled(HangmanImage)`
  font-size: 2rem;
  margin: 20px 0px;
  cursor: default;
  transform: translate(0px, -20px);
  opacity: 0;
  transition: all 0.2s ease-in;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  span {
    opacity: 0.2;
    &.displayed {
      opacity: 1;
    }
  }
  &.mounted {
    transform: translate(0px, 0px);
    opacity: 1;
  }
`;

const mapStateToProps = state => ({ game: state.game });

export default connect(
  mapStateToProps,
  {}
)(StyledImage);
