import React, { Component } from "react";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cities from "./components/cities";
import Details from "./components/details";

import NavBar from "./components/navbar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

toast.configure()
const API_key = "3ca7473536ef714919ad34878d22a7af";

class App extends Component {

 notify =(message)=>{

toast(message);

  };
  constructor() {
    super();
    
    this.state = {
      myCities: [],
      favCapitals: [],
      increment: -1,
      homePath: "/icons/homeA.png",
      favPath: "/icons/favD.png",
      countriesResponse: [],
      inFav: 0,
    };
  }

  
  componentDidMount() {
    this.callAPI();
  }

  callAPI = async () => {
    if (this.state.countriesResponse.length === 0) {
      const apiCall1 = await fetch("https://restcountries.eu/rest/v2/all");
      const response1 = await apiCall1.json();
      this.setState({ countriesResponse: response1 });
    }
    this.secondCall();
  };

  secondCall = () => {
    this.pays = [];
    let k = 0;

    this.state.countriesResponse.forEach((el) => {
      k++;
      if (k < 8) this.callAPI2(el, this.pays, 1);
    });
  };

  callAPI2 = async (el, pays, refresh) => {
    if (refresh === 1) this.setState({ increment: -1 });

    const apiCall2 = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        el["capital"] +
        "," +
        el["alpha2Code"] +
        "&appid=" +
        API_key +
        "&units=metric"
    );
    const response2 = await apiCall2.json();

    try {
      this.test = 0;

      let i = this.state.increment;
      i++;
      this.setState({ increment: i });

      let tempCelcius = response2["main"]["temp"];
      let temperatureRound = Math.trunc(tempCelcius) + "°";

      this.state.favCapitals.forEach((e0) => {
        if (el["capital"].localeCompare(e0) === 0) {
          this.test = 1;
          pays.push({
            id: this.state.increment,
            name: el["name"],
            capital: el["capital"],
            code: el["alpha2Code"],
            flag: el["flag"],
            weather: response2.weather[0]["main"],
            temperature: temperatureRound,
            icon: response2.weather[0]["icon"],
            favorite: 1,
            starPath: "/icons/starA.jpg",
            humidity: response2["main"]["humidity"],
            pressure: response2["main"]["pressure"],
            windSpeed: response2["wind"]["speed"],
            windAngle: response2["wind"]["deg"],
          });
        }
      });

      if (this.test === 0) {
        pays.push({
          id: this.state.increment,
          name: el["name"],
          capital: el["capital"],
          code: el["alpha2Code"],
          flag: el["flag"],
          weather: response2.weather[0]["main"],
          temperature: temperatureRound,
          icon: response2.weather[0]["icon"],
          favorite: 0,
          starPath: "/icons/starD.png",
          humidity: response2["main"]["humidity"],
          pressure: response2["main"]["pressure"],
          windSpeed: response2["wind"]["speed"],
          windAngle: response2["wind"]["deg"],
        });
      }
    } catch (error) {
      console.error(error);
    }
    this.setState({ myCities: pays });
  };

  handleStar = (citieId) => {
    if (this.state.inFav === 1) this.notify("you can not pin and unpin in favorite section!");
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
      /*if (this.myFav.length>0){
        
    this.setState({ favCapitals: this.myFav });
}*/

      this.setState({ myCities: cities });
    }
  };

  handleNav = () => {
    console.log("gfgg");
  };

  handleSearch = (value) => {
    this.testHave = 0;
    this.testExists = 0;

    if (value.localeCompare("") === 0) {console.log('empty');this.notify("you have typed an empty value!");}
    else {
      this.state.myCities.forEach((el) => {
        if (
          el["capital"].toUpperCase().localeCompare(value.toUpperCase()) === 0
        )
          this.testHave = 1;
      });
//// we exclude the vatican and the holy see as countries cause they have the same capital as italy
      this.state.countriesResponse.forEach((el2) => {
        if (
          el2["capital"].toUpperCase().localeCompare(value.toUpperCase()) === 0
        ) {
          this.testExists = 1;
          if (
            this.testHave === 0 &&
            el2["name"].toUpperCase().localeCompare("vatican".toUpperCase()) !==
              0 &&
            el2["name"]
              .toUpperCase()
              .localeCompare("holy see".toUpperCase()) !== 0
          ) {
            const cities = [...this.state.myCities];

            this.callAPI2(el2, cities, 0);

            this.setState({ myCities: cities });
          }
        }
      });
      if (this.testHave === 1) this.notify("capital already displayed!");
      if (this.testExists === 0 && this.testHave === 0)
      this.notify("not a capital!");
    }
  };

  handleHome = () => {
    //cela pour empecher de manipuler les etoiles dans longlet favoir
    this.setState({ inFav: 0 });

    this.setState({ homePath: "/icons/homeA.png" });
    this.setState({ favPath: "/icons/favD.png" });
    this.cities2 = [];

    for (let i = 0; i < this.state.myCities.length; i++) {
      this.state.myCities.forEach((el) => {
        if (el.id === i) {
          this.cities2.push(el);
          this.cities2[this.cities2.length - 1].id = i;
          return;
        }
      });
    }

    this.setState({ myCities: this.cities2 });
    //this.callAPI();
  };

  handleFav = () => {
    if (this.state.inFav===0){
    this.setState({ favPath: "/icons/favA.jpg" });
    this.setState({ homePath: "/icons/homeD.png" });

    let cit = [];

    this.j = -1;
    ////////i sort the array du favori au non favori
    this.state.myCities.forEach((el) => {
      if (el.favorite === 1) {
        this.j++;
        cit.push(this.state.myCities[el.id]);
      }
    });

    this.state.myCities.forEach((e2) => {
      if (e2.favorite === 0) {
        this.j++;

        cit.push(this.state.myCities[e2.id]);
      }
    });
    this.setState({ myCities: cit });
    this.setState({ inFav: 1 });
  }
  };

  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
          <Route path="/details" exact component={Details} />
            <Route path="/"  component={{ Cities, NavBar }}>
              <NavBar
                onSearch={this.handleSearch}
                onHome={this.handleHome}
                onFav={this.handleFav}
                onNavigate={this.handleNav}
                homePath={this.state.homePath}
                favPath={this.state.favPath}
              />
              <Cities cities={this.state.myCities} onStar={this.handleStar} />
            </Route>

            
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
