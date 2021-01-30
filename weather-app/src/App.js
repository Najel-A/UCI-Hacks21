import React, { useState } from 'react'

// API key not working?
const api = {
  key: "44cb1e5f48e594abff5e9d351f8bcd23",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metrics&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }  

  const dateBuilder = (d) => {
    let months = ["January","February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className='App'>
      <main>

        {/* Returns the seachbox information along with date */}
        {/* Buggy on the search bar needs fixing */}
        <div className="search-box">
          <input type="text" className="search-bar"
          placeholder="Find City..." 
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys.country}
              <div className="date">
                {dateBuilder(new Date())}
              </div>
            </div>
          </div>

          {/* Returns the weather and temperature i.e. 49°c and cloudy */}
          {/* Fixed output of Kelvin output to degrees or celsius */}
          <div className="weather-box">
            <div className="temp">
                {/* Choose or comment out whichever units we are going to use */}
                {Math.round((Math.round(weather.main.temp) - 273.15) * 9 / 5 + 32)}°F
                {/*{Math.round(weather.main.temp - 273.15)}°C */}
            </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>
          </div>
        </div>
        ): ('')}
      </main>
    </div>
  );
}

export default App;