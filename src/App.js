import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Details from "./components/details";
import Cities from "./components/cities";
import Citie from "./components/citie";
import NavBar from "./components/navbar";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      inHome: 1,
      homePath: "/icons/homeA.png",
      favPath: "/icons/favD.png",
      searchValue: "",
      citiesFetched: [],
    };
  }

  handleNav = () => {};

  handleSearch = (value) => {
    this.setState({ searchValue: value });
  };

  handleHome = () => {
    this.setState({
      inHome: 1,
      favPath: "/icons/favD.png",
      homePath: "/icons/homeA.png",
    });
  };

  handleFav = () => {
    this.setState({
      inHome: 0,
      favPath: "/icons/favA.jpg",
      homePath: "/icons/homeD.png",
    });
  };

  callbackFunction = (childData) => {
    const cit = [];

    //  i sort the array du favori au non favori
    childData.forEach((el) => {
      if (el.favorite === 1) {
        cit.push(childData[el.id]);
      }
    });

    
    this.setState({ citiesFetched: cit });
    console.log(this.state.citiesFetched);
  };

  render() {
    const { inHome, searchValue, homePath, favPath } = this.state;
 const {citiesFetched}=this.state;
    return (
      <Router>
        <>
          <Switch>
            <Route path="/details" exact component={Details} />
            <Route path="/" component={{ Cities, NavBar }}>
              <NavBar
                onSearch={this.handleSearch}
                onHome={this.handleHome}
                onFav={this.handleFav}
                onNavigate={this.handleNav}
                homePath={homePath}
                favPath={favPath}
              />
              <Cities
                citiesFetched={this.citiesFetched}
                parentCallback={this.callbackFunction}
                searchValue={searchValue}
                inHome={inHome}
              />
            </Route>
          </Switch>

          <br />
          <br />
          <br />
          <tbody>
            {" "}
            {citiesFetched.map((citie) => (
              <Citie
                key={citie.id}
                id={citie.id}
                citie={citie}
                onStar={this.handleStar}
              />
            ))}
          </tbody>
        </>
      </Router>
    );
  }
}

export default App;
