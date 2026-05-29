import { useState, useEffect, Fragment } from "react"
import { Pages, Panels } from "../constants/pages"
import { getAllUserProfiles } from "../utils/api/userApi";

function LocationsPanel({setPanel}) {
  const [listOfLocs, setListOfLocs] = useState([])
  const [selectedLocations, setSelectedLocations] = useState("")
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("")

  const locations = [
    {label: "1", value: "bplate"},
    {label: "2", value: "feast"},
    {label: "3", value: "de neve"},
    {label: "4", value: "bcafe"},
    {label: "5", value: "cafe 1919"},
    {label: "6", value: "epicuria"},
    {label: "7", value: "rendezvous"},
    {label: "8", value: "the study"}
  ];

  const hours = [
    { label: "breakfast", value: "breakfast" },
    { label: "lunch", value: "lunch" },
    { label: "dinner", value: "dinner" },
    { label: "late night", value: "late-night" }
  ];

  const onSubmit = (e) => {
    e.preventDefault();

    if (!selectedLocations) {
      alert("yo you gotta select a location my guy");
      return;
    }
    if (!selectedTimeFrame) {
      alert("Please choose a time.");
      return;
    }
    setListOfLocs([selectedLocations])
    if (setPanel) {
      setPanel(Panels.DINING);
    }
  }

  return (
    <><h1>hi</h1>
    <form id="dropdownform" onSubmit={onSubmit}>
      <label>
        <select
          value={selectedLocations}
          onChange={(e) => setSelectedLocations(e.target.value)}
        >
          <option value="" disabled>
            Choose the dining locations!
          </option>
          <option value="1">bplate</option>
          <option value="2">feast</option>
          <option value="3">de neve</option>
          <option value="4">bcafe</option>
          <option value="5">cafe 1919</option>
          <option value="6">epicuria</option>
          <option value="7">rendevous</option>
          <option value="8">the study</option>
        </select>
      </label>
      <label>
        <select value={selectedTimeFrame} onChange={(e) => setSelectedTimeFrame(e.target.value)}>
          <option value="" disabled>
            Choose the hours!
          </option>
          <option value="breakfast">breakfast</option>
          <option value="lunch">lunch</option>
          <option value="dinner">dinner</option>
          <option value="late-night">late night</option>
        </select>
      </label>
      <button type="submit">press this to update boss</button>
    </form>
    </>
  )
}

export default LocationsPanel;