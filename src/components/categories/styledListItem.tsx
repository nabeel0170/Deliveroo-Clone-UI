import styled from "styled-components";

const StyledListItem = styled.li<{ isSelected: boolean }>`
  border: ${(props) => (props.isSelected ? "2px #00ccbc solid" : "none")};
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  border-radius: 15px;
  margin: 5px;
  padding: 2px 10px;
  list-style-type: none;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  align-items: center; /* Center text vertically */
  min-width: 0; /* Allow items to shrink if needed */
  color: ${(props) => (props.isSelected ? "white" : "")};
  background-color: ${(props) => (props.isSelected ? "#00ccbc" : "none")};
  &:hover {
    background-color:; /* Hover effect */
  }
`;

export default StyledListItem;
