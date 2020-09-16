import React from "react";
import PropTypes from "prop-types";
import roundTemp from "../utility/conversion";

const Detail = (props) => {
  const { detail } = props;
  const imagePathWeater = `/icons/${detail.icon}.png`;

  return (
    <tr>
      <td>{detail.time}</td>
      <td>{detail.weather}</td>
      <td>
        <img src={imagePathWeater} style={{ width: 50, height: 30 }} alt="" />
      </td>
      <td>{roundTemp(detail.tempMin)}°</td>
      <td>{roundTemp(detail.tempMax)}°</td>
      <td>
        {detail.windSpeed}
        {"km/h"}
      </td>
      <td>
        {detail.windAngle}
        {"°"}
      </td>
      <td>{detail.humidity}</td>
      <td>{detail.pressure}</td>
    </tr>
  );
};

Detail.propTypes = {
  detail: PropTypes.shape({
    id: PropTypes.number,
    humidity: PropTypes.number,
    pressure: PropTypes.number,
    tempMax: PropTypes.number,
    tempMin: PropTypes.number,
    windAngle: PropTypes.number,
    windSpeed: PropTypes.number,
    time: PropTypes.string,
    icon: PropTypes.string,
    weather: PropTypes.string,
  }),
};

// Same approach for defaultProps too
Detail.defaultProps = {
  detail: {},
};

export default Detail;
