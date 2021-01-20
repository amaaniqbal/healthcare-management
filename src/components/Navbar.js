import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

const { REACT_APP_BASE_URL, REACT_APP_CLIENT_ID } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    padding: "8px",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const aboutURL = REACT_APP_BASE_URL + "about";
  const patientAuthorizeURL = `https://drchrono.com/o/authorize/?redirect_uri=${encodeURIComponent(
    REACT_APP_BASE_URL + "authorize"
  )}&response_type=code&client_id=${encodeURIComponent(REACT_APP_CLIENT_ID)}`;
  const doctorAuthorizeURL = `https://drchrono.com/o/authorize/?redirect_uri=${encodeURIComponent(
    REACT_APP_BASE_URL + "authorize"
  )}&response_type=code&client_id=${encodeURIComponent(REACT_APP_CLIENT_ID)}`;

  const isPatientLoginActive = localStorage.getItem("patientLogin") === "true";
  const isDoctorLoginActive = localStorage.getItem("doctorLogin") === "true";

  const handlePatientLoginButtonClick = () => {
    localStorage.setItem("patientLogin", true);
    localStorage.setItem("doctorLogin", false);

    window.location.href = patientAuthorizeURL;
  };
  const handleDoctorLoginButtonClick = () => {
    localStorage.setItem("patientLogin", false);
    localStorage.setItem("doctorLogin", true);

    window.location.href = doctorAuthorizeURL;
  };
  const handleSearchPatientsButtonClick = () => {
    window.location.href = REACT_APP_BASE_URL + "search-patients";
  };
  const handleSearchDoctorsButtonClick = () => {
    window.location.href = REACT_APP_BASE_URL + "search-doctors";
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="transparent">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href={REACT_APP_BASE_URL}>
              <img src="/drchrono_logo.png" alt="logo" />
            </Link>
          </Typography>
          <Box>
            <Button variant="contained" color="default" href={aboutURL}>
              About
            </Button>
          </Box>
          {isPatientLoginActive && (
            <Box ml={2}>
              <Button
                variant="contained"
                color="primary"
                target="_blank"
                onClick={handleSearchDoctorsButtonClick}
              >
                Search Doctors
              </Button>
            </Box>
          )}
          {!isPatientLoginActive && (
            <Box ml={2}>
              <Button
                variant="contained"
                color="primary"
                target="_blank"
                onClick={handlePatientLoginButtonClick}
              >
                Patient Login
              </Button>
            </Box>
          )}
          {isDoctorLoginActive && (
            <Box ml={2}>
              <Button
                variant="contained"
                color="secondary"
                target="_blank"
                onClick={handleSearchPatientsButtonClick}
              >
                Search Patients
              </Button>
            </Box>
          )}
          {!isDoctorLoginActive && (
            <Box ml={2}>
              <Button
                variant="contained"
                color="secondary"
                target="_blank"
                onClick={handleDoctorLoginButtonClick}
              >
                Doctor Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
