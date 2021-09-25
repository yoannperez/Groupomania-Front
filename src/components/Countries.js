import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Countries = () => {
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(40);
  const [selectedRadio, setSelectedRadio] = useState("");
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    axios.get("https://restcountries.com/v3/all")
    .then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="countries">
      <div className="sort-container">
        <input type="range" min="1" max="250" value={rangeValue} onChange={(e) => setRangeValue(e.target.value)} />
        <ul>
          {radios.map((radio) => {
            return (
              <li key={radio}>
                <input type="radio" value={radio} id={radio} checked={radio === selectedRadio} onChange={(e) => setSelectedRadio(e.target.value)} />
                <label htmlFor={radio}>{radio}</label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="cancel">{selectedRadio && <h5 onClick={() => setSelectedRadio("")}>Annuler recherche</h5>}</div>

      
      <ul className="countries-list">
        {data
          .filter((country) => country.region.includes(selectedRadio))
          .sort((a, b) => b.area - a.area)
          .filter((country, index) => index < rangeValue)
          .map((country, index) => (
            <Card country={country} key={`${country.name}-${index}`} />
          ))}
      </ul>
    </div>
  );
};

export default Countries;
