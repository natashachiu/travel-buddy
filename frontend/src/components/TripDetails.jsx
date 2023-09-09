import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

import Itineraries from "./Itineraries";
import Messages from "./Messages";
import Chat from './Chat';
import Map from "./Map";
import AIAssistant from "./AIAssistant";


export default function TripDetails() {
  const { id } = useParams();
  // console.log(`id is : ${id}`);

  const [itineraries, setItineraries] = useState([]); //state to maintain the itineraries of trip
  const [itineraryItems, setItineraryItems] = useState([]);
  const [location, setLocation] = useState("");
  const [tripName, setTripName] = useState("");
  const [tripDates, setTripDates] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripDetails = await axios.get(`http://localhost:8080/api/trips/get-trip-details/${id}`);

        setLocation(tripDetails.data[0].trip_location);
        setTripName(tripDetails.data[0].trip_name);
        setTripDates({ start: parseDate(tripDetails.data[0].start_date), end: parseDate(tripDetails.data[0].end_date) });

        const itinResponse = await axios.get(`http://localhost:8080/api/trips/itinerary-names/${id}`);
        setItineraries(itinResponse.data);

        const itinItemsResponse = await axios.get(`http://localhost:8080/api/trips/itinerary-items/${id}`);

        const formattedItineraryItems = itinItemsResponse.data.map(item => {
          return {
            ...item,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lng),
            opening_hours: item.opening_hours && parseArr(item.opening_hours),
            photos: item.photos && parseArr(item.photos),
            rating: parseFloat(item.rating)
          };
        });
        // console.log(formattedItineraryItems);
        setItineraryItems(formattedItineraryItems);

      } catch (error) {
        console.log(`error fetching itineraries:`, error);
      }
    };
    fetchData();
  }, []);

  const addToWishlist = async (selectedPlace, selectedItinerary) => {

    const newPlaceBody = {
      ...selectedPlace,
      // itinerary_id: parseInt(id), 
      itinerary_id: selectedItinerary[0].id,
      trip_id: parseInt(id),
    };
    // console.log(`new place body is : ${JSON.stringify(newPlaceBody, null, 4)}`);

    setItineraryItems([...itineraryItems, newPlaceBody]);

    try {
      await axios.post(`http://localhost:8080/api/trips/itinerary-items/${id}`, newPlaceBody);
    } catch (error) {
      console.log(`Error adding to Wishlist: `, error);
    }
  };

  const [mapRef, setMapRef] = useState(undefined);
  const [selectedPlace, setSelectedPlace] = useState(undefined);

  const handleMarkerClick = (place) => {
    mapRef?.setZoom(14);
    mapRef?.panTo({ lat: place.lat, lng: place.lng });
    place === selectedPlace
      ? setSelectedPlace(undefined)
      : setSelectedPlace(place);
  };

  return (
    <>
      <div>
        <h1>{tripName}</h1>
        <h3>{tripDates?.start} - {tripDates?.end}</h3>
        <Itineraries
          itineraries={itineraries}
          itineraryItems={itineraryItems}
          setItineraryItems={setItineraryItems}
          handleMarkerClick={handleMarkerClick}
          tripID={id} />
      </div>
      <div>
        <Messages tripID={id} />
        <Chat avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/512px-Windows_10_Default_Profile_Picture.svg.png?20221210150350" />
        <AIAssistant tripID={id} />
      </div>
      <div>
        <h2>Map</h2>
        <Map
          itineraryItems={itineraryItems}
          location={location}
          addToWishlist={addToWishlist}
          tripID={id}
          itineraries={itineraries}
          setMapRef={setMapRef}
          selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace}
          handleMarkerClick={handleMarkerClick}
        />
      </div>
    </>
  );
}

const parseArr = (string) => {
  const arr = string.replace('{', '').replace('}', '').split(',');
  return arr.map(str => str.slice(1, -1));
};

const parseDate = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so adding 1
  const day = date.getDate();
  // const hours = date.getHours();
  // const minutes = date.getMinutes();

  // Creating a readable string
  return `${day}/${month}/${year}`;


};
