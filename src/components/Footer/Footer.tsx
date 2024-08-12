import { Box } from "@mui/material";
import FooterSection from "./FooterSection";
import { footerItems } from "./footerItems";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        position: "relative",
        bottom: 0,
        background: "#2e3333",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box>
        <FooterSection
          title={footerItems.DiscoverDeliveroo.title}
          listItem={footerItems.DiscoverDeliveroo.items}
        />
      </Box>
      <Box>
        <FooterSection
          title={footerItems.Legal.title}
          listItem={footerItems.Legal.items}
        />
      </Box>
      <Box>
        <FooterSection
          title={footerItems.Help.title}
          listItem={footerItems.Help.items}
        />
      </Box>
      <Box>
        <FooterSection
          title={footerItems.Download.title}
          image={footerItems.Download.images}
        />
      </Box>
    </footer>
  );
};
export default Footer;
