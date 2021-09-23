import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Countries = () => {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
    // .get("https://restcountries.com/v3/all")
    .get("https://restcountries.com/v3/all?fields=name,capital,flag,area")
    .then((res) => setData(res.data));
  },[]);
console.log(data)
  return (
    <div className="countries">
      <ul className="countries-list">
        {data.map((country) => (
          <Card country={country} key={country.name.commom}/>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
