import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import MeetingRoomSharpIcon from "@material-ui/icons/MeetingRoomSharp";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import Navbar from "../components/Navbar";

// Custom Hook to parse the query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BookAppointment() {
  const doctorId = useQuery().get("doctor-id");
  const [doctorInfo, setDoctorInfo] = useState({});
  const [date, setDate] = useState(new Date());
  const [appointmentSlot, setAppointmentSlot] = useState(null);
  const [reason, setReason] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status

    const accessToken = localStorage.getItem("accessToken") ?? "";
    const headers = {
      Authorization: "Bearer " + accessToken,
    };
    fetch(
      `https://cors-anywhere.herokuapp.com/https://app.drchrono.com/api/doctors/${doctorId}`,
      {
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((doctorData) => {
        console.log("Doctor Data ", doctorData);
        console.log("Mounted? ", isMounted);

        if (isMounted) setDoctorInfo(doctorData);
      })
      .catch((error) => console.log(error));

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, [doctorId]);

  const handleDateChange = (date) => {
    setDate(date);
  };
  const handleAppointmentSlotChange = (event) => {
    setAppointmentSlot(event.target.value);
  };
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };
  const handleBookAppointmentClick = () => {};

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
                  src={doctorInfo.profile_picture}
                  alt={doctorInfo.first_name}
                  width={200}
                  height={200}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box fontWeight="fontWeightLight" fontSize={20} m={1}>
                Name:{" "}
                {[doctorInfo.first_name, doctorInfo.last_name]
                  .filter(Boolean)
                  .join(" ")}
              </Box>
              <Box fontWeight="fontWeightLight" fontSize={20} m={1}>
                Speciality: {doctorInfo.specialty}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box fontWeight="fontWeightLight" fontSize={20} m={1}>
                Email: {doctorInfo.email}
              </Box>
              <Box fontWeight="fontWeightLight" fontSize={20} m={1}>
                Phone: {doctorInfo.office_phone}
              </Box>
            </Grid>

            <Grid item xs={12} mt={4}>
              <Box ml={1} my={3} fontSize={32}>
                Book Appointment Section
              </Box>
              <Box my={2}>
                <TextField
                  id="date"
                  label="Appointment Date"
                  type="date"
                  value={date}
                  handleChange={handleDateChange}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box my={2}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Appointment Slot</InputLabel>
                  <Select
                    value={appointmentSlot}
                    onChange={handleAppointmentSlotChange}
                    label="Appointment Slot"
                  >
                    <MenuItem value="">
                      <em>Not Selected</em>
                    </MenuItem>
                    <MenuItem value={0-30}>10:00 AM - 10:30 AM</MenuItem>
                    <MenuItem value={30-60}>10:30 AM - 11:00 AM</MenuItem>
                    <MenuItem value={60-90}>11:00 AM - 11:30 AM</MenuItem>
                    <MenuItem value={90-120}>11:30 AM - 12:00 PM</MenuItem>
                    <MenuItem value={120-150}>12:00 PM - 12:30 PM</MenuItem>
                    <MenuItem value={150-180}>12:30 PM - 1:00 PM</MenuItem>
                    <MenuItem value={240-270}>2:00 PM - 2:30 PM</MenuItem>
                    <MenuItem value={270-300}>2:30 PM - 3:00 PM</MenuItem>
                    <MenuItem value={300-330}>3:00 PM - 3:30 PM</MenuItem>
                    <MenuItem value={330-360}>3:30 PM - 4:00 PM</MenuItem>
                    <MenuItem value={360-390}>4:00 PM - 4:30 PM</MenuItem>
                    <MenuItem value={390-420}>4:30 PM - 5:00 PM</MenuItem>
                    <MenuItem value={420-450}>5:00 PM - 5:30 PM</MenuItem>
                    <MenuItem value={450-480}>5:30 PM - 6:00 PM</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box my={2}>
                <TextField
                  id="outlined-multiline-static"
                  label="Reason"
                  multiline
                  rows={3}
                  placeholder="Enter your appointment reason here..."
                  variant="outlined"
                  value={reason}
                  onChange={handleReasonChange}
                  fullWidth
                />
              </Box>
              <Box textAlign="center" m={2}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<MeetingRoomSharpIcon />}
                  onClick={handleBookAppointmentClick}
                >
                  Book Appointment
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
                  <Box>Appointment Booked Successfully!</Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
