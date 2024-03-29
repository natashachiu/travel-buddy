import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Homepage from './components/HomePage';
import NewTripPage from './components/NewtripPage';
import TripDetails from './components/TripDetails';
import AuthenticateReturningUser from './components/AuthenticateReturningUser';
// import Chat from './components/Chat';
import NotFound from './components/NotFound';

function App() {

  const [tripLocation, setTripLocation] = useState('');
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [email, setEmail] = useState('');


  const handleTripLocationChange = (event) => {
    setTripLocation(event.target.value);
  };

  const handleTripNameChange = (event) => {
    setTripName(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <Routes>
        {/* <Chat /> */}
        <Route path='/' element={<Homepage
          email={email}
          handleSetEmail={handleSetEmail}
        />} />
        <Route path='/new' element={<NewTripPage
          tripLocation={tripLocation}
          handleTripLocationChange={handleTripLocationChange}
          tripName={tripName}
          handleTripNameChange={handleTripNameChange}
          startDate={startDate}
          handleStartDateChange={handleStartDateChange}
          endDate={endDate}
          handleEndDateChange={handleEndDateChange}
        />} />
        <Route path='/:id' element={<AuthenticateReturningUser
          email={email}
          handleSetEmail={handleSetEmail}
        />} />
        <Route path='/:id/details' element={<TripDetails
          email={email}
          tripLocation={tripLocation}
          startDate={startDate}
          endDate={endDate}
        />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;