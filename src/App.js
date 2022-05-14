import React, { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import Itinerary from "./components/Itinerary";

function App() {
  const [itinerary, setItinerary] = useState(false);
  const [dayAndCityArr, setDayAndCityArr] = useState([]);
  const [infoArr, setInfoArr] = useState([]);
  const [inputFieldArr, setInputFieldArr] = useState([]);

  function showItinerary() {
    setItinerary(true);
  }

  function showForm() {
    setItinerary(false);
  }
  //collect information from the form
  function getInfoArr(arr) {
    setInfoArr(arr);
  }
  //get the information on entered city and day
  function getInputFieldArr(arr) {
    setInputFieldArr(arr);
  }

  const cityArr = inputFieldArr.map((data) => data.city);
  const daysArr = inputFieldArr.map((data) => data.days);
  //get a single date info in array
  function getDateInfo(i) {
    let currentDate = new Date(infoArr.departureDate);
    currentDate.setDate(currentDate.getDate() + i);
    const options = { weekday: "short", month: "numeric", day: "numeric" };
    const date = currentDate.toLocaleTimeString("en-us", options);
    const dateArr = date.split(",");
    return dateArr;
  }
  //get the city arr
  function getCityInfo() {
    let allCitiesArr = [];
    for (let i = 0; i < daysArr.length; i++) {
      let newArr = Array.from({ length: daysArr[i] }).fill(cityArr[i]);
      allCitiesArr = allCitiesArr.concat(newArr);
    }
    return allCitiesArr;
  }
  //get the array of object of city and day info of every planed day
  function itineraryArr() {
    let totalDays;
    const numDaysArr = daysArr.map((day) => parseInt(day));
    if (daysArr.length === 1) {
      totalDays = numDaysArr;
    } else {
      totalDays = numDaysArr.reduce((a, b) => a + b, 0);
    }
    let listArr = [];
    for (let i = 0; i < totalDays; i++) {
      listArr.push({
        day: getDateInfo(i)[0],
        date: getDateInfo(i)[1],
        city: getCityInfo()[i],
      });
    }
    //change the first and last day city information with departure city and return city
    const arrow = " --> ";
    listArr[0].city = infoArr.departureCity + arrow + listArr[0].city;
    // listArr[0] = [...listArr[0], city: infoArr.departureCity + arrow + listArr[0].city]
    listArr[listArr.length - 1].city =
      listArr[listArr.length - 1].city + arrow + infoArr.returnCity;

    //adding info for previous city to next city
    let tempDays = 0;
    for (let j = 0; j < numDaysArr.length - 1; j++) {
      tempDays += numDaysArr[j];
      const cityInfo = cityArr[j] + arrow + cityArr[j + 1];
      listArr[tempDays] = { ...listArr[tempDays], city: cityInfo };
    }
    setDayAndCityArr(listArr);
    return listArr;
  }

  return (
    <div>
      {itinerary && <Itinerary dataArr={dayAndCityArr} showForm={showForm} />}
      {!itinerary && (
        <div className='container'>
          <Header formHeader={true} />
          <Form
            showItinerary={showItinerary}
            addDataArr={itineraryArr}
            getInfoArr={getInfoArr}
            getInputFieldArr={getInputFieldArr}
          />
        </div>
      )}
    </div>
  );
}

export default App;
