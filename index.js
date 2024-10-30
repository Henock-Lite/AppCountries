let Data = [];
let countries = document.querySelector(".countries-container");
const inputSearch = document.getElementById("inputSearch");
const inputRange = document.getElementById("inputRange");
const rangeValue = document.getElementById("rangeValue");
let trieValue = "maxToMin";
let btnSort = document.querySelectorAll(".btnSort");

async function CountriesFetch() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  Data = await res.json();
  DisplayCountries();
}

function DisplayCountries() {
  countries.innerHTML = Data.filter((search) =>
    search.translations.fra.common
      .toLowerCase()
      .includes(inputSearch.value.toLowerCase())
  )
    .slice(0, inputRange.value)
    .sort((a, b) => {
      if (trieValue === "maxToMin") {
        return b.population - a.population;
      } else if (trieValue === "minToMax") {
        return a.population - b.population;
      } else if (trieValue === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .map(
      (data) =>
        `
    <div class ='cards'>
    <img src='${data.flags.svg}'>
    <h1>${data.translations.fra.common}</h1>
    <h2>${data.capital}</h2>
    <i>population: ${data.population.toLocaleString()}</i>
    </div>
    
    `
    )
    .join("");
}

window.addEventListener("load", CountriesFetch);
inputSearch.addEventListener("input", DisplayCountries);
inputRange.addEventListener("input", () => {
  rangeValue.textContent = inputRange.value;
  DisplayCountries();
});


btnSort.forEach((btnSort) => {
  btnSort.addEventListener("click", (e) => {
    trieValue = e.target.id;
    DisplayCountries();
  });
});
