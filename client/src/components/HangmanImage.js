import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cn from "classnames";

const HangmanImage = ({ className, lives }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className={cn(className, { mounted })}>
      <div>__________</div>
      <div>|&emsp;&emsp;&emsp;|</div>
      <div>
        |&emsp;&emsp;&emsp;<span>@</span>
      </div>
      <div>|&emsp;&emsp;&emsp;/|\</div>
      <div>|&emsp;&emsp;&emsp;&nbsp;/\</div>
      <div>
        <span>|</span>
        <span>_________</span>
      </div>
      <div>
        <span>|</span>&emsp;&emsp;&emsp;
        <span>|</span>
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
  &.mounted {
    transform: translate(0px, 0px);
    opacity: 1;
  }
`;

export default StyledImage;
