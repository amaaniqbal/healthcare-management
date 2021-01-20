import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Box from "@material-ui/core/Box";
import Navbar from "../components/Navbar";
import AuthorizeText from "./AuthorizeText";

const {
  REACT_APP_BASE_URL,
  REACT_APP_SAMPLE_PATIENT_ID,
  REACT_APP_ONPATIENT_CLIENT_ID,
  REACT_APP_ONPATIENT_CLIENT_SECRET,
} = process.env;

// Custom Hook to parse the query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Authorize() {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    "Accept-Language": "en_US",
  };

  const data = {
    code: useQuery().get("code"),
    grant_type: "authorization_code",
    redirect_uri: REACT_APP_BASE_URL + "patient/authorize",
    client_id: REACT_APP_ONPATIENT_CLIENT_ID,
    client_secret: REACT_APP_ONPATIENT_CLIENT_SECRET,
  };

  useEffect(() => {
    fetch("https://onpatient.com/o/token/", {
      method: "POST",
      params: queryString.stringify(data),
      body: queryString.stringify(data),
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        const { access_token, refresh_token } = data;

        console.log(data);

        if (access_token && refresh_token) {
          localStorage.setItem("accessToken", access_token);
          localStorage.setItem("refreshToken", refresh_token);
          localStorage.setItem("patientId", REACT_APP_SAMPLE_PATIENT_ID);

          window.location.replace(
            `${REACT_APP_BASE_URL}search-doctors/?accessToken=${access_token}`
          );
        }
      })
      .catch((error) => console.log(error));
  });

  return (
    <Box>
      <Navbar />
      <AuthorizeText text="Patient" />
    </Box>
  );
}
