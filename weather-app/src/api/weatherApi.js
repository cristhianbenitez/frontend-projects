import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

const API_URL = 'https://api.openweathermap.org/data/2.5/';

const getWeatherByCity = async (city, measurementSystem) => {
  const response = await axios.get(`${API_URL}weather?q=${city}&appid=${API_KEY}&units=${measurementSystem}`);
  return response.data;
};

const getWeatherByCoords = async (coords, measurementSystem) => {
  const response = await axios.get(
    `${API_URL}weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=${measurementSystem}`
  );
  return response.data;
};

const getForecast = async (city, measurementSystem) => {
  const response = await axios.get(`${API_URL}forecast?q=${city}&appid=${API_KEY}&units=${measurementSystem}`);
  return response.data;
};

const getFiveDayForecast = async (coords, measurementSystem) => {
  const response = await axios.get(
    `${API_URL}forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=${measurementSystem}`
  );
  // Group forecasts by day and calculate min/max temperatures
  const dailyForecasts = {};
  let globalMinTemp = 0;
  let globalMaxTemp = 0;

  // Loop through each item in the response, create daily forecasts using the timestamp and add a hourly temperature array to each day
  response.data.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];

    // Update global min/max temperatures
    globalMinTemp = Math.min(globalMinTemp, item.main.temp_min);
    globalMaxTemp = Math.max(globalMaxTemp, item.main.temp_max);

    if (!dailyForecasts[date]) {
      dailyForecasts[date] = {
        ...item,
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        hourly_temps: [
          {
            min: item.main.temp_min,
            max: item.main.temp_max,
            timestamp: item.dt_txt
          }
        ]
      };
    } else {
      dailyForecasts[date].temp_max = Math.max(dailyForecasts[date].temp_max, item.main.temp_max);
      dailyForecasts[date].temp_min = Math.min(dailyForecasts[date].temp_min, item.main.temp_min);
      dailyForecasts[date].hourly_temps.push({
        min: item.main.temp_min,
        max: item.main.temp_max,
        timestamp: item.dt_txt
      });
    }
  });

  // Convert to array and take first 5 days
  const fiveDayForecast = Object.values(dailyForecasts)
    .slice(0, 5)
    .map((day) => ({
      ...day,
      scale_min: globalMinTemp,
      scale_max: globalMaxTemp
    }));
  return fiveDayForecast;
};

const getHourlyForecast = async (coords, measurementSystem) => {
  const response = await axios.get(
    `${API_URL}forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=${measurementSystem}`
  );
  return response.data;
};

export { getWeatherByCity, getWeatherByCoords, getForecast, getFiveDayForecast, getHourlyForecast };
