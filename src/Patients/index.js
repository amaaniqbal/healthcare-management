import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Navbar from "../components/Navbar";
import PatientsMap from "../Map/PatientsMap";

export default function Patients() {
  const [patientsInfo, setPatientsInfo] = useState([]);

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status

    const accessToken = localStorage.getItem("accessToken") ?? "";
    const headers = {
      Authorization: "Bearer " + accessToken,
    };
    fetch(
      "https://cors-anywhere.herokuapp.com/https://drchrono.com/api/patients",
      {
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((patientList) => {
        console.log("Patient List ", patientList);
        console.log("Mounted? ", isMounted);

        if (isMounted) setPatientsInfo(patientList.results);
      })
      .catch((error) => console.log(error));

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, []);

  return (
    <Box>
      <Navbar />
      <PatientsMap patients={patientsInfo} />
    </Box>
  );
}
