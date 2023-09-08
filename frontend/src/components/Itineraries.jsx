import ItineraryItem from './ItineraryItem'; // Import the ItineraryItem component
import React from 'react';
import { useState } from 'react';
import AddItinerary from './AddItinerary';
//Linked from tripdetails component
export default function Itineraries({ itineraries, itineraryItems, tripID, handleSetItineraries, handleUpdateItineraries }) {

  const [createButtonClicked, setCreateButtonClicked] = useState(false);
  const [itineraryType, setItineraryType] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [deleteItinerary, setDeleteItinerary] = useState(false);

  const handleSetItineraryType = (event) => {
    handlesetShowErrorMessage(false);
    setItineraryType(event.target.value);
  };

  const handlesetShowErrorMessage = (bool) => {
    setShowErrorMessage(bool);
  };

  const handleCreateNewItineraryClicked = (event) => {
    event.preventDefault();
    setItineraryType('');
    handlesetShowErrorMessage(false);
    setCreateButtonClicked(!createButtonClicked);
  };


  const handleDeleteItinerary = (itinerary_deleted) => {
    const confirmDelte = confirm(`Delete ${itinerary_deleted.type}?`);
    if (confirmDelte) {
      //delete the itinerary from db


      //delete the itinerary from state
      const updatedItineraries = itineraries.filter((itinerary) => itinerary.id !== itinerary_deleted.id);
      handleUpdateItineraries(updatedItineraries);

    }

  };


  return (
    <div className="itineraries">
      <h2>Itinerary</h2>

      <form onSubmit={handleCreateNewItineraryClicked}>
        {showErrorMessage && <p>Itinerary type {itineraryType} already exists.</p>}
        <button type="submit" className='createNewItinerary'>New Itinerary</button>
      </form>
      {createButtonClicked && <AddItinerary
        itineraryType={itineraryType}
        handleSetItineraryType={handleSetItineraryType}
        handleCreateNewItineraryClicked={handleCreateNewItineraryClicked}
        tripID={tripID}
        handleSetItineraries={handleSetItineraries}
        itineraries={itineraries}
        showErrorMessage={showErrorMessage}
        handlesetShowErrorMessage={handlesetShowErrorMessage}
      />}

      {itineraries.map((itinerary) => (
        <div key={itinerary.id} className="itinerary">
          <div className="itinerary_title"><strong>{itinerary.type}</strong></div>
          <button type='button' className='deleteItinerary' onClick={() => handleDeleteItinerary(itinerary)}>Delete</button>
          {itineraryItems.map((item) => {
            if (itinerary.id === item.itinerary_id) {
              return (
                <ItineraryItem
                  key={item.url}
                  {...item} />
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
}
