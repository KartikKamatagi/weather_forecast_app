import React, { useRef, useState } from 'react'
import Clear from "../assets/clear.webp"
import Cloudy from "../assets/cloudy.avif"
import Dizzle from "../assets/dizzle.png"
import Humidity from "../assets/humidity.png"
import Rain from "../assets/rain.avif"
import Snow from "../assets/snow.avif"
import Wind from "../assets/wind.webp"

const Weather = () => {
  const inputRef = useRef()
  const [weather, setWeather] = useState(null)
  const [icon, setIcon] = useState(Clear)
  const [isLoading, setIsLoading] = useState(false)

  const API_KEY = "33b038d69da9f285e48819a6af27caf2"

  const search = async (city) => {
    const normalizedCity = city.trim()

    if (!normalizedCity) {
      alert("Enter city name")
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(normalizedCity)}&appid=${API_KEY}&units=metric`
      )
      const data = await res.json()

      if (data.cod !== 200) {
        alert("City not found")
        return
      }

      setWeather(data)

      const condition = data.weather[0].main
      if (condition === "Clouds") setIcon(Cloudy)
      else if (condition === "Rain") setIcon(Rain)
      else if (condition === "Drizzle") setIcon(Dizzle)
      else if (condition === "Snow") setIcon(Snow)
      else setIcon(Clear)
    } catch {
      alert("Unable to fetch weather right now")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    search(inputRef.current?.value || "")
  }

  return (
    <section id="weatherBlock">
      <article>
        <main>
          <div className="searchBox">
            <input
              type="text"
              placeholder="Search Weather"
              ref={inputRef}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch()
                }
              }}
            />
            <button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? "Loading..." : "Search"}
            </button>
          </div>

          {weather ? (
            <div className="container">
              <img src={icon} alt="weather" id="img1" />

              <p className="temp">
                {Math.round(weather.main.temp)}{"\u00B0"}C
              </p>
              <p className="locate">
                {weather.name}, {weather.sys.country}
              </p>

              <div className="part">
                <div className="humidity">
                  <img src={Humidity} alt="humidity" />
                  <div>
                    <p className="metric">{weather.main.humidity}%</p>
                    <p className="label">Humidity</p>
                  </div>
                </div>

                <div className="wind">
                  <img src={Wind} alt="wind" />
                  <div>
                    <p className="metric">{Math.round(weather.wind.speed)} km/h</p>
                    <p className="label">Wind speed</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="emptyState">
              <p>Search for a city to see the current weather.</p>
            </div>
          )}
        </main>
      </article>
    </section>
  )
}

export default Weather
