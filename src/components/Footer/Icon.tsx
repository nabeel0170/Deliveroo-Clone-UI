import { Icon } from "@mui/material";
import styled from "styled-components";

interface FooterIconProps {
  iconSrc: string;
}

const StyledImg = styled.img`
  height: 20px;
  filter: brightness(0) invert(1);
  &:hover {
    filter: none;
  }
`;

const FooterIcon: React.FC<FooterIconProps> = ({ iconSrc }) => {
  return (
    <Icon sx={{ margin: "10px", height: "fit-content" }}>
      <a href="/">
        <StyledImg src={iconSrc} alt="" />
      </a>
    </Icon>
  );
};
export default FooterIcon;
