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
        display: "flex",
        color: "#2E3333",
        border: "1px solid #e8ebeb",
        boxShadow: "none",
        minHeight: "35px",
        maxHeight: "40px",
        fontSize: "16px",
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
      <Icon sx={{ fontSize: "18px", color: "#00ccbc", padding: "4px" }} />
      {name && name}
    </Button>
  );
};
export default PrimaryButton;
