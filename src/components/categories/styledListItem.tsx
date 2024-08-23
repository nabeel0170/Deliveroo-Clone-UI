import styled from "styled-components";

const StyledListItem = styled.li<{ isselected: boolean }>`
  border: ${(props) => (props.isselected ? "2px #00ccbc solid" : "none")};
  font-weight: ${(props) => (props.isselected ? "bold" : "normal")};
  border-radius: 15px;
  margin: 5px;
  padding: 2px 16px;
  list-style-type: none;
  cursor: pointer;
  box-sizing: border-box;
  align-items: center;
  color: ${(props) => (props.isselected ? "white" : "")};
  background-color: ${(props) => (props.isselected ? "#00ccbc" : "none")};
  &:hover {
    background-color:;
  }
`;

export default StyledListItem;
