import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PublicIcon from "@material-ui/icons/Public";
import MessageIcon from "@material-ui/icons/Message";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import GetAppIcon from "@material-ui/icons/GetApp";

export default function CenteredGrid() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Grid container>
        <Grid item xs={4}>
          <Box textAlign="center" fontWeight="fontWeightLight" p={3}>
            <Box>
              <PublicIcon style={{ fontSize: 80 }} />
            </Box>
            <Box fontSize={32} my={2}>
              Visualize Patients
            </Box>
            <Box fontSize={24}>
              Locate all of your patients globally at a single place!
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box textAlign="center" fontWeight="fontWeightLight" p={3}>
            <Box>
              <MessageIcon style={{ fontSize: 80 }} />
            </Box>
            <Box fontSize={32} my={2}>
              Message Patients
            </Box>
            <Box fontSize={24}>
              Send messages to any of your patients in a click!
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box textAlign="center" fontWeight="fontWeightLight" p={3}>
            <Box>
              <GetAppIcon style={{ fontSize: 80 }} />
            </Box>
            <Box fontSize={32} my={2}>
              View Patient Info
            </Box>
            <Box fontSize={24}>
              Get all of your patient information in a single page!
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box textAlign="center" fontWeight="fontWeightLight" p={3}>
            <Box>
              <MeetingRoomIcon style={{ fontSize: 80 }} />
            </Box>
            <Box fontSize={32} my={2}>
              Book Appointments
            </Box>
            <Box fontSize={24}>
              Arrange an appointment with the doctor anytime!
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box textAlign="center" fontWeight="fontWeightLight" p={3}>
            <Box>
              <AddLocationIcon style={{ fontSize: 80 }} />
            </Box>
            <Box fontSize={32} my={2}>
              Search Doctors
            </Box>
            <Box fontSize={24}>
              Find the doctor of your choice internationally!
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
