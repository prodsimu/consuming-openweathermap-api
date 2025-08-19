const API_KEY = "278fc23f3d2887665aa8fc6a1716168f";

const selectCountries = document.getElementById("select-countries");
const selectStates = document.getElementById("select-states");
const selectCities = document.getElementById("select-cities");
const weatherOutput = document.getElementById("weather-output");


function populateSelect(selectElement, items, valueKey, textKey, placeholder) {
  selectElement.innerHTML = `<option value="" selected>${placeholder}</option>`;
  items.forEach(item => {
    const option = document.createElement("option");
    option.value = item[valueKey];
    option.textContent = item[textKey];
    selectElement.appendChild(option);
  });
}


async function loadCountries() {
  const response = await fetch("countries-states-cities/countries.json");
  const data = await response.json();
  data.sort((a, b) => a.name.localeCompare(b.name));
  populateSelect(selectCountries, data, "iso2", "name", "Select a country");
}


async function loadStates(countryCode) {
  if (!countryCode) {
    selectStates.innerHTML = `<option value="" selected>Select a state</option>`;
    selectCities.innerHTML = `<option value="" selected>Select a city</option>`;
    return;
  }

  const response = await fetch("countries-states-cities/states.json");
  const data = await response.json();
  const filteredStates = data.filter(state => state.country_code === countryCode);
  populateSelect(selectStates, filteredStates, "iso2", "name", "Select a state");

  selectCities.innerHTML = `<option value="" selected>Select a city</option>`;
}


async function loadCities(stateCode) {
  if (!stateCode) {
    selectCities.innerHTML = `<option value="" selected>Select a city</option>`;
    return;
  }

  const response = await fetch("countries-states-cities/cities.json");
  const data = await response.json();
  const filteredCities = data.filter(city => city.state_code === stateCode);
  populateSelect(selectCities, filteredCities, "name", "name", "Select a city");
}


async function getCoordinates(city, state, country) {
  if (!city || !state || !country) return null;

  const query = `${city},${state},${country}`;
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.length === 0) return null;

  return {
    lat: data[0].lat,
    lon: data[0].lon
  };
}


async function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  return {
    city: data.name,
    temp: data.main.temp,
    humidity: data.main.humidity,
    weatherMain: data.weather[0].main,
    weatherDesc: data.weather[0].description,
    windSpeed: data.wind.speed
  };
}


function main() {
  loadCountries();

  selectCountries.addEventListener("change", () => {
    const countryCode = selectCountries.value;
    loadStates(countryCode);
  });

  selectStates.addEventListener("change", () => {
    const stateCode = selectStates.value;
    loadCities(stateCode);
  });

  selectCities.addEventListener("change", async () => {
    const cityName = selectCities.value;
    const stateName = selectStates.options[selectStates.selectedIndex].text;
    const countryCode = selectCountries.value;

    const coords = await getCoordinates(cityName, stateName, countryCode);

    if (coords) {
      const weather = await getWeather(coords.lat, coords.lon);

      weatherOutput.innerHTML = `
        <h3>Weather in ${weather.city}</h3>
        <p>Temperature: ${weather.temp}°C</p>
        <p>Humidity: ${weather.humidity}%</p>
        <p>Condition: ${weather.weatherMain} - ${weather.weatherDesc}</p>
        <p>Wind: ${weather.windSpeed} m/s</p>
      `;
    } else {
      weatherOutput.innerHTML = "<p>Local not found in Geocoding API</p>";
    }
  });
}


main();
