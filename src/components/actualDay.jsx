import React from "react";
import PropTypes from "prop-types";
import roundTemp  from "../utility/conversion";

const ActualDay = (props) => {
  const myProps=props;
  if (
    typeof myProps.details === "undefined" ||
    typeof myProps.myWeather === "undefined"
  )
    return (
      <>
        <h1>Loading...</h1>
      </>
    );

  return (
    <>
      <table className="table">
        <thead style={{ fontSize: 22 }}>
          <tr>
            <th>day details</th>
            <th aria-label="name of country"/>
            <th aria-label="the weather"/>
            <th aria-label="icon weather"/>
            <th>temperature</th>
            <th>humidity</th>
            <th>pressure</th>
            <th>wind speed</th>
            <th>angular degree</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src={myProps.details.flag}
                style={{ width: 30, height: 20 }}
                alt=""
              />
            </td>

            <td>
              {myProps.details.capital}, {myProps.details.name},{" "}
              {myProps.details.code}
            </td>

            <td> {myProps.myWeather[0].weather[0].main}</td>
            <td>
              <img   
                src={`/icons/${myProps.myWeather[0].weather[0].icon}.png`}
                style={{ width: 50, height: 35 }}
                alt=""
              />
            </td>
  <td> {roundTemp(myProps.myWeather[0].main.temp)}°</td>
            <td> {myProps.myWeather[0].main.humidity}</td>
            <td> {myProps.myWeather[0].main.pressure}</td>
            <td> {myProps.myWeather[0].wind.speed} km/h</td>
            <td> {myProps.myWeather[0].wind.deg}°</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

ActualDay.propTypes = {
  details: PropTypes.object,
  myWeather: PropTypes.array,
};

ActualDay.defaultProps = {
  details: {},
  myWeather: [],
};

export default ActualDay;
