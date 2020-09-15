//import React from "react";
import React, { Component } from "react";
import { countriesCalls } from "../myAPIS";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Citie from "./citie";
import "../css-loader.css";

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
    favCapitals: [],
    increment: -1,
    homePath: "/icons/homeA.png",
    favPath: "/icons/favD.png",
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

        this.j = -1;
        ////////i sort the array du favori au non favori
        this.state.countriesResponse.forEach((el) => {
          if (el.favorite === 1) {
            this.j++;
            cit.push(this.state.countriesResponse[el.id]);
          }
        });

        this.state.countriesResponse.forEach((e2) => {
          if (e2.favorite === 0) {
            this.j++;

            cit.push(this.state.countriesResponse[e2.id]);
          }
        });
        this.setState({ countriesResponse: cit });
      }

      ///////handle desorting in home

      if (this.state.inHome === 0) {
        console.log("in home");

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
        this.testHave = 0;
        this.testExists = 0;
        this.loop = this.state.countriesResponse;
        console.log(this.props.searchValue.toUpperCase());
        this.loop.forEach((el) => {
          // console.log(el.capital);
          if (
            el["capital"]
              .toUpperCase()
              .localeCompare(this.props.searchValue.toUpperCase()) === 0
          )
            this.testHave = 1;
          //console.log(this.testHave);
        });
        //// we exclude the vatican and the holy see as countries cause they have the same capital as italy
        this.state.AllcountriesResponse.forEach((el2) => {
          if (
            el2["capital"]
              .toUpperCase()
              .localeCompare(this.props.searchValue.toUpperCase()) === 0
          ) {
            this.testExists = 1;
            if (
              this.testHave === 0 &&
              el2["name"]
                .toUpperCase()
                .localeCompare("vatican".toUpperCase()) !== 0 &&
              el2["name"]
                .toUpperCase()
                .localeCompare("holy see".toUpperCase()) !== 0
            ) {
              this.pays = this.state.countriesResponse;

              this.pays.push({
                id: this.id,
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
        if (this.testHave === 1) this.notify("capital already displayed!");
        if (this.testExists === 0 && this.testHave === 0)
          this.notify("not a capital!");
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
    this.pays = [];
    this.id = -1;
    const responseCountries = await countriesCalls();
    this.setState({ AllcountriesResponse: responseCountries.data });
    this.k = -1;
    responseCountries.data.forEach((el) => {
      this.k++;
      if (this.k < 4) {
        this.id++;
        this.pays.push({
          id: this.id,
          name: el["name"],
          capital: el["capital"],
          code: el["alpha2Code"],
          flag: el["flag"],
          favorite: 0,
        });
      }
    });
    this.setState({ countriesResponse: this.pays });
  };

  handleStar(citieId) {
    if (this.state.inHome === 0)
      this.notify("you cant pin and unpin in favorite!");
    else {
      this.data = this.state.countriesResponse;
      this.j = -1;
      this.state.countriesResponse.forEach((el) => {
        this.j++;
        if (el.id === citieId) {
          if (el.favorite === 0) this.data[this.j].favorite = 1;
          else this.data[this.j].favorite = 0;
        }
      });
      this.setState({ countriesResponse: this.data });
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

export default Cities;
