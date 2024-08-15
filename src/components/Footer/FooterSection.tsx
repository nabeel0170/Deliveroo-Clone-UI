import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
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
    font-size: 14px;
  }
`;

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  background: "#404a4a",
  maxWidth: "270px",
  minWidth: "190px",
  flexGrow: 1,
  flexBasis: "calc(50% - 16px)",
  margin: " 10px",
  padding: "10px",
  boxSizing: "border-box",
  minHeight: "400px",
  [theme.breakpoints.down("md")]: {
    flexBasis: "calc(50% - 20px)",
    maxWidth: "400px",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "none",
  },
}));

const FooterSection: React.FC<FooterSectionProps> = ({
  title,
  listItem,
  image,
}) => {
  const theme = useTheme();

  return (
    <StyledBox theme={theme}>
      <Box>
        <Typography color="white" sx={{ fontSize: "18px", fontWeight: "bold" }}>
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
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </a>
            ))}
          </ul>
        )}
      </Box>
    </StyledBox>
  );
};

export default FooterSection;
