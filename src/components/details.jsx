import React, { Component } from "react";
import NavBar2 from "./navbarHome";
import Detail from "./detail";
import ActualDay from "./actualDay";

const API_key = "3ca7473536ef714919ad34878d22a7af";
const test="gee";
class Details extends Component {
  constructor() {
    super();
    this.state = {
      myResponse: [],
    };
  }

  componentDidMount() {
	  console.log(this.props.location.state);
    if (typeof this.props.location.state !== "undefined") {
      this.callAPI();
    }
  }

  //http://api.openweathermap.org/data/2.5/forecast?q=Kabul&cnt=5&appid=3ca7473536ef714919ad34878d22a7af&units=metric

  callAPI = async () => {
    const apiCall1 = await fetch(
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
        this.props.history.location.state.citie.capital +
        "&cnt=5&appid=" +
        API_key +
        "&units=metric"
    );
    const response = await apiCall1.json();
    this.responseArray = [];

this.i=-1;
	response.list.forEach((el) => {
        this.i++;
		this.responseArray.push({
			id:this.i,
			time: el['dt_txt'],
			tempMin: el["main"]["temp_min"],
			tempMax: el["main"]["temp_max"],
			windSpeed: el["wind"]["speed"],
			windAngle: el["wind"]["deg"],
			humidity: el["main"]["humidity"],
			pressure: el["main"]["pressure"],
			weather:el["weather"][0]["main"],
			icon:el["weather"][0]["icon"],
		  });
        
      });


	this.setState({ myResponse: this.responseArray });
	
  };

  render() {
    if (typeof this.props.history.location.state === "undefined")
      return (
        <React.Fragment>
          <NavBar2 />
          <h1>no data selected</h1>
        </React.Fragment>
      );
    else {
      this.imagePathWeater =
        "/icons/" + this.props.history.location.state.citie.icon + ".png";

      if ( this.state.myResponse.length >0) {
        return (
          <React.Fragment>
            <NavBar2 />
            <br></br>
            <br></br>

            <ActualDay details={this.props.history.location.state.citie} />
            <br></br>
            <br></br>

            <h3 style={{ textAlign: "center" }}>
              Forecast for 5 different times
            </h3>
            <table className="table" test={true}>
              <thead style={{ fontSize: 22 }}>
                <tr>
                  <th>Date and time</th>
				  <th></th>
				  <th></th>
                  <th>min temp</th>
                  <th>max temp</th>
                  <th>wind speed</th>
                  <th>wind angle</th>
                  <th>humidity level</th>
                  <th>pressure level</th>
                </tr>
              </thead>
              <tbody>


			  {this.state.myResponse.map((detail) => (
                   <Detail
				   key={detail.id}
				   detail={detail}
				 />
                ))}
			  </tbody>
            </table>
          </React.Fragment>
        );
      } else {
        console.log("loading");
        return (
          <React.Fragment>
            <NavBar2 />
            <br></br>
            <br></br>

            <ActualDay details={this.props.history.location.state.citie} />
            <br></br>
            <br></br>

            <h3 style={{ textAlign: "center" }}>
              Forecast for 5 different times
            </h3>
            <h5>loading</h5>
          </React.Fragment>
        );
      }
    }
  }
}

export default Details;
