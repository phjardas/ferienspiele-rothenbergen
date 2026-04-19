import { Typography } from "@mui/material";

export default function H3({ variant = "h6", gutterBottom = true, ...props }) {
  return (
    <Typography
      component="h2"
      variant={variant}
      gutterBottom={gutterBottom}
      {...props}
    />
  );
}
