import React from 'react'

import WeatherWidget from 'ao-weather-widget'
import 'ao-weather-widget/dist/index.css'

const App = () => {
  return <div className='flex'>
    <WeatherWidget className='mr-4' fill city='Skummeslövsstrand' apiToken={process.env.REACT_APP_API_TOKEN}/>
  </div>
}

export default App
