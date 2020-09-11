import React, { Component } from "react";

class ActualDay extends Component {
  state = {};

  componentDidMount() {
  }

  render() {
    if (typeof this.props.details === "undefined")
      return (
        <React.Fragment>
          <h1>Loading...</h1>
        </React.Fragment>
      );
    /*this.imagePathWeater =
		"/icons/" + this.props.citie.icon + ".png";*/ else {
      this.imagePathWeater = "/icons/" + this.props.details.icon + ".png";
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
                {this.props.details.capital},{" "}
                {this.props.details.name},{" "}
                {this.props.details.code}
              </td>

              <td> {this.props.details.weather}</td>
              <td>
                <img
                  src={this.imagePathWeater}
                  style={{ width: 50, height: 35 }}
                  alt=""
                />
              </td>
              <td> {this.props.details.temperature}</td>
              <td> {this.props.details.humidity}</td>
              <td> {this.props.details.pressure}</td>
              <td> {this.props.details.windSpeed} km/h</td>
              <td> {this.props.details.windAngle}°</td>
            </tr>
          </tbody>
        </table>
		</React.Fragment>
      );
    }
  }
}

export default ActualDay;
