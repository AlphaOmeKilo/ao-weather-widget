import React from 'react'

import WeatherWidget from 'ao-weather-widget'
import 'ao-weather-widget/dist/index.css'

const App = () => {
  return <div className='flex'>
    <WeatherWidget city="London" apiToken="9a08c0bf4e4d59790f3633162aaf8f92"/>
    <WeatherWidget city="sevilla" apiToken="9a08c0bf4e4d59790f3633162aaf8f92"/>
    <WeatherWidget city="Paris" apiToken="9a08c0bf4e4d59790f3633162aaf8f92"/>
    <WeatherWidget city="Vancouver" apiToken="9a08c0bf4e4d59790f3633162aaf8f92"/>
    <WeatherWidget city="Bristol" apiToken="9a08c0bf4e4d59790f3633162aaf8f92"/>
  </div>
}

export default App
