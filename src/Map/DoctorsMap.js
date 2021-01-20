import React, { useState, useLayoutEffect, useRef, useEffect } from "react";

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
    const BOOK_APPOINTMENT_URL = REACT_APP_BASE_URL + "book-appointment";

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

    const icon = new H.map.Icon("/touch.png", {
      stickHeight: 100,
      stickColor: "blue",
    });

    // Get an instance of the geocoding service:
    var service = platform.getSearchService();
    console.log("Passed Doctors ", props.doctors);
    // Call the geocode method with the geocoding parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    props.doctors.forEach((doctor) => {
      const geocodeAddress = [
        doctor.address,
        doctor.city,
        doctor.state,
        doctor.zip_code,
        doctor.country,
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
              // Instantiate a circle object (using the default style):
              var circle = new H.map.Circle(item.position, 3000);

              // Add the circle to the map:
              hMap.addObject(circle);

              const locationMarker = new H.map.Marker(
                {
                  lat: item.position.lat,
                  lng: item.position.lng,
                  // alt: 20,
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
                      "<div id='doctor-" +
                      doctor.doctor_id +
                      "' class='marker-point'><h4>Name: " +
                      doctor.doctor_name +
                      "</h4><p>Email: " +
                      doctor.doctor_email +
                      "</p><p>Phone: " +
                      doctor.doctor_phone +
                      "</p><p>Speciality: " +
                      doctor.doctor_speciality +
                      "</p><p>Job Title: " +
                      doctor.doctor_job_title +
                      "</p><a class='marker-point-book-appointment' href='" +
                      `${BOOK_APPOINTMENT_URL}/?doctor-id=${doctor.doctor_id}` +
                      "'>Book Appointment</a></div>",
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
  }, [mapRef, latitude, longitude, props.doctors]); // This will run this hook every time this ref is updated

  return <div className="map" ref={mapRef} style={{ height: "100vh" }} />;
}
