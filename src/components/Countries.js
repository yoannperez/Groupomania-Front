import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Countries = () => {
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const [sortedData, setSortedData] = useState([]);
  const [playOnce, setPlayOne] = useState(true);
  const [rangeValue, setRangeValue] = useState(40);
  const [selectedRadio, setSelectedRadio] = useState("");
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    if (playOnce) {
      axios
        .get("https://restcountries.com/v3/all")
        // .get("https://restcountries.com/v3/all?fields=name,capital,flag,area, region")
        .then((res) => {
          setData(res.data);
          setPlayOne(false);
        });
    }
    const sortedCountry = () => {
      const countryObj = Object.keys(data).map((i) => data[i]);
      const sortedArray = countryObj.sort((a, b) => {
        return b.area - a.area;
      });
      sortedArray.length = rangeValue;
      setSortedData(sortedArray);
    };

    sortedCountry();
    // eslint-disable-next-line
  }, [data, rangeValue, playOnce]);
  // console.log(sortedData)
  return (
    <div className="countries">
      <div className="sort-container">
        <input type="range" min="1" max="250" value={rangeValue} onChange={(e) => setRangeValue(e.target.value)} />
        <ul>
          {radios.map((radio, index) => {
            return (
              <li key={`${radio}-${index}`}>
                <input type="radio" value={radio} id={radio} checked={radio === selectedRadio} onChange={(e) => setSelectedRadio(e.target.value)} />
                <label htmlFor={radio}>{radio}</label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="cancel">{selectedRadio && <h5 onClick ={()=> setSelectedRadio("")}>Annuler recherche</h5>}</div>

      <ul className="countries-list">
        {sortedData
          .filter((country) => country.region.includes(selectedRadio))
          .map((country) => (
            <Card country={country} key={country.name.official} />
          ))}
      </ul>
    </div>
  );
};

export default Countries;
