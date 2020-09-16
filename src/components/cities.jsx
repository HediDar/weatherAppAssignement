import React, { Component } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { countriesCalls } from "../domain/myAPIS";
import "react-toastify/dist/ReactToastify.css";
import Citie from "./citie";
import "../css-loader.css";

class Cities extends Component {
  constructor(props) {
    super(props);
    this.handleStar = this.handleStar.bind(this);

    this.state = {
      countriesResponse: [],
      AllcountriesResponse: [],
      inHome: 1,
      searchValue: "",
    };
  }

  componentDidMount() {
    const myProps = this.props;
    this.setState({
      searchValue: myProps.searchValue,
      inHome: myProps.inHome,
    });
    this.CallAPICountries();
  }

  componentDidUpdate() {
    const myProps = this.props;
    const myState = this.state;
    if (myProps.inHome !== myState.inHome) {
      this.setState({ inHome: myProps.inHome });

      //  handle sorting in fav
      if (myState.inHome === 1) {
        const cit = [];

        //  i sort the array du favori au non favori
        myState.countriesResponse.forEach((el) => {
          if (el.favorite === 1) {
            cit.push(myState.countriesResponse[el.id]);
          }
        });

        myState.countriesResponse.forEach((e2) => {
          if (e2.favorite === 0) {
            cit.push(myState.countriesResponse[e2.id]);
          }
        });
        this.setState({ countriesResponse: cit });
      }

      //  handle desorting in home

      if (myState.inHome === 0) {
        this.cities2 = [];
        for (let i = 0; i < myState.countriesResponse.length; i++) {
          myState.countriesResponse.forEach((el) => {
            if (el.id === i) {
              this.cities2.push(el);
              this.cities2[this.cities2.length - 1].id = i;
            }
          });
        }

        this.setState({ countriesResponse: this.cities2 });
      }
    }

    if (myProps.searchValue !== myState.searchValue) {
      this.setState({ searchValue: myProps.searchValue });
      if (myProps.searchValue.localeCompare("") === 0) {
        this.notify("you have typed an empty value!");
      } else {
        let testHave = 0;
        let testExists = 0;
        const loop = myState.countriesResponse;
        loop.forEach((el) => {
          if (
            el.capital
              .toUpperCase()
              .localeCompare(myProps.searchValue.toUpperCase()) === 0
          )
            testHave = 1;
        });
        // we exclude the vatican and the holy see as countries cause they have the same capital as italy
        myState.AllcountriesResponse.forEach((el2) => {
          if (
            el2.capital
              .toUpperCase()
              .localeCompare(myProps.searchValue.toUpperCase()) === 0
          ) {
            testExists = 1;
            if (
              testHave === 0 &&
              el2.name.toUpperCase().localeCompare("vatican".toUpperCase()) !==
                0 &&
              el2.name.toUpperCase().localeCompare("holy see".toUpperCase()) !==
                0
            ) {
              const pays = myState.countriesResponse;

              pays.push({
                id: myState.countriesResponse.length,
                name: el2.name,
                capital: el2.capital,
                code: el2.alpha2Code,
                flag: el2.flag,
                favorite: 0,
              });

              this.setState({ countriesResponse: this.pays });
            }
          }
        });
        if (testHave === 1) this.notify("capital already displayed!");
        if (testExists === 0 && testHave === 0) this.notify("not a capital!");
      }
    }
  }

  notify = (message) => {
    toast(message);
  };

  CallAPICountries = async () => {
    const pays = [];
    let id2 = -1;
    const responseCountries = await countriesCalls();
    this.setState({ AllcountriesResponse: responseCountries.data });
    let k = -1;
    responseCountries.data.forEach((el) => {
      k += 1;

      if (k < 4) {
        id2 += 1;

        pays.push({
          id: id2,
          name: el.name,
          capital: el.capital,
          code: el.alpha2Code,
          flag: el.flag,
          favorite: 0,
        });
      }
    });
    this.setState({ countriesResponse: pays });
  };

  handleStar(citieId) {
    const myState = this.state;
    if (myState.inHome === 0)
      this.notify("you cant pin and unpin in favorite!");
    else {
      const data = myState.countriesResponse;
      let j = -1;
      myState.countriesResponse.forEach((el) => {
        j += 1;

        if (el.id === citieId) {
          if (el.favorite === 0) data[j].favorite = 1;
          else data[j].favorite = 0;
        }
      });
      this.setState({ countriesResponse: data });
    }
  }

  render() {
    const myState = this.state;
    if (myState.countriesResponse.length === 0) {
      return null;
    }
    return (
      <div>
        <table className="table">
          <tbody>
            {myState.countriesResponse.map((citie) => (
              <Citie
                key={citie.id}
                id={citie.id}
                citie={citie}
                onStar={this.handleStar}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Cities.propTypes = {
  inHome: PropTypes.number,
  searchValue: PropTypes.string,
};

Cities.defaultProps = {
  inHome: 1,
  searchValue: "",
};

export default Cities;
