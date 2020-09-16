import React from "react";
import PropTypes from "prop-types";
import  roundTemp  from "../utility/conversion";

const Detail = (props) => {
  const imagePathWeater = `/icons/${props.detail.icon}.png`;
  const mydetail = props.detail;
  return (
    <tr>
      <td>{mydetail.time}</td>
      <td>{mydetail.weather}</td>
      <td>
        <img src={imagePathWeater} style={{ width: 50, height: 30 }} alt="" />
      </td>
      <td>{roundTemp(mydetail.tempMin)}°</td>
      <td>{roundTemp(mydetail.tempMax)}°</td>
      <td>
        {mydetail.windSpeed}
        {"km/h"}
      </td>
      <td>
        {mydetail.windAngle}
        {"°"}
      </td>
      <td>{mydetail.humidity}</td>
      <td>{mydetail.pressure}</td>
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