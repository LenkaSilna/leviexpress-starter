import React from 'react';
import { Seat } from '../Seat';
// import './style.css';

export const SeatRow = ({ row, selectedSeatNumber, onSelectSeat }) => (
  <div className="seat-row">
    {row.map((seat) => (
      <Seat
        key={seat.number}
        number={seat.number}
        isOccupied={seat.isOccupied}
        isSelected={seat.number === selectedSeatNumber}
        onSelect={onSelectSeat}
      />
    ))}
  </div>
);
