import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Navbar from "../components/Navbar";
import DoctorsMap from "../Map/DoctorsMap";

export default function Doctors() {
  const [doctorsInfo, setDoctorsInfo] = useState([]);

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status

    const accessToken = localStorage.getItem("accessToken") ?? "";
    const headers = {
      Authorization: "Bearer " + accessToken,
    };
    fetch(
      "https://cors-anywhere.herokuapp.com/https://drchrono.com/api/offices",
      {
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return Promise.all(
          data.results.map(async (item) => {
            const res = await fetch(
              `https://cors-anywhere.herokuapp.com/https://app.drchrono.com/api/doctors/${item.doctor}`,
              {
                headers: headers,
              }
            );
            const doctorData = await res.json();
            console.log(doctorData);
            return {
              ...item,
              doctor_id: doctorData.id,
              doctor_name: `${doctorData.first_name} ${doctorData.last_name}`,
              doctor_email: doctorData.email,
              doctor_speciality: doctorData.specialty,
              doctor_job_title: doctorData.job_title,
              doctor_phone: doctorData.office_phone,
            };
          })
        );

        // const dataList = data.results;
        // dataList.forEach((item) => {
        //   fetch(
        //     `https://cors-anywhere.herokuapp.com/https://drchrono.com/api/offices/${item.doctor}`,
        //     {
        //       headers: headers,
        //     }
        //   )
        //     .then((response) => response.json())
        //     .then((doctorData) => {
        //       return {};
        //     });
        // });
      })
      .then((doctorList) => {
        console.log("Doctor List ", doctorList);
        console.log("Mounted? ", isMounted);

        if (isMounted) setDoctorsInfo(doctorList);
      })
      .catch((error) => console.log(error));

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, []);

  return (
    <Box>
      <Navbar />
      <DoctorsMap doctors={doctorsInfo} />
    </Box>
  );
}
