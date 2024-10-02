import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';

interface StyledListItemProps {
  children?: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
  id?: number;
}

const ListItemButton = styled.button<{
  isSelected?: boolean;
  buttonWidth: number;
  isScrolled?: boolean;
}>`
  font-size: 14px;
  width: ${(props) => props.buttonWidth + 30}px; /* Add extra space */
  height: 25px;
  min-width: 100px;
  padding: 2px 16px;
  cursor: pointer;
  background: ${(props) =>
    props.isSelected && props.isScrolled ? '#00CCBC' : 'transparent'};
  color: ${(props) =>
    props.isSelected && props.isScrolled ? 'white' : '#00CCBC'};
  border: ${(props) => (props.isSelected ? '2px solid #00ccbc' : 'none')};
  border-radius: 15px;
  font-weight: ${(props) => (props.isSelected ? 'bold' : 'normal')};
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
  id,
  onClick,
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [buttonWidth, setButtonWidth] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      setIsScrolled(false);

      scrollTimeoutRef.current = setTimeout(() => {
        if (currentScrollY === window.scrollY) {
          setIsScrolled(true);
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (textRef.current) {
      setButtonWidth(textRef.current.offsetWidth);
    }
  }, [children]);

  return (
    <li style={{ display: 'inline-block' }}>
      <ListItemButton
        isSelected={isSelected}
        isScrolled={isScrolled}
        onClick={onClick}
        buttonWidth={buttonWidth}
        id={id?.toString()}
      >
        <span ref={textRef}>{children}</span>
      </ListItemButton>
    </li>
  );
};
