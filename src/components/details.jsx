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
    const myProps = this.props;
    this.callAPIDetails(myProps.location.state.theCitie.capital, myProps);
  }

  callAPIDetails = async (capital, myProps) => {
    try {
      const myState = this.state;
      if (typeof myProps.location.state.theCitie !== "undefined") {
        const weatherRes = await detailCalls(capital);

        this.setState({ weatherDetail: weatherRes.data.list });

        this.responseArray = [];

        let i = -1;
        this.state.weatherDetail.forEach((el) => {
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
    const myState = this.state;
    const myProps = this.props;
    if (
      typeof myProps.history.location.state === "undefined" ||
      typeof myProps.history.location.state.theCitie === "undefined"
    )
      return (
        <>
          <NavBar2 />
          <h1>no data selected</h1>
        </>
      );
    if (typeof myState.myResponse !== "undefined") {
      this.imagePathWeater = `/icons/${myProps.history.location.state.theCitie.icon}.png`;

      if (myState.myResponse.length > 0) {
        // console.log("weather detail is");

        return (
          <>
            <NavBar2 />
            <br />
            <br />

            <ActualDay
              myWeather={myState.weatherDetail}
              details={myProps.history.location.state.theCitie}
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
                {myState.myResponse.map((detail) => (
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
  myResponse: PropTypes.array,
  weatherDetail: PropTypes.array,
};

Details.defaultProps = {
  myResponse: [],
  weatherDetail: [],
};

export default Details;
