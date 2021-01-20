import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import Navbar from "../components/Navbar";

// Custom Hook to parse the query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function MessagePatient() {
  const patientId = useQuery().get("patient-id");
  const [patientInfo, setPatientInfo] = useState({});
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const handleSendMessageClick = () => {
    setIsSuccess(false);
    setSubjectError("");

    // Check for valid phone number
    if (!subject) {
      setSubjectError("Subject field cannot be empty!");
    } else {
      const accessToken = localStorage.getItem("accessToken") ?? "";
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + accessToken,
      };

      const data = {
        doctor: localStorage.getItem("doctorId") ?? "",
        patient: patientId,
        subject: subject,
        body: message,
      };

      fetch(
        "https://cors-anywhere.herokuapp.com/https://app.drchrono.com/api/patient_messages",
        {
          method: "POST",
          body: queryString.stringify(data),
          headers: headers,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setIsSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          setSubjectError(error);
        });
    }
  };

  return (
    <Box>
      <Navbar />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={4}>
              <Box>
                <img
                  src={patientInfo.patient_photo}
                  alt={patientInfo.first_name}
                  width={200}
                  height={200}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box fontWeight="fontWeightLight" fontSize={20} m={1}>
                Name:{" "}
                {[
                  patientInfo.first_name,
                  patientInfo.middle_name,
                  patientInfo.last_name,
                ]
                  .filter(Boolean)
                  .join(" ")}
              </Box>
              <Box fontWeight="fontWeightLight" fontSize={20} m={1}>
                Date of Birth: {patientInfo.date_of_birth}
              </Box>
              <Box fontWeight="fontWeightLight" fontSize={20} m={1}>
                Gender: {patientInfo.gender}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box fontWeight="fontWeightLight" fontSize={20} m={1}>
                Email: {patientInfo.email}
              </Box>
              <Box fontWeight="fontWeightLight" fontSize={20} m={1}>
                Phone: {patientInfo.cell_phone}
              </Box>
              <Box fontWeight="fontWeightLight" fontSize={20} m={1}>
                Address: {patientInfo.address}
              </Box>
            </Grid>

            <Grid item xs={12} mt={4}>
              <Box ml={1} my={3} fontSize={32}>
                Message Section
              </Box>
              <Box my={2}>
                <TextField
                  id="outlined-basic"
                  label="Subject"
                  placeholder="Enter your subject here..."
                  variant="outlined"
                  value={subject}
                  onChange={handleSubjectChange}
                  fullWidth
                />
                <Typography variant="subtitle2" color="error" gutterBottom>
                  {subjectError}
                </Typography>
              </Box>
              <Box my={2}>
                <TextField
                  id="outlined-multiline-static"
                  label="Message"
                  multiline
                  rows={4}
                  placeholder="Enter your message here..."
                  variant="outlined"
                  value={message}
                  onChange={handleMessageChange}
                  fullWidth
                />
              </Box>
              <Box textAlign="center" m={2}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<SendIcon />}
                  onClick={handleSendMessageClick}
                >
                  Send Message
                </Button>
              </Box>
              {isSuccess && (
                <Box
                  color="success.main"
                  display="flex"
                  justifyContent="center"
                >
                  <Box mr={1}>
                    <CheckCircleRoundedIcon />
                  </Box>
                  <Box>Message Sent Successfully!</Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
