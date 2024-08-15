import { Box, useMediaQuery } from "@mui/material";
import FooterSection from "./FooterSection";
import { footerItems } from "./footerItems";
import FooterBottomRow from "./FooterBottom";
import theme from "../../theme";

const Footer: React.FC = () => {
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <footer>
      <Box
        sx={{
          background: "#2e3333",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",

          padding: "20px",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: isDownMd ? "wrap" : "no-wrap",

              flexGrow: 1,
            }}
          >
            <FooterSection
              title={footerItems.DiscoverDeliveroo.title}
              listItem={footerItems.DiscoverDeliveroo.items}
            />
            <FooterSection
              title={footerItems.Legal.title}
              listItem={footerItems.Legal.items}
            />
            <FooterSection
              title={footerItems.Help.title}
              listItem={footerItems.Help.items}
            />
            <FooterSection
              title={footerItems.Download.title}
              image={footerItems.Download.images}
            />{" "}
          </Box>
          <Box sx={{ display: "flex" }}>
            <FooterBottomRow />
          </Box>
        </Box>
      </Box>
    </footer>
  );
};
export default Footer;
