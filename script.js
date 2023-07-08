let weather = {
  // OPEN WEATHER APP's API
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=613d6afc7c8beb9c0ad031fe597df40e"
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  // DISPLAY FUNCTION HELPS TO US DISPLAY THE STUFFS
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { humidity, temp } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, humidity, temp, speed);

    // TO HAVE ALL WEATHER DETAILS
    setTimeout(() => {
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".temp").innerText =
        "Temperature : " + temp + " °C";
      document.querySelector(".description").innerText = description;
      document.querySelector(".humidity").innerText = "Humidity : " + humidity;
      document.querySelector(".wind").innerText = "Wind : " + speed;

      // TO GET ICON
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
    }, 30);

    // BACKGROUND IMAGE
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + " ')";

    // TO LOAD DATA ONLY ON SEARCH
    document.querySelector(".weather").classList.remove("loading");
  },

  //TO CALL OUT SEARCH FUNcTION
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

// SEARCH BUTTON FUNCTION

document.querySelector(".search-button").addEventListener("click", function () {
  weather.search();
});

// FOR PRESSING ENTER
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Denver");
