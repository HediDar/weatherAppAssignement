import React from "react";
import PropTypes from "prop-types";
import roundTemp from "../utility/conversion";

const ActualDay = (props) => {
  const {details} = props;
  const {myWeather} = props;

  if (
    typeof details === "undefined" ||
    typeof myWeather === "undefined"
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
            <th aria-label="name of country" />
            <th aria-label="the weather" />
            <th aria-label="icon weather" />
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
                src={details.flag}
                style={{ width: 30, height: 20 }}
                alt=""
              />
            </td>

            <td>
              {details.capital}, {details.name},{" "}
              {details.code}
            </td>

            <td> {myWeather[0].weather[0].main}</td>
            <td>
              <img
                src={`/icons/${myWeather[0].weather[0].icon}.png`}
                style={{ width: 50, height: 35 }}
                alt=""
              />
            </td>
            <td> {roundTemp(myWeather[0].main.temp)}°</td>
            <td> {myWeather[0].main.humidity}</td>
            <td> {myWeather[0].main.pressure}</td>
            <td> {myWeather[0].wind.speed} km/h</td>
            <td> {myWeather[0].wind.deg}°</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

ActualDay.propTypes = {
  details: PropTypes.shape({
    capital: PropTypes.string,
    name: PropTypes.string,
    code: PropTypes.string,
    flag: PropTypes.string,
    favorite: PropTypes.number,
    id: PropTypes.number,
  }),
  myWeather: PropTypes.arrayOf(PropTypes.object),
};

ActualDay.defaultProps = {
  details: { id: 0, name: "", capital: "", flag: "", code: "", favorite: 0 },
  myWeather: [{}],
};

export default ActualDay;
