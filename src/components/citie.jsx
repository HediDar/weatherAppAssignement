import React, { Component } from "react";
import { Link } from "react-router-dom";
import { callWeatherByCitie } from "../domain/myAPIS";
import PropTypes from "prop-types";
import { roundTemp } from "../utility/conversion";

class Citie extends Component {
  state = {
    citieWeatherData: [],
    StarPath: "/icons/starD.png",
    fav: 0,
  };

  componentDidMount() {
    this.callAPIWeather(this.props.citie, 0);
  }

  callAPIWeather = async (country, refresh) => {
    try {
      const weatherRes = await callWeatherByCitie(
        country.capital,
        country.code
      );

      this.setState({ citieWeatherData: weatherRes.data });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (this.state.citieWeatherData.length === 0)
      return (
        <tr>
          <td>loading...</td>
        </tr>
      );
    else {
      this.imagePathWeater =
        "/icons/" + this.state.citieWeatherData.weather[0]["icon"] + ".png";

      if (this.props.citie.favorite === 0)
        this.starPathing = "/icons/starD.png";
      else this.starPathing = "/icons/starA.jpg";

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
              <Link
                to={{
                  pathname: `/details`,
                  state: {
                    weather: this.state.citieWeatherData,
                    theCitie: this.props.citie,
                  },
                }}
              >
                {this.props.citie.capital}, {this.props.citie.name}{" "}
                {this.props.citie.code}
              </Link>
            </h5>
          </td>
          <td> {this.state.citieWeatherData.weather[0]["main"]}</td>

          <td>
            <img
              src={this.imagePathWeater}
              style={{ width: 50, height: 35 }}
              alt=""
            />
          </td>
          <td>
            {" "}
            {roundTemp(this.state.citieWeatherData["main"]["temp"]) + "°"}
          </td>
          <td>
            <img
              src={this.starPathing}
              style={{ width: 50, height: 35 }}
              onClick={() => this.props.onStar(this.props.citie.id)}
              alt=""
            />
          </td>
        </tr>
      );
    }
  }
}

Citie.propTypes = {
  citie: PropTypes.object,
  onStar: PropTypes.func,
};

Citie.defaultProps = {
  citie: {},
  onStar: () => {},
};

export default Citie;
