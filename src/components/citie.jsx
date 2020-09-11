import React, { Component } from "react";
import { Link } from "react-router-dom";
class Citie extends Component {
  render() {
    this.imagePathWeater = "/icons/" + this.props.citie.icon + ".png";

    return (
      <tr>
        <td>
          <img
            src={this.props.citie.flag}
            style={{ width: 30, height: 20 }}
            alt=""
          />
        </td>
        <td>
          
          <h5 className="nav-links">
          <Link to={{ pathname: `/details`, state: { citie:this.props.citie } }}>

              {this.props.citie.capital}, {this.props.citie.name}{" "}
              {this.props.citie.code}
            </Link>
          </h5>
        </td>
        <td> {this.props.citie.weather}</td>
        <td>
          <img
            src={this.imagePathWeater}
            style={{ width: 50, height: 35 }}
            alt=""
          />
        </td>
        <td> {this.props.citie.temperature}</td>
        <td>
          <img
            src={this.props.citie.starPath}
            style={{ width: 50, height: 35 }}
            onClick={() => this.props.onStar(this.props.citie.id)}
            alt=""
          />
        </td>
      </tr>
    );
  }
}

export default Citie;
