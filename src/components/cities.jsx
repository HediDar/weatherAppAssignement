//import React from "react";
import React, { Component } from "react";

import Citie from "./citie";
import "../css-loader.css";

//import Citie from "./components/citie";


class Cities extends Component {

 
  render() {
    
    // const vals = this.state.myCities;
    //console.log(this.props.cities.length);
    //return <h1>a</h1>
    if (this.props.cities.length === 0) {
      return (null);
    } else {
      console.log(this.props.cities);
      return (
        <div>
          <table className="table">
            <tbody>
              {this.props.cities.map((citie) => (
                <Citie
                  key={citie.id}
                  id={citie.id}
                  citie={citie}
                  onStar={this.props.onStar}
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
