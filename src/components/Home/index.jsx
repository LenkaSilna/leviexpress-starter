import React, { useState } from 'react';
import { JourneyDetail } from '../JourneyDetail';
import { JourneyPicker } from '../JourneyPicker';
import { SeatPicker } from '../SeatPicker';

export const Home = () => {
  const [journey, setJourney] = useState(null);

  return (
    <>
      <JourneyPicker onJourneyChange={setJourney} />
      {journey && (
        <>
          <JourneyDetail journey={journey} />
          <SeatPicker seats={journey.seats} journeyId={journey.journeyId} />
        </>
      )}
    </>
  );
};
