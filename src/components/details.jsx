import React, { Component } from "react";
import PropTypes from "prop-types";
import NavBar2 from "./navbarHome";
import Detail from "./detail";
import ActualDay from "./actualDay";
import { detailCalls } from "../domain/myAPIS";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      myResponse: [],
      weatherDetail: [],
    };
  }

  componentDidMount() {
    const { location } = this.props;
    this.callAPIDetails(location.state.theCitie.capital);
  }

  callAPIDetails = async (capital) => {
    try {
      const { location } = this.props;
      if (typeof location.state.theCitie !== "undefined") {
        const weatherRes = await detailCalls(capital);

        this.setState({ weatherDetail: weatherRes.data.list });

        this.responseArray = [];

        let i = -1;
        weatherRes.data.list.forEach((el) => {
          i += 1;
          this.responseArray.push({
            id: i,
            time: el.dt_txt,
            tempMin: el.main.temp_min,
            tempMax: el.main.temp_max,
            windSpeed: el.wind.speed,
            windAngle: el.wind.deg,
            humidity: el.main.humidity,
            pressure: el.main.pressure,
            weather: el.weather[0].main,
            icon: el.weather[0].icon,
          });
        });

        this.setState({ myResponse: this.responseArray });
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { history } = this.props;
    const { myResponse } = this.state;
    const { weatherDetail } = this.state;

    if (
      typeof history.location.state === "undefined" ||
      typeof history.location.state.theCitie === "undefined"
    )
      return (
        <>
          <NavBar2 />
          <h1>no data selected</h1>
        </>
      );
    if (typeof myResponse !== "undefined") {
      this.imagePathWeater = `/icons/${history.location.state.theCitie.icon}.png`;

      if (myResponse.length > 0) {
        return (
          <>
            <NavBar2 />
            <br />
            <br />

            <ActualDay
              myWeather={weatherDetail}
              details={history.location.state.theCitie}
            />
            <br />
            <br />

            <h3 style={{ textAlign: "center" }}>
              Forecast for 5 different times
            </h3>
            <table className="table">
              <thead style={{ fontSize: 22 }}>
                <tr>
                  <th>Date and time</th>
                  <th aria-label="weather type" />
                  <th aria-label="weather icon" />
                  <th>min temp</th>
                  <th>max temp</th>
                  <th>wind speed</th>
                  <th>wind angle</th>
                  <th>humidity level</th>
                  <th>pressure level</th>
                </tr>
              </thead>
              <tbody>
                {myResponse.map((detail) => (
                  <Detail key={detail.id} detail={detail} />
                ))}
              </tbody>
            </table>
          </>
        );
      }
      return (
        <>
          <NavBar2 />
          <br />
          <br />

          <p>loading...</p>
          <br />
          <br />

          <h3 style={{ textAlign: "center" }}>
            Forecast for 5 different times
          </h3>
          <h5>loading</h5>
        </>
      );
    }
    return null;
  }
}

Details.propTypes = {
  location: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default Details;
