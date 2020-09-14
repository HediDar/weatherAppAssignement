import React, { Component } from "react";
class Detail extends Component {
  render() {
    this.imagePathWeater = "/icons/" + this.props.detail.icon + ".png";
    this.tempMin = Math.trunc(this.props.detail.tempMin);
    this.tempMax = Math.trunc(this.props.detail.tempMax);

    return (
      <tr>
        <td>{this.props.detail.time}</td>
        <td>{this.props.detail.weather}</td>
        <td>
          <img
            src={this.imagePathWeater}
            style={{ width: 50, height: 30 }}
            alt=""
          />
        </td>
        <td>
          {this.tempMin}
          {"°"}
        </td>
        <td>
          {this.tempMax}
          {"°"}
        </td>
        <td>
          {this.props.detail.windSpeed}
          {"km/h"}
        </td>
        <td>
          {this.props.detail.windAngle}
          {"°"}
        </td>
        <td>{this.props.detail.humidity}</td>
        <td>{this.props.detail.pressure}</td>
      </tr>
    );
  }
}

export default Detail;
