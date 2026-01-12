
import { useState } from 'react'
import './App.css'
import { FaSearchLocation } from "react-icons/fa";


function App() {
  const [city_name, setCity_name] = useState("");
  const [weather_data, setWeather_data] = useState();


  const API_key = "812976bb6364126f3897e9206f8bb9d1";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`;


  async function fetchWeatherData() {
    try {
      const response = await fetch(url);
      const output = await response.json();
      if (response.ok) {
        setWeather_data(output);
        console.log(output);
      } else {
        alert("City not found");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  return (
    <>
      <div className="justify-center items-center h-full w-screen space-y-4 p-4 bg-blue-200 bg-[url('green-field-with-sunny-day.jpg')] bg-no-repeat bg-cover bg-center">
        <div className="bg-blue-500 text-white p-4 rounded-lg md:flex justify-between w-full">
          <h1 className="text-5xl font-bold pt-10 text-shadow-black text-shadow-lg">SKY-SENSE</h1>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="infobox shadow-gray-800 bg-gray-300 rounded-lg shadow-md border-4 border-gray-500 p-4 md:flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold mb-2 text-black">Search Weather</h2>
              <div className="flex items-center space-x-2 border-black p-2 text-black">
                <input
                  type="text" value={city_name} onChange={(e) => setCity_name(e.target.value)}
                  placeholder="Enter city name"
                  className="border border-gray-300 rounded-lg p-2 w-64"
                />
                <button onClick={() => fetchWeatherData()} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                  <FaSearchLocation />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="weather-data mt-4 w-full flex justify-center items-center">
          {
            weather_data && (
              <div className="mt-4 text-center grid gap-6 bg-white bg-opacity-70 p-6 rounded-lg shadow-lg w-full h-full border-4 border-black bg-[url('Field-yellow-flowers-with-hills-cloudy-sky.jpg')] bg-no-repeat bg-cover bg-center">
                <img
                  src={`https://openweathermap.org/img/wn/${weather_data.weather[0].icon}@2x.png`}
                  alt={weather_data.weather[0].description}
                  className="mx-auto w-24 h-24 md:w-32 md:h-32"
                />

                <h3 className="text-5xl font-bold underline">{weather_data.name}, {weather_data.sys.country}</h3>
                <div className='flex justify-evenly place-content-between mt-4 flex-wrap gap-20'>
                  <p className="text-2xl grid gap-6">
                    <p className='font-extrabold'>TEMPERATURE:</p>
                    <p className='hover:scale-110 duration-300 font-semibold'> {(weather_data.main.temp - 273.15).toFixed(2)} °C</p>
                  </p>
                  <p className="text-2xl grid gap-6">
                    <p className='font-extrabold'>WEATHER:</p>
                    <p className='hover:scale-110 duration-300 font-semibold'>{weather_data.weather[0].description}</p>
                  </p>
                  <p className="text-2xl grid gap-6">
                    <p className='font-extrabold'>HUMIDITY:</p>
                    <p className='hover:scale-110 duration-300 font-semibold'>{weather_data.main.humidity}%</p>
                  </p>
                  <p className="text-2xl grid gap-6">
                    <p className='font-extrabold'>WIND SPEED:</p>
                    <p className='hover:scale-110 duration-300 font-semibold'>{weather_data.wind.speed} m/s</p>
                  </p>
                </div>
              </div>
            )
          }
        </div>

      </div>
    </>
  )
}

export default App
