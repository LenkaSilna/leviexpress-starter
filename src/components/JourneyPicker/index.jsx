import React, { useEffect, useState } from 'react';
import { apiBaseUrl } from '../..';
import mapImage from './img/map.svg';
import './style.css';

const CityOptions = ({ cities }) => (
  <>
    <option value="">Vyberte</option>
    {cities.map((city) => (
      <option key={city.code} value={city.code}>
        {city.name}
      </option>
    ))}
  </>
);

const DatesOptions = ({ dates }) => (
  <>
    <option value="">Vyberte</option>
    {dates.map((date) => (
      <option key={date.dateBasic} value={date.dateBasic}>
        {date.dateExtended}
      </option>
    ))}
  </>
);

export const JourneyPicker = ({ onJourneyChange }) => {
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([]);
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetch(`${apiBaseUrl}/cities`)
      .then((response) => response.json())
      .then((json) => setCities(json.data));

    fetch(`${apiBaseUrl}/dates`)
      .then((response) => response.json())
      .then((json) => setDates(json.data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const url = new URL(`${apiBaseUrl}/journey`);
    url.searchParams.append('fromCity', fromCity);
    url.searchParams.append('toCity', toCity);
    url.searchParams.append('date', date);

    fetch(url.toString())
      .then((response) => response.json())
      .then((data) => {
        onJourneyChange(data.data);
      });
  };

  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form className="journey-picker__form" onSubmit={handleSubmit}>
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select
              value={fromCity}
              onChange={(event) => setFromCity(event.target.value)}
            >
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select
              value={toCity}
              onChange={(event) => setToCity(event.target.value)}
            >
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select
              value={date}
              onChange={(event) => setDate(event.target.value)}
            >
              <DatesOptions dates={dates} />
            </select>
          </label>
          <div className="journey-picker__controls">
            <button
              className="btn"
              type="submit"
              disabled={fromCity === '' || toCity === '' || date === ''}
            >
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src={mapImage} />
      </div>
    </div>
  );
};
