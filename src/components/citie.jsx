import React, { Component } from "react";
import { Link } from "react-router-dom";
import { callWeatherByCitie } from "../myAPIS";

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
    //if (refresh === 1) this.setState({ increment: -1 });

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



  handleStar = () => {
    if (this.state.fav === 0) {
      this.setState({ fav: 1, StarPath: "/icons/starA.jpg" });
    } else {
      this.setState({ fav: 0, StarPath: "/icons/starD.png" });
    }
  };
  render() {
    if (this.state.citieWeatherData.length === 0)
      return (
        
          <tr><td>loading...</td></tr>
        
      );
    else {
      this.imagePathWeater =
        "/icons/" + this.state.citieWeatherData.weather[0]["icon"] + ".png";
      let tempCelcius = this.state.citieWeatherData["main"]["temp"];
      let temperatureRound = Math.trunc(tempCelcius) + "°";

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
                  state: { citie: this.props.citie },
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
          <td> {temperatureRound}</td>
          <td>
            <img
              src={this.state.StarPath}
              style={{ width: 50, height: 35 }}
              onClick={() => this.handleStar()}
              alt=""
            />
          </td>
        </tr>
      );
    }
  }
}

export default Citie;
