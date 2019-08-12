import React from "react";
import styled, { keyframes } from "styled-components";

const Spinner = ({ className }) => {
  return (
    <div className={className}>
      <div>@</div>
      <div>/|\</div>
      <div>/\</div>
    </div>
  );
};

const rotate = keyframes`
    from {
        transform:rotate(0deg);
    }

    to {
        transform:rotate(360deg);
    }
`;

const StyledSpinner = styled(Spinner)`
  font-size: 2rem;
  animation: ${rotate} 2s linear infinite;
  width: fit-content;
`;

export default StyledSpinner;
