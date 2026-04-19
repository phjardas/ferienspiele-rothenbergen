import { Typography } from "@mui/material";

export default function H2({ variant = "h5", gutterBottom = true, ...props }) {
  return (
    <Typography
      component="h2"
      variant={variant}
      gutterBottom={gutterBottom}
      {...props}
    />
  );
}
