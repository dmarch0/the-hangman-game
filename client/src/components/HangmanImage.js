import React from "react";
import styled from "styled-components";

const HangmanImage = ({ className, lives }) => {
  return (
    <div className={className}>
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
`;

export default StyledImage;
