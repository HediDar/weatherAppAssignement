import axios from "axios";

const API_key = "3ca7473536ef714919ad34878d22a7af";

export async function WeatherOfTheDayCall(countriesResult) {
  console.log("first weather");
  let pays = [];
  let k = 0;

  this.state.countriesResponse.forEach((el) => {
    k++;
    if (k < 8) callWeatherByRefresh(el, pays);
  });

  return null;
}

export async function callWeatherByRefresh(capital,code) {
  try {
    const response = await axios.get(
      "http://api.openweathermap.org/data/2.5/weather?q=" +capital +
        "," +code +
        "&appid=" +
        API_key +
        "&units=metric"
	);
	
	
	return response;
    //console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export async function countriesCalls() {
  try {
	const response = await axios.get("https://restcountries.eu/rest/v2/all");
	

    return response;
    
  } catch (error) {
    console.error(error);
  }
}
