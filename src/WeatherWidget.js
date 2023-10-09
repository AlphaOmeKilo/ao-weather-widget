import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './assets/styles/styles.module.scss'
import refreshIcon from 'assets/images/refresh.png'

export const WeatherWidget = (props) => {
  const [data, setData] = useState(null)
  const [city] = useState(props.city)
  const [apiToken] = useState(props.apiToken)
  const [splitCode, setSplitCode] = useState(0)
  const [errorMsg, setErrorMsg] = useState(null)
  const [refreshing, setRefreshing] = useState(true)
  const [fill] = useState(props.fill)

  /**
   * Call the openWeather API to get the current weather for the given
   * city using the apiToken provided.
   */
  const getWeather = () => {
    setRefreshing(true)
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiToken}&units=metric`
      )
      .then((res) => {
        setData(res.data)
      })
      .catch((e) => {
        setErrorMsg(e.response?.data?.message || 'Unkown error')
      })
      .finally(() => {
        setTimeout(() => {
          setRefreshing(false)
        }, 250)
      })
  }

  /**
   * Get the first digit of a number.
   * 754 returns 7 for example
   * @param {number} n
   * @returns {number}
   */
  const getFirstDigit = (n) => {
    // Find total number of digits - 1
    const digits = Math.floor(Math.log(n) / Math.log(10))
    // Return first digit
    return Math.floor(n / Math.pow(10, digits))
  }

  const capitaliseFirstLetter = (str) => {
    return str ? str[0].toUpperCase() + str.slice(1) : 'N/A'
  }

  // Whenever data changes, we need to get the first digit of
  // the weather code, unless it is clear skies when 800 needs
  // to be returned to avoid conflict with the clouds weather group
  useEffect(() => {
    const weatherCode = data?.weather[0]?.id
    setSplitCode(
      `code-${
        weatherCode
          ? weatherCode === 800
            ? weatherCode
            : getFirstDigit(weatherCode)
          : 0
      }`
    )
  }, [data])

  // Trigger get Weather on mount
  useEffect(() => {
    getWeather()
  }, [])

  return (
    <div
      className={`${props.className} ${styles.widget} ${styles[splitCode]} ${
        fill ? styles.fill : ''
      } ${styles[errorMsg ? 'error' : '']} ${
        refreshing ? styles.refreshing : ''
      }  ${styles.flex} ${styles['flex-column']} ${styles['flex-center']}`}
    >
      <div
        className={`${styles['widget-controls']} ${styles.flex} ${styles['flex-right']}`}
      >
        <img
          className={`${styles.refresh} ${refreshing ? styles.refreshing : ''}`}
          src={refreshIcon}
          alt='refresh'
          onClick={() => getWeather(false)}
        />
      </div>

      <div className={`${styles['mt-8']} ${styles['text-align-center']}`}>
        <p className={`${styles['widget-city']} ${styles['widget-blur']}`}>
          {capitaliseFirstLetter(city)}
        </p>
        <p className={`${styles['mt-1']} ${styles['widget-blur']}`}>
          {data ? data.weather[0].description : 'N/A'}
        </p>
        <div className={`${styles['img-container']}`}>
          {data ? (
            <img
              className={`${styles['widget-blur']}`}
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
            />
          ) : (
            <div />
          )}
        </div>

        <p
          className={`${styles['widget-temp']} ${styles['widget-blur']} ${styles['mt-10']}`}
        >
          {data ? `${data.main.temp}` : 'N/A'}&deg;
        </p>

        <p
          className={`${styles['widget-error']} ${styles['white--text']} ${styles['widget-blur']}`}
        >
          {errorMsg}
        </p>
      </div>
    </div>
  )
}
