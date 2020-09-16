import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Details from "./components/details";
import Cities from "./components/cities";
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

  render() {
    const { inHome, searchValue, homePath, favPath } = this.state;

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
              <Cities searchValue={searchValue} inHome={inHome} />
            </Route>
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
