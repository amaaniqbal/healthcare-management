import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function AuthorizeText() {
  const role =
    localStorage.getItem("patientLogin") === "true" ? "Patient" : "Doctor";

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography component="h1" variant="h1">
        <Box fontWeight="fontWeightLight" m={1}>
          Authorizing {role}...
        </Box>
      </Typography>
    </Box>
  );
}
