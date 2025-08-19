# Weather App with Country, State, and City Selectors

This is a simple web application that allows users to select a **country**, **state**, and **city**, and then view the **current weather** for the selected location. The app is fully responsive and uses multiple APIs and local JSON data.

---

## Features

- Cascading selects for **Country → State → City**
- Fetches **coordinates** from the selected location
- Displays **current weather information** including:
  - Temperature
  - Humidity
  - Weather condition
  - Wind speed

---

## APIs Used

### 1. OpenWeatherMap Geocoding API
- **Purpose:** Convert the selected city, state, and country into latitude and longitude coordinates.
- **Endpoint:** `https://api.openweathermap.org/geo/1.0/direct?q={city},{state},{country}&limit=1&appid={API_KEY}`
- **Documentation:** [Geocoding API](https://openweathermap.org/api/geocoding-api)

### 2. OpenWeatherMap Current Weather Data API
- **Purpose:** Retrieve current weather information using the coordinates from the Geocoding API.
- **Endpoint:** `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={API_KEY}`
- **Documentation:** [Weather API](https://openweathermap.org/current)

---

## Local JSON Data

The app uses local JSON files to populate the selects for countries, states, and cities:

- `countries.json`
- `states.json`
- `cities.json`

These files were downloaded from the following repository:  
[https://github.com/dr5hn/countries-states-cities-database](https://github.com/dr5hn/countries-states-cities-database?tab=readme-ov-file)

---

## How to Use

1. Open `index.html` in a browser.
2. Select a **Country** from the first dropdown.
3. Select a **State** from the second dropdown.
4. Select a **City** from the third dropdown.
5. The weather information will appear below the selectors.

---

## Dependencies

- Vanilla JavaScript (no frameworks required)
- OpenWeatherMap API key (replace `API_KEY` in `script.js`)
