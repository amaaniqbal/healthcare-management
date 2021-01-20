import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const { REACT_APP_BASE_URL, REACT_APP_CLIENT_ID } = process.env;

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url("background.png")`,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(to bottom left, rgba(255, 255, 255, 0),rgba(0 , 0, 0, 1));",
  },
  white: {
    color: "white",
  },
}));

export default function Viewport() {
  const classes = useStyles();
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
    <Box className={classes.background}>
      <Box
        className={classes.overlay}
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Container className={classes.white} maxWidth="lg">
          <Box fontWeight="" fontSize={32}>
            Visualize patients and doctors for free!
          </Box>
          <Box fontWeight="fontWeightLight" fontSize={24} my={3}>
            Are you a doctor looking for ways to interact with patient visually?
            <br></br>
            Or, Are you a patient searching for a doctor's appointment?
          </Box>
          <Box fontWeight="fontWeightLight" fontSize={24}>
            You've come to right place!
          </Box>

          <Box mt={4} display="flex">
            {isPatientLoginActive && (
              <Box mr={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSearchDoctorsButtonClick}
                >
                  Search Doctors
                </Button>
              </Box>
            )}
            {!isPatientLoginActive && (
              <Box mr={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePatientLoginButtonClick}
                >
                  Patient Login
                </Button>
              </Box>
            )}
            {isDoctorLoginActive && (
              <Box>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSearchPatientsButtonClick}
                >
                  Search Patients
                </Button>
              </Box>
            )}
            {!isDoctorLoginActive && (
              <Box>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDoctorLoginButtonClick}
                >
                  Doctor Login
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
