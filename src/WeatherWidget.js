import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
import * as ACTIONS from './actions'
import reducer from './reducer'
import Settings from './components/Settings'
import styles from './assets/styles/styles.module.scss'
import refreshIcon from 'assets/images/refresh.png'
import settingsIcon from 'assets/images/settings.svg'

export const WeatherWidget = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    city: props.city,
    units: 'metric',
    data: null,
    refreshing: true,
    splitCode: 0,
    showSettings: false,
    errorMsg: null
  })

  /**
   * Callback function pased to the Settings component to update
   * the settings for the widget. Auto closes the settings
   * @param {Object} value - Settings object containing the configuration
   */
  const updateSettings = (value) => {
    dispatch({
      type: ACTIONS.UPDATE_SETTINGS,
      value: { ...value, showSettings: false }
    })
  }

  /**
   * Call the openWeather API to get the current weather for the given
   * city using the apiToken provided.
   */
  const getWeather = () => {
    dispatch({
      type: ACTIONS.SET_REFRESHING,
      value: true
    })
    dispatch({
      type: ACTIONS.SET_ERROR_MSG,
      value: null
    })
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${state.city}&appid=${props.apiToken}&units=${state.units}`
      )
      .then((res) => {
        dispatch({
          type: ACTIONS.SET_DATA,
          value: res.data
        })
      })
      .catch((e) => {
        dispatch({
          type: ACTIONS.SET_ERROR_MSG,
          value: e.response?.data?.message || 'Unkown error'
        })
      })
      .finally(() => {
        setTimeout(() => {
          dispatch({
            type: ACTIONS.SET_REFRESHING,
            value: false
          })
        }, 500)
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
    const weatherCode = state.data?.weather[0]?.id

    dispatch({
      type: ACTIONS.SET_SPLIT_CODE,
      value: `code-${
        weatherCode
          ? weatherCode === 800
            ? weatherCode
            : getFirstDigit(weatherCode)
          : 0
      }`
    })
  }, [state.data])

  // Whenever the city changes, we should get the weather data
  useEffect(() => {
    getWeather()
  }, [state.city, state.units])

  return (
    <div
      className={`${props.className} ${styles.widget} ${
        styles[state.splitCode]
      } ${props.fill ? styles.fill : ''} ${
        styles[state.errorMsg ? 'error' : '']
      } ${state.refreshing ? styles.refreshing : ''}  ${styles.flex} ${
        styles['flex-column']
      } ${styles['flex-center']}`}
    >
      <div
        className={`${styles['widget-controls']} ${styles.flex} ${styles['flex-between']}`}
      >
        <img
          className={`${styles.refresh}`}
          src={settingsIcon}
          alt='settings'
          onClick={() =>
            dispatch({
              type: ACTIONS.SET_SHOW_SETTINGS,
              value: !state.showSettings
            })
          }
        />
        <img
          className={`${styles.refresh} ${
            state.refreshing ? styles.refreshing : ''
          }`}
          src={refreshIcon}
          alt='refresh'
          onClick={() => getWeather(false)}
        />
      </div>

      <div className={`${styles['mt-8']} ${styles['text-align-center']}`}>
        <p className={`${styles['widget-city']} ${styles['widget-blur']}`}>
          {capitaliseFirstLetter(state.city)}
        </p>
        <p className={`${styles['mt-1']} ${styles['widget-blur']}`}>
          {state.data ? state.data.weather[0].description : 'N/A'}
        </p>
        <div className={`${styles['img-container']}`}>
          {state.data ? (
            <img
              className={`${styles['widget-blur']}`}
              src={`http://openweathermap.org/img/w/${state.data.weather[0].icon}.png`}
            />
          ) : (
            <div />
          )}
        </div>

        <p
          className={`${styles['widget-temp']} ${styles['widget-blur']} ${styles['mt-10']}`}
        >
          {state.data ? `${state.data.main.temp}` : 'N/A'}&deg;
        </p>

        <p
          className={`${styles['widget-error']} ${styles['white--text']} ${styles['widget-blur']}`}
        >
          {state.errorMsg}
        </p>
      </div>

      <Settings
        active={state.showSettings}
        settings={{ city: state.city, units: state.units }}
        updateSettings={updateSettings}
      />
    </div>
  )
}
