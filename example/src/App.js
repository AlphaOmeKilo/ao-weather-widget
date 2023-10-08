import React from 'react'

import WeatherWidget from 'ao-weather-widget'
import 'ao-weather-widget/dist/index.css'

const App = () => {
  return <WeatherWidget city="London" apiToken="9a08c0bf4e4d59790f3633162aaf8f92"/>
}

export default App
