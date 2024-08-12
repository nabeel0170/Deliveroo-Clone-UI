import { Button } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface PrimaryButtonProps {
  name?: string;
  Icon: SvgIconComponent; // Type for Material-UI icons
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ name, Icon }) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "white",
        color: "black",
        border: "1px solid #dadce0",
        boxShadow: "none",
        maxHeight: "35px",
        fontSize: "0.65rem",
        textWrap: "nowrap",
        textTransform: "none",
        "&:hover": {
          borderColor: "#c5c9d1",
          backgroundColor: "white",
          color: "black",
          boxShadow: "none",
        },
      }}
    >
      <Icon sx={{ marginRight: "5px", fontSize: "1.1rem", color: "#00ccbc" }} />
      {name && name}
    </Button>
  );
};
export default PrimaryButton;
