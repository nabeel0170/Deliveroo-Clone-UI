import { Button } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface StyledOrderButtonProps {
  name?: string;
  Icon: SvgIconComponent; // Type for Material-UI icons
}

const StyledOrderButton: React.FC<StyledOrderButtonProps> = ({
  name,
  Icon,
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "white",
        display: "flex",
        color: "#2E3333",
        border: "1px solid #dadce0",
        boxShadow: "none",
        minHeight: "35px",
        fontSize: "16px",
        textWrap: "wrap",
        textTransform: "none",
        "&:hover": {
          borderColor: "#c5c9d1",
          backgroundColor: "white",
          color: "black",
          boxShadow: "none",
        },
      }}
    >
      <Icon sx={{ fontSize: "18px", color: "#00ccbc", padding: "4px" }} />
      {name && name}
    </Button>
  );
};
export default StyledOrderButton;
