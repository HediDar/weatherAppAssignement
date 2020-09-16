import React from "react";
import PropTypes from "prop-types";
import { roundTemp } from "../utility/conversion";

const ActualDay = (props) => {
  if (
    typeof props.details === "undefined" ||
    typeof props.myWeather === "undefined"
  )
    return (
      <>
        <h1>Loading...</h1>
      </>
    );

  return (
    <React.Fragment>
      <table className="table">
        <thead style={{ fontSize: 22 }}>
          <tr>
            <th>today's details</th>
            <th></th>
            <th></th>
            <th></th>
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
                src={props.details.flag}
                style={{ width: 30, height: 20 }}
                alt=""
              />
            </td>

            <td>
              {props.details.capital}, {props.details.name},{" "}
              {props.details.code}
            </td>

            <td> {props.myWeather[0].weather[0].main}</td>
            <td>
              <img
                src={"/icons/" + props.myWeather[0].weather[0].icon + ".png"}
                style={{ width: 50, height: 35 }}
                alt=""
              />
            </td>
            <td> {roundTemp(props.myWeather[0].main.temp) + "°"}</td>
            <td> {props.myWeather[0].main.humidity}</td>
            <td> {props.myWeather[0].main.pressure}</td>
            <td> {props.myWeather[0].wind.speed} km/h</td>
            <td> {props.myWeather[0].wind.deg}°</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
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
