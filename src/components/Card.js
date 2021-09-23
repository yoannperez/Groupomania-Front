import React from "react";

const Card = (props) => {
  const { country } = props;

  const numberFormat = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };


  return (
    <li className="card">
      <img src={country.flags[1]} alt="logo" />
      <div className="data-container">
        <ul>
          <li>Name :{country.name.common}</li>
          <li>Capital :{country.capital}</li>
          <li>Area : {numberFormat(country.area)}</li>
        </ul>
      </div>
    </li>
  );
};

export default Card;
