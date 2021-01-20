import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import getAge from "get-age";

const { REACT_APP_BASE_URL } = process.env;

export default function DisplayMap(props) {
  // Create a reference to the HTML element we want to put the map on
  const mapRef = useRef(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => console.log(error)
    );
  }, []);

  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */
  useLayoutEffect(() => {
    const VIEW_PATIENT_INFO_URL = REACT_APP_BASE_URL + "view-patient";
    const MESSAGE_PATIENT_URL = REACT_APP_BASE_URL + "message-patient";

    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "lUG-hi8SVgFZqxxI8-TGTndI2Vxiu-19ihGvzANv2WU",
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: latitude, lng: longitude },
      zoom: 10,
      pixelRatio: window.devicePixelRatio || 1,
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    const icon = new H.map.Icon("/patient.png", {
      size: { w: 56, h: 56 },
      stickHeight: 100,
      stickColor: "blue",
    });

    // Get an instance of the geocoding service:
    var service = platform.getSearchService();
    console.log("Passed Patients ", props.patients);
    // Call the geocode method with the geocoding parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    props.patients.forEach((patient) => {
      const geocodeAddress = [
        patient.address,
        patient.city,
        patient.state,
        patient.zip_code,
      ]
        .filter(Boolean)
        .join(" ");

      if (geocodeAddress)
        service.geocode(
          {
            q: geocodeAddress,
          },
          (result) => {
            // Add a marker for each location found
            result.items.forEach((item) => {
              const locationMarker = new H.map.Marker(
                {
                  lat: item.position.lat,
                  lng: item.position.lng,
                },
                { icon: icon }
              );

              // Re-center Map
              hMap.setCenter(item.position);

              // Add event listener to the marker
              locationMarker.addEventListener(
                "tap",
                function (evt) {
                  const bubble = new H.ui.InfoBubble(item.position, {
                    content:
                      "<div id='patient-" +
                      patient.id +
                      "' class='marker-point' style='min-width: 150px'><h4>Name: " +
                      [
                        patient.first_name,
                        patient.middle_name,
                        patient.last_name,
                      ]
                        .filter(Boolean)
                        .join(" ") +
                      "</h4><p>Email: " +
                      patient.email +
                      "</p><p>Phone: " +
                      patient.cell_phone +
                      "</p><p>Gender: " +
                      patient.gender +
                      "</p><p>Age: " +
                      getAge(patient.date_of_birth) +
                      "</p><a class='marker-point-view-patient-info' href='" +
                      `${VIEW_PATIENT_INFO_URL}/?patient-id=${patient.id}` +
                      "'>View Patient Info</a><br><a class='marker-point-message-patient' href='" +
                      `${MESSAGE_PATIENT_URL}/?patient-id=${patient.id}` +
                      "'>Message Patient</a></div>",
                  });
                  ui.addBubble(bubble);
                },
                false
              );

              hMap.addObject(locationMarker);
            });
          },
          alert
        );
    });

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef, latitude, longitude, props.patients]); // This will run this hook every time this ref is updated

  return <div className="map" ref={mapRef} style={{ height: "100vh" }} />;
}
