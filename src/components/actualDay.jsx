import React, { Component } from "react";

class ActualDay extends Component {
  state = {};

  componentDidMount() {
    console.log(this.props.myWeather[0].main.temp);
  }

  render() {
    if (
      typeof this.props.details === "undefined" ||
      typeof this.props.myWeather === "undefined"
    )
      return (
        <React.Fragment>
          <h1>Loading...</h1>
        </React.Fragment>
      );
    else {
      let tempCelcius = this.props.myWeather[0].main.temp;
      this.temperatureRound = Math.trunc(tempCelcius) + "°";

      console.log(this.props.myWeather[0]);
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
                    src={this.props.details.flag}
                    style={{ width: 30, height: 20 }}
                    alt=""
                  />
                </td>

                <td>
                  {this.props.details.capital}, {this.props.details.name},{" "}
                  {this.props.details.code}
                </td>
                
                <td> {this.props.myWeather[0].weather[0].main}</td>
                <td>
                  <img
                    src={"/icons/"+this.props.myWeather[0].weather[0].icon+".png"}
                    style={{ width: 50, height: 35 }}
                    alt=""
                  />
                </td>
                <td> {this.temperatureRound}</td>
                <td> {this.props.myWeather[0].main.humidity}</td>
                <td> {this.props.myWeather[0].main.pressure}</td>
                <td> {this.props.myWeather[0].wind.speed} km/h</td>
                <td> {this.props.myWeather[0].wind.deg}°</td>
              </tr>
            </tbody>
          </table>
        </React.Fragment>
      );
    }
  }
}

export default ActualDay;
