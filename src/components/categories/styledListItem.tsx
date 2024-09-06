import React, { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";

interface StyledListItemProps {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const ListItemButton = styled.button<{
  isSelected: boolean;
  buttonWidth: number;
}>`
  width: ${(props) => props.buttonWidth + 15}px; /* Add extra space */
  height: 20px;
  padding: 2px 16px;
  cursor: pointer;
  background: ${(props) => (props.isSelected ? "#00CCBC" : "transparent")};
  color: ${(props) => (props.isSelected ? "white" : "#00CCBC")};
  border: ${(props) => (props.isSelected ? "2px solid #00ccbc" : "none")};
  border-radius: 15px;
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  white-space: nowrap;
  margin-right: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  transition:
    background-color 0.3s,
    color 0.3s;

  align-items: center;
  display: flex;
  justify-content: center;
`;

export const StyledListItem: React.FC<StyledListItemProps> = ({
  children,
  isSelected,
  onClick,
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [buttonWidth, setButtonWidth] = useState<number>(0);

  useEffect(() => {
    if (textRef.current) {
      setButtonWidth(textRef.current.offsetWidth);
    }
  }, [children]);

  return (
    <li style={{ display: "inline-block", margin: "0 4px" }}>
      <ListItemButton
        isSelected={isSelected}
        onClick={onClick}
        buttonWidth={buttonWidth}
      >
        <span ref={textRef}>{children}</span>
      </ListItemButton>
    </li>
  );
};
