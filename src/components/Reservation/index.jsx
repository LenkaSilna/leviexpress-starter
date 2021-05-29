import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { apiBaseUrl } from '../..';
import './style.css';

const ReservationBody = ({ fromCity, toCity, date, seatNumber }) => (
  <div className="reservation__body">
    <div className="reservation__headings">
      <p>Datum cesty:</p>
      <p>Odjezd:</p>
      <p>Příjezd:</p>
      <p>Sedadlo:</p>
    </div>
    <div className="reservation__info">
      <p>{date}</p>
      <p>
        {fromCity.name}, {fromCity.time}
      </p>
      <p>
        {toCity.name}, {toCity.time}
      </p>
      <p>{seatNumber}</p>
    </div>
  </div>
);

export const Reservation = () => {
  const [reservation, setReservation] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const url = new URL(`${apiBaseUrl}/reservation`);
    url.searchParams.append('id', id);

    fetch(url.toString())
      .then((response) => response.json())
      .then((data) => setReservation(data.data));
  }, []);

  return (
    <div className="reservation container">
      <h2>Vaše e-jízdenka č. {id}</h2>
      {reservation === null ? null : (
        <ReservationBody
          fromCity={reservation.fromCity}
          toCity={reservation.toCity}
          date={reservation.date}
          seatNumber={reservation.seatNumber}
        />
      )}
    </div>
  );
};
