import React, { Component } from "react";
import { countriesCalls } from "../domain/myAPIS";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Citie from "./citie";
import "../css-loader.css";
import PropTypes from "prop-types";

//import Citie from "./components/citie";

class Cities extends Component {
  constructor(props) {
    super(props);
    this.handleStar = this.handleStar.bind(this);
  }
  notify = (message) => {
    toast(message);
  };

  state = {
    increment: -1,
    countriesResponse: [],
    AllcountriesResponse: [],
    inHome: 1,
    searchValue: "",
  };

  componentDidUpdate() {
    if (this.props.inHome !== this.state.inHome) {
      this.setState({ inHome: this.props.inHome });

      /////handle sorting in fav
      if (this.state.inHome === 1) {
        let cit = [];

        ////////i sort the array du favori au non favori
        this.state.countriesResponse.forEach((el) => {
          if (el.favorite === 1) {
            cit.push(this.state.countriesResponse[el.id]);
          }
        });

        this.state.countriesResponse.forEach((e2) => {
          if (e2.favorite === 0) {
            cit.push(this.state.countriesResponse[e2.id]);
          }
        });
        this.setState({ countriesResponse: cit });
      }

      ///////handle desorting in home

      if (this.state.inHome === 0) {
        this.cities2 = [];
        for (let i = 0; i < this.state.countriesResponse.length; i++) {
          this.state.countriesResponse.forEach((el) => {
            if (el.id === i) {
              this.cities2.push(el);
              this.cities2[this.cities2.length - 1].id = i;
              return;
            }
          });
        }

        this.setState({ countriesResponse: this.cities2 });
      }
    }

    if (this.props.searchValue !== this.state.searchValue) {
      this.setState({ searchValue: this.props.searchValue });
      if (this.props.searchValue.localeCompare("") === 0) {
        this.notify("you have typed an empty value!");
      } else {
        let testHave = 0;
        let testExists = 0;
        let loop = this.state.countriesResponse;
        loop.forEach((el) => {
          if (
            el["capital"]
              .toUpperCase()
              .localeCompare(this.props.searchValue.toUpperCase()) === 0
          )
            testHave = 1;
        });
        //// we exclude the vatican and the holy see as countries cause they have the same capital as italy
        this.state.AllcountriesResponse.forEach((el2) => {
          if (
            el2["capital"]
              .toUpperCase()
              .localeCompare(this.props.searchValue.toUpperCase()) === 0
          ) {
            testExists = 1;
            if (
              testHave === 0 &&
              el2["name"]
                .toUpperCase()
                .localeCompare("vatican".toUpperCase()) !== 0 &&
              el2["name"]
                .toUpperCase()
                .localeCompare("holy see".toUpperCase()) !== 0
            ) {
              let pays = this.state.countriesResponse;

              pays.push({
                id: this.state.countriesResponse.length,
                name: el2["name"],
                capital: el2["capital"],
                code: el2["alpha2Code"],
                flag: el2["flag"],
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
  componentDidMount() {
    this.setState({
      searchValue: this.props.searchValue,
      inHome: this.props.inHome,
    });
    //const response=await
    this.CallAPICountries();
  }

  CallAPICountries = async () => {
    let pays = [];
    let id = -1;
    const responseCountries = await countriesCalls();
    this.setState({ AllcountriesResponse: responseCountries.data });
    let k = -1;
    responseCountries.data.forEach((el) => {
      k++;
      if (k < 4) {
        id++;
        pays.push({
          id: id,
          name: el["name"],
          capital: el["capital"],
          code: el["alpha2Code"],
          flag: el["flag"],
          favorite: 0,
        });
      }
    });
    this.setState({ countriesResponse: pays });
  };

  handleStar(citieId) {
    if (this.state.inHome === 0)
      this.notify("you cant pin and unpin in favorite!");
    else {
      let data = this.state.countriesResponse;
      let j = -1;
      this.state.countriesResponse.forEach((el) => {
        j++;
        if (el.id === citieId) {
          if (el.favorite === 0) data[j].favorite = 1;
          else data[j].favorite = 0;
        }
      });
      this.setState({ countriesResponse: data });
    }
  }

  render() {
    if (this.state.countriesResponse.length === 0) {
      return null;
    } else {
      return (
        <div>
          <table className="table">
            <tbody>
              {this.state.countriesResponse.map((citie) => (
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
