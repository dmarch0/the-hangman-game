import styled from "styled-components";

const StyledMainButton = styled.button`
  display: block;
  font-size: 2rem;
  color: black;
  background-color: white;
  border-style: solid;
  border-width: 2px;
  border-color: #727272 #ddd #ddd #727272;
  border-radius: 5px;
  text-decoration: none;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  text-align: center;
  margin: 10px auto;
  width: fit-content;
  min-width: 200px;
  &:hover {
    border-color: #ddd #727272 #727272 #ddd;
  }
`;

export default StyledMainButton;
