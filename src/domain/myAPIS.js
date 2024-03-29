import axios from "axios";

const apiKey = "3ca7473536ef714919ad34878d22a7af";

export function callWeatherByCitie(capital, code) {
  return axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${capital},${code}&appid=${apiKey}&units=metric`
  );
}

export function detailCalls(capital) {
  return axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?q=${capital}&cnt=5&appid=${apiKey}&units=metric`
  );
}

export function countriesCalls() {
  return axios.get("https://restcountries.eu/rest/v2/all");
}
