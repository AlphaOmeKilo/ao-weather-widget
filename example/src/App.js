import React from 'react'

import WeatherWidget from 'ao-weather-widget'
import 'ao-weather-widget/dist/index.css'

const App = () => {
  return <div className='flex'>
    <WeatherWidget className='mr-4' fill city="" apiToken="9a08c0bf4e4d59790f3633162aaf8f92"/>
    <WeatherWidget className='mr-4' fill city="sevilla" apiToken="9a08c0bf4e4d59790f3633162aaf8f92"/>
    <WeatherWidget className='mr-4' city="Paris" apiToken="9a08c0bf4e4d59790f3633162aaf8f92"/>
    <WeatherWidget className='mr-4' city="Vancouver" apiToken="9a08c0bf4e4d59790f3633162aaf8f92"/>
    <WeatherWidget className='mr-4' city="Manchester" apiToken="9a08c0bf4e4d59790f3633162aaf8f92"/>
    <WeatherWidget city="Bristol" apiToken="9a08c0bf4e4d59790f3633162aaf8f92"/>
  </div>
}

export default App
