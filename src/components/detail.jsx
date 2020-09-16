import React from "react";
import PropTypes from "prop-types";
import { roundTemp } from "../utility/conversion";

const Detail = (props) => {
  let imagePathWeater = "/icons/" + props.detail.icon + ".png";

  return (
    <tr>
      <td>{props.detail.time}</td>
      <td>{props.detail.weather}</td>
      <td>
        <img src={imagePathWeater} style={{ width: 50, height: 30 }} alt="" />
      </td>
      <td>{roundTemp(props.detail.tempMin) + "°"}</td>
      <td>{roundTemp(props.detail.tempMax) + "°"}</td>
      <td>
        {props.detail.windSpeed}
        {"km/h"}
      </td>
      <td>
        {props.detail.windAngle}
        {"°"}
      </td>
      <td>{props.detail.humidity}</td>
      <td>{props.detail.pressure}</td>
    </tr>
  );
};

Detail.propTypes = {
  detail: PropTypes.object,
};

// Same approach for defaultProps too
Detail.defaultProps = {
  detail: {},
};

export default Detail;
