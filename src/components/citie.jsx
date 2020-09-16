import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { callWeatherByCitie } from "../domain/myAPIS";
import roundTemp from "../utility/conversion";

class Citie extends Component {
  constructor() {
    super();

    this.state = {
      citieWeatherData: [],
    };
  }

  componentDidMount() {
    const { citie } = this.props;
    this.callAPIWeather(citie);
  }

  callAPIWeather = async (country) => {
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
    const { citieWeatherData } = this.state;
    const { citie } = this.props;
    const { onStar } = this.props;

    if (citieWeatherData.length === 0)
      return (
        <tr>
          <td>loading...</td>
        </tr>
      );

    this.imagePathWeater = `/icons/${citieWeatherData.weather[0].icon}.png`;

    if (citie.favorite === 0) this.starPathing = "/icons/starD.png";
    else this.starPathing = "/icons/starA.jpg";

    return (
      <tr>
        <td>
          <img src={citie.flag} style={{ width: 30, height: 20 }} alt="" />
        </td>
        <td>
          <h5 className="nav-links">
            <Link
              to={{
                pathname: `/details`,
                state: {
                  weather: citieWeatherData,
                  theCitie: citie,
                },
              }}
            >
              {citie.capital}, {citie.name} {citie.code}
            </Link>
          </h5>
        </td>
        <td> {citieWeatherData.weather[0].main}</td>

        <td>
          <img
            src={this.imagePathWeater}
            style={{ width: 50, height: 35 }}
            alt=""
          />
        </td>
        <td>
          {" "}
          {roundTemp(citieWeatherData.main.temp)}
          {"°"}
        </td>
        <td>
          <input
            type="image"
            src={this.starPathing}
            style={{ width: 50, height: 35 }}
            onClick={() => onStar(citie.id)}
            alt=""
          />
        </td>
      </tr>
    );
  }
}

Citie.propTypes = {
  citie: PropTypes.shape({
    id: PropTypes.number,
    favorite: PropTypes.number,
    flag: PropTypes.string,
    code: PropTypes.string,
    name: PropTypes.string,
    capital: PropTypes.string,
  }),
  onStar: PropTypes.func,
};

Citie.defaultProps = {
  citie: {},
  onStar: () => {},
};

export default Citie;
