const apiKey = "4e9a2e09113943177c9c9e8b09966d80"; // Replace with your OpenWeatherMap API key

// Get elements
const cityInput = document.getElementById("city");
const weatherInfo = document.getElementById("weather-info");
const getWeatherButton = document.getElementById("get-weather");

getWeatherButton.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  
  if (!city) {
    alert("Please enter a city!");
    return;
  }

  // Fetch weather data from OpenWeatherMap
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod === "404") {
      weatherInfo.innerHTML = "City not found!";
      return;
    }

    const weather = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;

    weatherInfo.innerHTML = `
      <div class="weather">
        <h2>${city}</h2>
        <p>${weather}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
      </div>
    `;
  } catch (error) {
    weatherInfo.innerHTML = "Error fetching weather data.";
    console.error(error);
  }
});
