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
    const myProps = this.props;
    this.callAPIWeather(myProps.citie);
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
    const myState = this.state;
    const myProps = this.props;

    if (myState.citieWeatherData.length === 0)
      return (
        <tr>
          <td>loading...</td>
        </tr>
      );

    this.imagePathWeater = `/icons/${myState.citieWeatherData.weather[0].icon}.png`;

    if (myProps.citie.favorite === 0) this.starPathing = "/icons/starD.png";
    else this.starPathing = "/icons/starA.jpg";

    return (
      <tr>
        <td>
          <img
            src={myProps.citie.flag}
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
                  weather: myState.citieWeatherData,
                  theCitie: myProps.citie,
                },
              }}
            >
              {myProps.citie.capital}, {myProps.citie.name} {myProps.citie.code}
            </Link>
          </h5>
        </td>
        <td> {myState.citieWeatherData.weather[0].main}</td>

        <td>
          <img
            src={this.imagePathWeater}
            style={{ width: 50, height: 35 }}
            alt=""
          />
        </td>
        <td>
          {" "}
          {roundTemp(myState.citieWeatherData.main.temp)}
          {"°"}
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

Citie.propTypes = {
  citie: PropTypes.object,
  onStar: PropTypes.func,
};

Citie.defaultProps = {
  citie: {},
  onStar: () => {},
};

export default Citie;
