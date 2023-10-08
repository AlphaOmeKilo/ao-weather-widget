import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './assets/styles/styles.module.scss'
import refreshIcon from 'assets/images/refresh.png'

export const WeatherWidget = (props) => {
  const [data, setData] = useState(null)
  const [city, setCity] = useState(props.city)
  const [apiToken] = useState(props.apiToken)
  const [splitCode, setSplitCode] = useState(0)

  /**
   * Call the openWeather API to get the current weather for the given
   * city using the apiToken provided.
   */
  const getWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiToken}&units=metric`
      )
      .then((res) => {
        setData(res.data)
      })
  }

  /**
   * Get the first digit of a number
   * @param {int} n
   * @returns int
   */
  const getFirstDigit = (n) => {
    // Find total number of digits - 1
    const digits = Math.floor(Math.log(n) / Math.log(10))
    // Find first digit
    n = Math.floor(n / Math.pow(10, digits))
    // Return first digit
    return n
  }

  useEffect(() => {
    setSplitCode(
      `code-${
        data
          ? data.weather[0].id === 800
            ? data.weather[0].id
            : getFirstDigit(data.weather[0].id)
          : 0
      }`
    )
  }, [data])

  useEffect(() => {
    getWeather()
  }, [])

  return (
    <div className={`${styles.widget} ${styles[splitCode]}`}>
      <div
        className={`${styles['widget-controls']} ${styles.flex} ${styles['flex-right']}`}
      >
        <img
          className={`${styles.refresh}`}
          src={refreshIcon}
          alt='refresh'
          onClick={getWeather}
        />
      </div>

      {data ? (
        <div className={`${styles['mt-8']} ${styles['text-align-center']}`}>
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
