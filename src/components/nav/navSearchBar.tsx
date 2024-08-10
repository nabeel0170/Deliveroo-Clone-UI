import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

const NavSearchBar: React.FC = () => {
  const theme = useTheme();
  const screenSizeDownMd = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchBarState, setSearchBarState] = useState(true);

  useEffect(() => {
    setSearchBarState(!screenSizeDownMd);
  }, [screenSizeDownMd]);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    "&:focus-within": {
      border: "2px solid black",
    },
    marginLeft: 0,
    border: "#dadce0 0.5px solid",
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    maxHeight: "35px",
    fontSize: "0.75rem",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),

      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
    },
  }));
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      {searchBarState ? (
        <Search>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: "#dadce0" }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search Tossed - St Martin's Lane"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      ) : (
        <Button
          sx={{
            border: "1px solid #dadce0",
            borderRadius: "4px",
          }}
        >
          <SearchIcon
            sx={{
              color: "#00ccbc",
              fontSize: "1.3rem",
            }}
          />
        </Button>
      )}
    </Box>
  );
};
export default NavSearchBar;
