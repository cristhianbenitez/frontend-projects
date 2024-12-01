
# Weather App

A modern, responsive weather application that provides real-time weather information and forecasts. This is my first project built with Vue.js, created with the help of IDE tools and guidance.

## Features Implemented ✅

- [x] Create a weather app that matches the given design
- [x] By default, show weather at user location (with location permission)
- [x] Users can see temperature, location, time, wind, high/low temperature, weather status of selected location
- [x] Users can see the temperature of the upcoming 24 hours with 3-hour intervals
- [x] Users can see a forecast of the next 5 days with weather status and high/low temperature
- [x] Users can see summary weather of major cities like New York, Copenhagen or Ho Chi Minh City
- [x] Users can choose to display temperature in Celsius or Fahrenheit
- [x] Users can search for a city and see its weather
- [x] Deploy the solution and submit Repository URL and Demo URL

## Tech Stack

- Vue.js 3
- Vite
- Axios for API calls
- OpenWeatherMap API
- CSS3 with custom properties

## Project Structure

The project follows a modular architecture with alias paths for better organization:

```javascript
@/          // Source root
@assets/    // Images, fonts, and static files
@api/       // API services and endpoints
@components // Reusable Vue components
```

## Build and Deployment

The project is configured for optimal production deployment:

```bash
npm run build # Creates optimized production build
npm run start # Starts production server
```

## Live Demo

[View Live Demo](https://weather-app-page.surge.sh/)
