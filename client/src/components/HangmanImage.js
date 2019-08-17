import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cn from "classnames";
import { connect } from "react-redux";

import HangmanElement from "./HangmanElement";

const HangmanImage = ({ className, game }) => {
  const lives = game.data.livesLeft;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={cn(className, { mounted })}>
      <div>
        <HangmanElement children="__________" isDisplayed={lives <= 6} />
      </div>
      <div>
        <HangmanElement children="|" isDisplayed={lives <= 7} />
        &emsp;&emsp;&emsp;
        <HangmanElement children="|" isDisplayed={lives <= 5} />
      </div>
      <div>
        <HangmanElement children="|" isDisplayed={lives <= 7} />
        &emsp;&emsp;&emsp;
        <HangmanElement children="@" isDisplayed={lives <= 4} />
      </div>
      <div>
        <HangmanElement children="|" isDisplayed={lives <= 7} />
        &emsp;&emsp;&emsp;
        <HangmanElement children="/" isDisplayed={lives <= 3} />
        <HangmanElement children="|" isDisplayed={lives <= 2} />
        <HangmanElement children="\" isDisplayed={lives <= 1} />
      </div>
      <div>
        <HangmanElement children="|" isDisplayed={lives <= 7} />
        &emsp;&emsp;&emsp;&nbsp;
        <HangmanElement children="/\" isDisplayed={lives <= 0} />
      </div>
      <div>
        <HangmanElement children="|" isDisplayed={lives <= 7} />
        <HangmanElement children="_________" isDisplayed={lives <= 8} />
      </div>
      <div>
        <HangmanElement children="|" isDisplayed={lives <= 9} />
        &emsp;&emsp;&emsp;
        <HangmanElement children="|" isDisplayed={lives <= 9} />
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
