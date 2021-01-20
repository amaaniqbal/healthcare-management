import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import getAge from "get-age";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Navbar from "../components/Navbar";

const { REACT_APP_BASE_URL } = process.env;

// Custom Hook to parse the query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ViewPatient() {
  const patientId = useQuery().get("patient-id");
  const [patientInfo, setPatientInfo] = useState({});

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status

    const accessToken = localStorage.getItem("accessToken") ?? "";
    const headers = {
      Authorization: "Bearer " + accessToken,
    };
    fetch(
      `https://cors-anywhere.herokuapp.com/https://app.drchrono.com/api/patients/${patientId}`,
      {
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((patientData) => {
        console.log("Patient Data ", patientData);
        console.log("Mounted? ", isMounted);

        if (isMounted) setPatientInfo(patientData);
      })
      .catch((error) => console.log(error));

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [patientId]);

  const handleMessagePatientClick = () => {
    window.location.href = `${REACT_APP_BASE_URL}message-patient/?patient-id=${patientId}`;
  };

  return (
    <Box>
      <Navbar />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={4}>
              <Box my={2}>
                <img
                  src={patientInfo.patient_photo}
                  alt={patientInfo.first_name}
                  width={200}
                  height={200}
                />
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box fontWeight="fontWeightLight" fontSize={20} my={2}>
                Name:{" "}
                {[
                  patientInfo.first_name,
                  patientInfo.middle_name,
                  patientInfo.last_name,
                ]
                  .filter(Boolean)
                  .join(" ")}
              </Box>
              <Box fontWeight="fontWeightLight" fontSize={20} my={2}>
                Email: {patientInfo.email}
              </Box>
              <Box fontWeight="fontWeightLight" fontSize={20} my={2}>
                Phone: {patientInfo.cell_phone}
              </Box>
              <Box fontWeight="fontWeightLight" fontSize={20} my={2}>
                Address: {patientInfo.address}
              </Box>
              <Box fontWeight="fontWeightLight" fontSize={20} my={2}>
                Date of Birth: {patientInfo.date_of_birth}
              </Box>
              <Box fontWeight="fontWeightLight" fontSize={20} my={2}>
                Age: {getAge(patientInfo.date_of_birth)}
              </Box>
              <Box fontWeight="fontWeightLight" fontSize={20} my={2}>
                Gender: {patientInfo.gender}
              </Box>
              <Box fontWeight="fontWeightLight" fontSize={20} my={2}>
                Race: {patientInfo.race}
              </Box>
              <Box fontWeight="fontWeightLight" fontSize={20} my={2}>
                Ethnicity: {patientInfo.ethnicity}
              </Box>
              <Box fontWeight="fontWeightLight" fontSize={20} my={2}>
                Payment Profile: {patientInfo.patient_payment_profile}
              </Box>
              <Box fontWeight="fontWeightLight" fontSize={20} my={2}>
                Last Appointment:{" "}
                {new Date(patientInfo.date_of_last_appointment).toDateString()}
              </Box>
            </Grid>

            <Grid item xs={12} mt={4}>
              <Box textAlign="center" m={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleMessagePatientClick}
                >
                  Message Patient
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
