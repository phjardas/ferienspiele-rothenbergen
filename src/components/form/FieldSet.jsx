import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default function FieldSet({ icon, title, subtitle, children }) {
  return (
    <Card>
      <CardContent>
        {title && (
          <Box sx={{ display: "flex", mb: 3 }}>
            {icon && <Box sx={{ mr: 1, paddingTop: "2px" }}>{icon}</Box>}
            <Box>
              <Typography variant="h6">{title}</Typography>
              {subtitle && (
                <Typography variant="subtitle1">{subtitle}</Typography>
              )}
            </Box>
          </Box>
        )}
        {children}
      </CardContent>
    </Card>
  );
}
