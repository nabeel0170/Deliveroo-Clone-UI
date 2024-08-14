import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";

interface FooterSectionProps {
  title: string;
  listItem?: string[];
  image?: string[];
}

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  a:hover {
    color: #00ccbc;
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 0.65rem;
  }
`;
const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  background: #404a4a;
  max-width: 220px;
  width: 220px;

  padding: 20px;
  min-height: 320px;
  margin: 5px;
  flex-grow: 1;
  box-sizing: border-box;
  flex-shrink: 1;

  @media (max-width: 800px) {
    max-width: 350px;
    width: 240px;
  }
`;

const FooterSection: React.FC<FooterSectionProps> = ({ title, listItem, image }) => {
  return (
    <StyledBox>
      <Typography color={"white"} sx={{ fontSize: "0.95rem", fontWeight: "bold" }}>
        {title}
      </Typography>
      {listItem && listItem.length > 0 && (
        <StyledUl>
          {listItem.map((item, index) => (
            <li key={index}>
              <a href="/">{item}</a>
            </li>
          ))}
        </StyledUl>
      )}
      {image && image.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            alignItems: "flex-start",
          }}
        >
          {image.map((src, index) => (
            <a href="/" key={index}>
              <Box
                sx={{
                  display: "flex",
                  maxWidth: "140px",
                  maxHeight: "40px",
                  marginBottom: "10px",
                  boxSizing: "border-box",
                }}
              >
                <img
                  src={src}
                  alt={title}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </a>
          ))}
        </ul>
      )}
    </StyledBox>
  );
};

export default FooterSection;
