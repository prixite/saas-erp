import React from "react";
import { Button as MuiButton } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     // margin: theme.spacing(0.5),
//     // marginLeft: "15px",
//     marginLeft: "10px",
//   },
//   label: {
//     textTransform: "none",
//   },
// }));

interface props {
  text: string;
  size: number;
  color: string;
  variant: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon: string;
}

export default function Button({
  text,
  size,
  color,
  variant,
  onClick,
  icon,
  ...other
}: props) {
  return (
    <MuiButton
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      //   color="primary"
      onClick={onClick}
      {...other}
      //   classes={{ root: classes.root, label: classes.label }}
    >
      {icon}
      {text}
    </MuiButton>
  );
}
