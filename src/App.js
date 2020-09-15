import React, { Component } from "react";

import { countriesCalls } from "./myAPIS";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cities from "./components/cities";
import Details from "./components/details";

import NavBar from "./components/navbar";
import PropTypes from "prop-types";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

toast.configure();

class App extends Component {
  notify = (message) => {
    toast(message);
  };
  constructor() {
    super();

    this.state = {
      inHome: 1,
      myCities: [],
      favCapitals: [],
      increment: -1,
      homePath: "/icons/homeA.png",
      favPath: "/icons/favD.png",
      countriesResponse: [],
      inFav: 0,
      searchValue: "",
    };
  }

  /* callAPIWeather = async (country, refresh) => {
    if (refresh === 1) this.setState({ increment: -1 });
    this.pays = this.state.myCities;

    try {
      const weatherRes = await callWeatherByRefresh(
        country.capital,
        country.alpha2code
      );

      this.test = 0;

      let i = this.state.increment;
      i++;
      this.setState({ increment: i });

      let tempCelcius = weatherRes.data["main"]["temp"];
      let temperatureRound = Math.trunc(tempCelcius) + "°";

      this.pays.push({
        id: this.state.increment,
        name: country["name"],
        capital: country["capital"],
        code: country["alpha2Code"],
        flag: country["flag"],
        weather: weatherRes.data.weather[0]["main"],
        temperature: temperatureRound,
        icon: weatherRes.data.weather[0]["icon"],
        favorite: 0,
        starPath: "/icons/starD.png",
        humidity: weatherRes.data["main"]["humidity"],
        pressure: weatherRes.data["main"]["pressure"],
        windSpeed: weatherRes.data["wind"]["speed"],
        windAngle: weatherRes.data["wind"]["deg"],
      });

      this.setState({ myCities: this.pays });
    } catch (e) {
      console.log(e);
    }
  };*/

  CallAPICountries = async () => {
    this.pays = [];
    this.id = -1;
    const responseCountries = await countriesCalls();
    this.k = -1;
    responseCountries.data.forEach((el) => {
      this.k++;
      if (this.k < 3) {
        this.id++;
        this.pays.push({
          id: this.id,
          name: el["name"],
          capital: el["capital"],
          code: el["alpha2Code"],
          flag: el["flag"],
          // weather: weatherRes.data.weather[0]["main"],
          // temperature: temperatureRound,
          // icon: weatherRes.data.weather[0]["icon"],
          // favorite: 0,
          // starPath: "/icons/starD.png",
          // humidity: weatherRes.data["main"]["humidity"],
          // pressure: weatherRes.data["main"]["pressure"],
          // windSpeed: weatherRes.data["wind"]["speed"],
          // windAngle: weatherRes.data["wind"]["deg"],
        });
      }
    });
    this.setState({ countriesResponse: this.pays });
    // console.log(this.state.countriesResponse);
  };

  componentDidMount() {
    //const response=await
    //this.CallAPICountries();
  }

  handleStar = (citieId) => {
    if (this.state.inFav === 1)
      this.notify("you can not pin and unpin in favorite section!");
    else {
      const cities = [...this.state.myCities];
      //i reasign the citi with id citieId, fave and path only changed
      if (this.state.myCities[citieId].favorite === 0) {
        cities[citieId].starPath = "/icons/starA.jpg";
        cities[citieId].favorite = 1;

        this.setState({
          favCapitals: this.state.favCapitals.concat([cities[citieId].capital]),
        });

        // this.myFav.push(cities[citieId].capital);
      } else {
        cities[citieId].starPath = "/icons/starD.png";
        cities[citieId].favorite = 0;
      }

      cities[citieId].id = citieId;
      cities[citieId].name = this.state.myCities[citieId].name;
      cities[citieId].capital = this.state.myCities[citieId].capital;
      cities[citieId].code = this.state.myCities[citieId].code;
      cities[citieId].flag = this.state.myCities[citieId].flag;
      cities[citieId].weather = this.state.myCities[citieId].weather;
      cities[citieId].temperature = this.state.myCities[citieId].temperature;
      cities[citieId].humidity = this.state.myCities[citieId].humidity;
      cities[citieId].pressure = this.state.myCities[citieId].pressure;
      cities[citieId].windSpeed = this.state.myCities[citieId].windSpeed;
      cities[citieId].windAngle = this.state.myCities[citieId].windAngle;

      this.setState({ myCities: cities });
    }
  };

  handleNav = () => {};

  handleSearch = (value) => {
    this.setState({ searchValue: value });
  };

  handleHome = () => {
    this.setState({ inHome: 1,favPath:"/icons/favD.png",homePath:"/icons/homeA.png" });
  };

  handleFav = () => {
    this.setState({ inHome: 0,favPath:"/icons/favA.jpg",homePath:"/icons/homeD.png" });

  
  };

  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route path="/details" exact component={Details} />
            <Route path="/" component={{ Cities, NavBar }}>
              <NavBar
                onSearch={this.handleSearch}
                onHome={this.handleHome}
                onFav={this.handleFav}
                onNavigate={this.handleNav}
                homePath={this.state.homePath}
                favPath={this.state.favPath}
              />
              <Cities searchValue={this.state.searchValue} inHome={this.state.inHome} />
            </Route>
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  myCities: PropTypes.array,
  favCapitals: PropTypes.array,
  countriesResponse: PropTypes.array,
  homePath: PropTypes.string,
  favPath: PropTypes.string,
  inFav: PropTypes.number,
  increment: PropTypes.number,
};

App.defaultProps = {
  myCities: [],
  favCapitals: [],
  countriesResponse: [],
  homePath: "/icons/homeA.png",
  favPath: "/icons/favD.png",
  inFav: 0,
  increment: -1,
};
export default App;
