import React from "react";

const ActualDay = (props) => {
  if (
    typeof props.details === "undefined" ||
    typeof props.myWeather === "undefined"
  )
    return (
      <React.Fragment>
        <h1>Loading...</h1>
      </React.Fragment>
    );
  else {
    let tempCelcius = props.myWeather[0].main.temp;
    let temperatureRound = Math.trunc(tempCelcius) + "°";

    console.log(props.myWeather[0]);
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
              <td> {temperatureRound}</td>
              <td> {props.myWeather[0].main.humidity}</td>
              <td> {props.myWeather[0].main.pressure}</td>
              <td> {props.myWeather[0].wind.speed} km/h</td>
              <td> {props.myWeather[0].wind.deg}°</td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
};

export default ActualDay;
