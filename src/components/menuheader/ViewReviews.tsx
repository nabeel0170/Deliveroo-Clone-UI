import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import { Box, Link, Typography } from "@mui/material";

const ViewReviews: React.FC = () => {
  return (
    <Box sx={{ marginBottom: "5px", marginLeft: "10px", minWidth: "250px" }}>
      <Link href="/" sx={{ color: "inherit", textDecoration: "none" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            marginTop: "15px",
          }}
        >
          <StarIcon
            sx={{
              marginRight: "10px",
              color: "#4d7c1b",
              borderRadius: "13px",
              fontSize: "24px",
            }}
          />

          <Box>
            <Box
              sx={{
                width: "fit-content",
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontSize: "16px", color: "#4d7c1b" }}
              >
                4.7 Excellent
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "14px" }}>
                See all 500 reviews
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "5px",
            }}
          >
            <ArrowForwardIosIcon
              sx={{
                fontSize: "18px",
                color: "#00ccbc",
                marginLeft: "5px",
              }}
            />
          </Box>
        </Box>
      </Link>
    </Box>
  );
};
export default ViewReviews;
