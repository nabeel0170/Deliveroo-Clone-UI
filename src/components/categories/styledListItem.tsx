import styled from "styled-components";

const StyledListItem = styled.li<{ isSelected: boolean }>`
  border: ${(props) => (props.isSelected ? "2px #00ccbc solid" : "none")};
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  border-radius: 15px;
  margin: 5px;
  padding: 2px 16px;
  list-style-type: none;
  cursor: pointer;
  box-sizing: border-box;
  align-items: center;
  color: ${(props) => (props.isSelected ? "white" : "")};
  background-color: ${(props) => (props.isSelected ? "#00ccbc" : "none")};
  &:hover {
    background-color:;
  }
`;

export default StyledListItem;
