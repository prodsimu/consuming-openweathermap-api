const WEATHER_KEY = "278fc23f3d2887665aa8fc6a1716168f";
const GEOCODING_KEY = "9d16ffbf4b67e74edda85422b342e873";

const selectCountries = document.getElementById("select-countries");
const selectStates = document.getElementById("select-states");
const selectCities = document.getElementById("select-cities");


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
  populateSelect(selectCities, filteredCities, "id", "name", "Select a city");
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
}


main();
