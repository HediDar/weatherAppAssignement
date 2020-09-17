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
      inHome2: 1,
    };
  }

  componentDidMount() {
    const { inHome } = this.props;
    this.setState({
      inHome2: inHome,
    });
    this.CallAPICountries();
  }

  sendData = () => {
    const { parentCallback } = this.props;
    const { countriesResponse } = this.state;
    parentCallback(countriesResponse);
  };

  componentDidUpdate() {
    const { searchValue } = this.props;
    const { inHome } = this.props;
    const { inHome2 } = this.state;
    const { countriesResponse } = this.state;
    if (inHome !== inHome2) {
      this.setState({ inHome2: inHome });

      //  handle sorting in fav
      if (inHome2 === 1) {
        const cit = [];

        //  i sort the array du favori au non favori
        countriesResponse.forEach((el) => {
          if (el.favorite === 1) {
            cit.push(countriesResponse[el.id]);
          }
        });

        countriesResponse.forEach((e2) => {
          if (e2.favorite === 0) {
            cit.push(countriesResponse[e2.id]);
          }
        });
        this.setState({ countriesResponse: cit });
      }

      //  handle desorting in home

      if (inHome2 === 0) {
        this.cities2 = [];
        for (let i = 0; i < countriesResponse.length; i = +1) {
          countriesResponse.forEach((el) => {
            if (el.id === i) {
              this.cities2.push(el);
              this.cities2[this.cities2.length - 1].id = i;
            }
          });
        }

        this.setState({ countriesResponse: this.cities2 });
      }
    }

    let testHave = 0;
    let testExists = 0;
    if (searchValue.localeCompare("") === 0) {
      this.notify("you have typed an empty value!");
    } else {
      const loop = countriesResponse;
      loop.forEach((el) => {
        if (
          el.capital.toUpperCase().localeCompare(searchValue.toUpperCase()) ===
          0
        )
          testHave = 1;
      });

      const { AllcountriesResponse } = this.state;
      // we exclude the vatican and the holy see as countries cause they have the same capital as italy
      AllcountriesResponse.forEach((el2) => {
        if (
          el2.capital.toUpperCase().localeCompare(searchValue.toUpperCase()) ===
          0
        ) {
          testExists = 1;
          if (
            testHave === 0 &&
            el2.name.toUpperCase().localeCompare("vatican".toUpperCase()) !==
              0 &&
            el2.name.toUpperCase().localeCompare("holy see".toUpperCase()) !== 0
          ) {
            const pays = countriesResponse;

            pays.push({
              id: countriesResponse.length,
              name: el2.name,
              capital: el2.capital,
              code: el2.alpha2Code,
              flag: el2.flag,
              favorite: 0,
            });

            this.setState({ countriesResponse: pays });
          }
        }
      });
    }
    if (testHave === 1) this.notify("capital already displayed!");
    if (testExists === 0 && testHave === 0) this.notify("not a capital!");
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
    this.sendData();
  };

  handleStar(citieId) {
    const { inHome2 } = this.state;
    const { countriesResponse } = this.state;

    if (inHome2 === 0) this.notify("you cant pin and unpin in favorite!");
    else {
      const data = countriesResponse;
      let j = -1;
      countriesResponse.forEach((el) => {
        j += 1;

        if (el.id === citieId) {
          if (el.favorite === 0) data[j].favorite = 1;
          else data[j].favorite = 0;
        }
      });
      this.setState({ countriesResponse: data });
      this.sendData();
    }
  }

  render() {
    const {countriesResponse} = this.state;
    if (typeof countriesResponse === "undefined") {
      return <h1>loading...</h1>;
    }
    return (
      <div>
        <table className="table">
          <tbody>
            {countriesResponse.map((citie) => (
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