import { Box } from "@mui/material";
import FooterSection from "./FooterSection";
import { footerItems } from "./footerItems";
import FooterBottomRow from "./FooterBottom";

const Footer: React.FC = () => {
  return (
    <footer>
      <Box
        sx={{
          position: "relative",
          bottom: 0,
          background: "#2e3333",
          minWidth: "fit-content",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",

            flexDirection: "column",

            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              "@media (max-width: 800px) ": {
                flexWrap: "wrap",
              },
              justifyContent: "center",
            }}
          >
            <FooterSection title={footerItems.DiscoverDeliveroo.title} listItem={footerItems.DiscoverDeliveroo.items} />

            <FooterSection title={footerItems.Legal.title} listItem={footerItems.Legal.items} />

            <FooterSection title={footerItems.Help.title} listItem={footerItems.Help.items} />

            <FooterSection title={footerItems.Download.title} image={footerItems.Download.images} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FooterBottomRow />
          </Box>
        </Box>
      </Box>
    </footer>
  );
};
export default Footer;
