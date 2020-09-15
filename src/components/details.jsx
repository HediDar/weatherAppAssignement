import React, { Component } from "react";
import NavBar2 from "./navbarHome";
import Detail from "./detail";
import ActualDay from "./actualDay";
import { detailCalls } from "../myAPIS";

const API_key = "3ca7473536ef714919ad34878d22a7af";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      myResponse: [],
      weatherDetail: [],
    };
  }

  componentDidMount() {
    console.log(this.props.location.state.theCitie.capital);
    this.callAPIDetails(this.props.location.state.theCitie.capital);
  }

  callAPIDetails = async (capital) => {
    try {
      //let test=this.props.citie;
      if (typeof this.props.location.state.theCitie !== "undefined") {
        const weatherRes = await detailCalls(capital);

        this.setState({ weatherDetail: weatherRes.data.list });

        this.responseArray = [];

        this.i = -1;
        this.state.weatherDetail.forEach((el) => {
          this.i++;
          this.responseArray.push({
            id: this.i,
            time: el["dt_txt"],
            tempMin: el["main"]["temp_min"],
            tempMax: el["main"]["temp_max"],
            windSpeed: el["wind"]["speed"],
            windAngle: el["wind"]["deg"],
            humidity: el["main"]["humidity"],
            pressure: el["main"]["pressure"],
            weather: el["weather"][0]["main"],
            icon: el["weather"][0]["icon"],
          });
        });

        this.setState({ myResponse: this.responseArray });
        console.log(this.state.myResponse);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (
      typeof this.props.history.location.state === "undefined" ||
      typeof this.props.history.location.state.theCitie === "undefined"
    )
      return (
        <React.Fragment>
          <NavBar2 />
          <h1>no data selected</h1>
        </React.Fragment>
      );
    if ( typeof this.state.myResponse!=="undefined") {
      this.imagePathWeater =
        "/icons/" + this.props.history.location.state.theCitie.icon + ".png";

console.log(this.state);

      if (this.state.myResponse.length > 0) {
        // console.log("weather detail is");

        return (
          <React.Fragment>
            <NavBar2 />
            <br></br>
            <br></br>

            <ActualDay
              myWeather={this.state.weatherDetail}
              details={this.props.history.location.state.theCitie}
            />
            <br></br>
            <br></br>

            <h3 style={{ textAlign: "center" }}>
              Forecast for 5 different times
            </h3>
            <table className="table" >
              <thead style={{ fontSize: 22 }}>
                <tr>
                  <th>Date and time</th>
                  <th></th>
                  <th></th>
                  <th>min temp</th>
                  <th>max temp</th>
                  <th>wind speed</th>
                  <th>wind angle</th>
                  <th>humidity level</th>
                  <th>pressure level</th>
                </tr>
              </thead>
              <tbody>
                {this.state.myResponse.map((detail) => (
                  <Detail key={detail.id} detail={detail} />
                ))}
              </tbody>
            </table>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <NavBar2 />
            <br></br>
            <br></br>

            <p>loading...</p>
            <br></br>
            <br></br>

            <h3 style={{ textAlign: "center" }}>
              Forecast for 5 different times
            </h3>
            <h5>loading</h5>
          </React.Fragment>
        );
      }
    }
  }
}

export default Details;
