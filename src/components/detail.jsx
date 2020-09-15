import React from "react";
const Detail = (props) => {
  let imagePathWeater = "/icons/" + props.detail.icon + ".png";
  let tempMin = Math.trunc(props.detail.tempMin);
  let tempMax = Math.trunc(props.detail.tempMax);

  return (
    <tr>
      <td>{props.detail.time}</td>
      <td>{props.detail.weather}</td>
      <td>
        <img src={imagePathWeater} style={{ width: 50, height: 30 }} alt="" />
      </td>
      <td>
        {tempMin}
        {"°"}
      </td>
      <td>
        {tempMax}
        {"°"}
      </td>
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

export default Detail;
