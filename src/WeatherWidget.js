import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './styles.module.scss'

export const WeatherWidget = (props) => {
  const [data, setData] = useState(null)
  const [city, setCity] = useState(props.city)
  const [apiToken] = useState(props.apiToken)

  const getWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiToken}&units=metric`
      )
      .then((res) => {
        setData(res.data)
      })
  }

  useEffect(() => {
    getWeather()
  }, [])

  return (
    <div className={styles.widget}>
      <div
        className={`${styles['widget-controls']} ${styles.flex} ${styles['flex-right']}`}
      >
        {/* <img
            className='refresh'
            src={refreshIcon}
            alt='refresh'
            onClick={this.getWeather}
          /> */}
      </div>

      {data ? (
        <div
          className={`${styles['mt-8']} ${styles['black--text']} ${styles['text-align-center']}`}
        >
          <p className={`${styles['widget-city']}`}>{city}</p>
          <p className={`${styles['mt-1']}`}>{data.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          />
          <p className={`${styles['widget-temp']} ${styles['my-10']}`}>
            {data.main.temp}&deg;
          </p>
        </div>
      ) : (
        <div />
      )}
    </div>
  )
}
