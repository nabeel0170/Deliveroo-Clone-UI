import React from "react";
import { Box, Link, Typography } from "@mui/material";
import styled from "@emotion/styled";

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

const FooterSection: React.FC<FooterSectionProps> = ({
  title,
  listItem = [],
  image = [],
}) => {
  return (
    <Box
      sx={{
        background: "#404a4a",
        maxWidth: "190px",
        width: "190px",
        padding: "10px",
        maxHeight: "350px",
        height: "100%",
        marginTop: "20px",
        marginBottom: "20px",
        marginLeft: "10px",
        marginRight: "10px",
      }}
    >
      <Typography
        color={"white"}
        sx={{ fontSize: "0.95rem", fontWeight: "bold" }}
      >
        {title}
      </Typography>
      {listItem && listItem.length > 0 && (
        <StyledUl>
          {listItem.map((item, index) => (
            <li key={index} style={{}}>
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
                style={{
                  display: "flex",
                  maxWidth: "140px",
                  maxHeight: "40px",
                  marginBottom: "10px",
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
    </Box>
  );
};

export default FooterSection;
